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
        <div className="grid justify-center items-center mt-16">
        </div>
      ) : (
        children
      )}
    </>
  );
};
