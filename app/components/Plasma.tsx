'use client';
import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0.28, 0.46, 0.94]; // Default Blue
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  o.xyz = tanh(O/1e4);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  float intensity = (o.r + o.g + o.b) / 3.0;
  vec3 finalColor = mix(o.rgb, intensity * uCustomColor, uUseCustomColor);
  fragColor = vec4(finalColor, length(o.rgb) * uOpacity);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#4875f0',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);

  // 1. Aktualizacja uniformów bez restartu renderera
  useEffect(() => {
    if (programRef.current) {
      const rgb = hexToRgb(color);
      programRef.current.uniforms.uCustomColor.value.set(rgb);
      programRef.current.uniforms.uSpeed.value = speed * 0.4;
      programRef.current.uniforms.uDirection.value = direction === 'reverse' ? -1.0 : 1.0;
      programRef.current.uniforms.uScale.value = scale;
      programRef.current.uniforms.uOpacity.value = opacity;
      programRef.current.uniforms.uMouseInteractive.value = mouseInteractive ? 1.0 : 0.0;
    }
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  // 2. Inicjalizacja (tylko raz!)
  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: 1 // Ustawienie na 1 drastycznie poprawia wydajność przy shaderach proceduralnych
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([0, 0]) },
        uCustomColor: { value: new Float32Array(hexToRgb(color)) },
        uUseCustomColor: { value: 1.0 },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: direction === 'reverse' ? -1.0 : 1.0 },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
      }
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    // Mouse Move
    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        program.uniforms.uMouse.value[0] = e.clientX - rect.left;
        program.uniforms.uMouse.value[1] = rect.height - (e.clientY - rect.top);
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const setSize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(containerRef.current);

    // Animation Loop
    let raf: number;
    const loop = (t: number) => {
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext(); // Zabicie kontekstu GPU
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
    };
  }, []); // Pusta tablica - uruchom tylko raz

  return <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none" />;
};

export default Plasma;