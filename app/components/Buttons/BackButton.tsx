import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export const BackButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onClick}>
        <ArrowLeftIcon className="text-gray-500" width={20} />
      </button>
      <p>
        {children}
      </p>
    </div>
  );
};
