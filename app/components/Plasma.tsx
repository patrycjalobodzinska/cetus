"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    ogl: any;
  }
}

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
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
  vec2 mouseOffset = (uMouse - center) * 0.0001;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i = 0.0, d, z, T = iTime * uSpeed * uDirection;
  vec3 O = vec3(0.0), p, S;

  for (vec2 r = iResolution.xy, Q; i < 24.0; i++) {
    p = z * normalize(vec3(C - 0.5 * r, r.y));
    p.z -= 4.0;
    S = p;
    d = p.y - T;
    p.x += 0.4 * (1.0 + p.y) * sin(d + p.x * 0.1) * cos(0.34 * d + p.x * 0.05);
    Q = p.xz *= mat2(cos(p.y + vec4(0, 11, 33, 0) - T));
    z += d = abs(sqrt(length(Q * Q)) - 0.25 * (5.0 + S.y)) / 3.0 + 8e-4;
    o = 1.0 + sin(S.y + p.z * 0.5 + S.z - length(S - p) + vec4(2, 1, 0, 8));
    O += o.w / d * o.xyz;
  }
  o.xyz = tanh(O / 1e4);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = clamp(o.rgb, 0.0, 1.0);
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = "#ffffff",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: any, program: any, raf: number;

    import("ogl").then((ogl) => {
      const { Renderer, Program, Mesh, Triangle } = ogl;

      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        dpr: 0.75,
        antialias: false,
      });

      const gl = renderer.gl;
      containerRef.current?.appendChild(gl.canvas);

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uCustomColor: { value: new Float32Array(hexToRgb(color)) },
          uUseCustomColor: { value: 1.0 },
          uSpeed: { value: speed * 0.4 },
          uDirection: { value: direction === "reverse" ? -1.0 : 1.0 },
          uScale: { value: scale },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible.current = entry.isIntersecting;
        },
        { threshold: 0.1 },
      );
      observer.observe(containerRef.current!);

      const setSize = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          renderer.setSize(rect.width, rect.height);
          program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
          program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
        }
      };

      window.addEventListener("resize", setSize);
      setSize();

      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);

        if (!isVisible.current) return;

        program.uniforms.iTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      };

      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", setSize);
        observer.disconnect();
        try {
          gl.canvas.remove();
        } catch {}
      };
    });
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{ contain: "strict", zIndex: -1 }}
    />
  );
};

export default Plasma;
