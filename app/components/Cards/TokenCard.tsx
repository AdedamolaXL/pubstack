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
      className={`rounded-lg bg-white ${onClick ? "cursor-pointer hover:bg-slate-50 transition-all" : ""}`}
      onClick={onClick}
    >
      <div className='flex flex-row gap-6'>
        {tokenMeta.svg !== "" ? (
          <Image
            alt='token'
            height={36}
            width={36}
            src={tokenMeta.svg}
            className='my-auto'
          />
        ) : (
          <ExclamationCircleIcon width={40} height={40} />
        )}
        <div>
          <p level='body-md'>{tokenMeta.name}</p>

          <p level='body-sm'>{`${amount} ${tokenMeta.name}`}</p>
        </div>
      </div>
    </div>
  );
};
