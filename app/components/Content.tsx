import React from "react";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Content: React.FC<ContentProps> = ({ children, className = "" }) => {
  return (
    <div className={`p-6 ${className}`}>
      <div className="max-w-4xl mx-auto text-dune-900">
        {children}
      </div>
    </div>
  );
};