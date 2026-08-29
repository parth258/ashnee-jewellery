import { Diamond } from "./Diamond";
export const JewelFrame = ({ image, label, aspect = "aspect-[3/4]", arch = false, className = "", testId }) => (
  <div
    data-testid={testId}
    className={`group relative overflow-hidden border border-hairline bg-sand ${aspect} ${
      arch ? "rounded-t-[10rem] sm:rounded-t-[12rem]" : ""
    } ${className}`}
  >
    {image ? (
      <img
        src={image}
        alt={label || "Ashnee jewellery"}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_28%,#F6EDE2_0%,#E8DCD0_72%)]">
        <Diamond className="h-6 w-6 text-maroon/30" />
        {label && (
          <span className="px-4 text-center text-[10px] uppercase tracking-[0.3em] text-clay/70">{label}</span>
        )}
      </div>
    )}
    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(246,237,226,0.35)]" />
  </div>
);
