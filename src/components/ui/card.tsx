<<<<<<< HEAD
=======
import { cn } from "@/lib/utils"; // ✅ utility for className merging (optional, but recommended)
>>>>>>> jude
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

<<<<<<< HEAD
export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-xl shadow-md bg-white p-4 border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`mt-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
=======
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border bg-white shadow-sm transition hover:shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6", className)} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";
>>>>>>> jude
