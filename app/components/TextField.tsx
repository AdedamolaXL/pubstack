import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { forwardRef, InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  endDecorator?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, helperText, error, endDecorator, ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full px-4 py-3 border ${
              error ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
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
            className={`mt-1 text-sm ${
              error ? "text-red-600" : "text-gray-500"
            } flex items-center gap-1`}
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
