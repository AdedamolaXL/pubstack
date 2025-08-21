import { ReactNode } from "react";

interface LoadingWrapper {
  isLoading: boolean;
  children: ReactNode;
}

export const LoadingWrapper: React.FC<LoadingWrapper> = ({
  isLoading,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};