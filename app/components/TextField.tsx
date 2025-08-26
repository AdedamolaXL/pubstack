import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { forwardRef, InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  endDecorator?: React.ReactNode;
  startDecorator?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, helperText, error, endDecorator, startDecorator, className = "", ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-medium text-dune-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {startDecorator && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {startDecorator}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
              error 
                ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300"
            } ${startDecorator ? 'pl-10' : ''} ${endDecorator ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {endDecorator && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {endDecorator}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={`mt-2 text-sm flex items-center gap-1 ${
              error ? "text-red-600" : "text-dune-500"
            }`}
          >
            {error && <InformationCircleIcon className="h-4 w-4" />}
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";