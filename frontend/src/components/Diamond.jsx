export const Diamond = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`h-3 w-3 ${className}`}>
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
);

export const DiamondDivider = ({ className = "", testId }) => (
  <div data-testid={testId} className={`flex items-center justify-center gap-4 ${className}`}>
    <span className="h-px w-16 bg-current opacity-30" />
    <Diamond className="text-gold" />
    <span className="h-px w-16 bg-current opacity-30" />
  </div>
);
