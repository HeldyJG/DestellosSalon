import React from 'react';

interface DestellosLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'inline' | 'icon-only';
  inverted?: boolean;
}

export const DestellosLogo: React.FC<DestellosLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  inverted = false,
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const ringStroke = inverted ? '#E5A9B4' : '#CA7F73';
  const bgFill = inverted ? '#0A192F' : '#FAF8F5';

  const [imgSrc, setImgSrc] = React.useState('/img/logo.png');

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className={`relative ${sizeClasses[size]} flex-shrink-0 rounded-full overflow-hidden border border-[#D48B95]/40 shadow-xs`}>
          <img
            src={imgSrc}
            onError={() => setImgSrc('/logo.svg')}
            alt="Destellos Salón Chiclayo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-[0.22em] font-bold leading-none ${
              inverted ? 'text-[#FAF8F5]' : 'text-[#0A192F]'
            } ${size === 'lg' || size === 'xl' ? 'text-2xl' : 'text-lg'}`}
          >
            DESTELLOS
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.35em] font-medium leading-tight mt-0.5 ${
              inverted ? 'text-[#E5A9B4]' : 'text-[#CA7F73]'
            }`}
          >
            SALÓN • CHICLAYO
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      <img
        src={imgSrc}
        onError={() => setImgSrc('/logo.svg')}
        alt="Logo Destellos Salón Chiclayo"
        className="w-full h-full object-contain drop-shadow-xs transition-transform hover:scale-105 duration-300"
      />
    </div>
  );
};
