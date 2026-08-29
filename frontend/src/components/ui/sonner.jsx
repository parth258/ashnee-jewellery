import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-charcoal group-[.toaster]:border-hairline group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-clay",
          actionButton: "group-[.toast]:bg-maroon group-[.toast]:text-ivory",
          cancelButton: "group-[.toast]:bg-sand group-[.toast]:text-clay",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
