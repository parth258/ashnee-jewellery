import diamondIcon from "@/assets/icons/diamond.png";

export const Diamond = ({ className = "" }) => (
  <img
    src={diamondIcon}
    alt=""
    aria-hidden="true"
    className={`inline-block h-3 w-3 object-contain ${className}`}
  />
);

export const DiamondDivider = ({ className = "", testId }) => (
  <div data-testid={testId} className={`flex items-center justify-center gap-4 ${className}`}>
    <span className="h-px w-16 bg-current opacity-30" />
    <Diamond />
    <span className="h-px w-16 bg-current opacity-30" />
  </div>
);