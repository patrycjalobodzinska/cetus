import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  classNameInner?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  classNameInner = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style
      }}
    >
      {/* Multiple stars for continuous effect - Bottom */}
      {[0, 1, 2, 3, 4].map((index) => {
        const speedValue = parseFloat(speed.toString().replace('s', ''));
        return (
          <div
            key={`bottom-${index}`}
            className="absolute w-[800%] h-[50%] opacity-100 bottom-[-11px] right-[-700%] rounded-full animate-star-movement-bottom z-0"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 8%)`,
              animationDuration: speed,
              animationDelay: `${(speedValue / 5) * index}s`
            }}
          ></div>
        );
      })}
      {/* Multiple stars for continuous effect - Top */}
      {[0, 1, 2, 3, 4].map((index) => {
        const speedValue = parseFloat(speed.toString().replace('s', ''));
        return (
          <div
            key={`top-${index}`}
            className="absolute w-[800%] h-[50%] opacity-100 top-[-10px] left-[-700%] rounded-full animate-star-movement-top z-0"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 8%)`,
              animationDuration: speed,
              animationDelay: `${(speedValue / 5) * index}s`
            }}
          ></div>
        );
      })}
      {/* Updated inner container with override capability via classNameInner */}
      <div className={`relative z-1 border border-gray-800 text-center text-[16px] py-[16px] px-[26px] rounded-[20px] w-full h-full flex items-center justify-center ${classNameInner ? classNameInner : 'bg-gradient-to-b from-black to-gray-900 text-white'}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
