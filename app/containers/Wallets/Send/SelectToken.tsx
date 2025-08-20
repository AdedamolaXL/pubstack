"use client";
import { useWalletBalances } from "@/app/axios";
import {
  BackButton,
  Content,
  LoadingWrapper,
  TokenCard,
} from "@/app/components";
import { useRouter } from "next/navigation";

interface SelectTokenProps {
  walletId: string;
}

export const SelectToken = ({ walletId }: SelectTokenProps) => {
  const { data, isLoading } = useWalletBalances(walletId);
  const router = useRouter();
  const tokenBalances = data?.data.tokenBalances;

  const isGreaterThanZero = (amount = "") => {
    if (parseFloat(amount) > 0) {
      return true;
    }

    return false;
  };

  return (
     <LoadingWrapper isLoading={isLoading}>
      <Content>
        <nav className="mb-4">
          <BackButton onClick={router.back} className="text-indigo-600 hover:text-indigo-700">
            Select a token to send
          </BackButton>
        </nav>
        
        {tokenBalances && tokenBalances.length > 0 ? (
          <ul className="space-y-3">
            {tokenBalances.map((tokenBalance) =>
              isGreaterThanZero(tokenBalance.amount) ? (
                <li key={tokenBalance?.token.name}>
                  <TokenCard
                    amount={tokenBalance?.amount}
                    token={tokenBalance?.token}
                    onClick={() =>
                      router.push(
                        `/wallets/${walletId}/send/${encodeURIComponent(tokenBalance.token.name ?? "")}`,
                      )
                    }
                  />
                </li>
              ) : null,
            )}
          </ul>
        ) : (
          <div className="text-center mt-6 text-gray-500 flex items-center justify-center gap-2">
            No Tokens yet
          </div>
        )}
      </Content>
    </LoadingWrapper>
  );
};
