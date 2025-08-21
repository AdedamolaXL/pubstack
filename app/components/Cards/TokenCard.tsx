import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { tokenHelper } from "@/app/shared/utils";
import Image from "next/image";
import { Token } from "@/app/shared/types";

interface TokenCardProps {
  token?: Token;
  amount: string;
  onClick?: () => void;
}

/**
 * Token balance card.
 */
export const TokenCard: React.FC<TokenCardProps> = ({
  token,
  amount,
  onClick,
}) => {
  const tokenMeta = tokenHelper(token?.name);

  return (
    <div
      className={`rounded-xl bg-white p-4 border border-gray-200/70 ${
        onClick ? "cursor-pointer hover:bg-indigo-50/50 transition-all" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {tokenMeta.svg !== "" ? (
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-sm">
            <Image
              alt='token'
              height={32}
              width={32}
              src={tokenMeta.svg}
              className="filter brightness-110"
            />
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-gray-100">
            <ExclamationCircleIcon className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <p className="font-medium text-gray-900">{tokenMeta.name}</p>
          <p className="text-gray-600 text-sm">{`${amount} ${tokenMeta.symbol}`}</p>
        </div>
        {onClick && (
          <div className="text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};