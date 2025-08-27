import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export const BackButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string; // Add this line
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}> {/* Add className here */}
      <button onClick={onClick}>
        <ArrowLeftIcon className="text-gray-500" width={20} />
      </button>
      <p>
        {children}
      </p>
    </div>
  );
};