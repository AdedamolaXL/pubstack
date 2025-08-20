import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface GasCreditsProps {
  credits: string | number;
  className?: string;
}

export const GasCredits: React.FC<GasCreditsProps> = ({ 
  credits, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full ${className}`}>
      <InformationCircleIcon className="h-4 w-4 text-blue-600" />
      <span className="text-xs font-medium text-blue-700">
        Gas Credits: {credits}
      </span>
    </div>
  );
};