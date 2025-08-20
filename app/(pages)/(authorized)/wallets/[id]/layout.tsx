"use client";
import { CopyButton } from "@/app/components";
import { useW3sContext } from '@/app/providers/W3sProvider'
import { blockchainMeta, getAddressAbbreviation } from "@/app/shared/utils";
import { signOut } from "next-auth/react";
import { useRestorePinMutation, useWallet, useWallets } from "@/app/axios";
import Image from "next/image";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { blockchainNames } from "@/app/shared/types";

type WalletLayoutParams = {
  /*
   * Wallet id.
   */
  id: string;
};

export default function WalletLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: WalletLayoutParams;
}) {
  const router = useRouter();
  const { client } = useW3sContext();
  const { data: wallet } = useWallet(params.id);
  const { data: wallets } = useWallets();
  const restorePin = useRestorePinMutation();

  const blockchainInfo = blockchainMeta(wallet?.data.wallet.blockchain);
  const walletAddress = wallet?.data.wallet.address ?? "";

  const handleChangePin = async () => {
    const challengeId = await restorePin.mutateAsync();

    client?.execute(challengeId, (error) => {
      if (!error) {
        // handle successful changing of pin.
        alert("Your pin has successfully been reset");
      }

      // handle change pin error (e.g. user closed out, bad answers, etc).
    });
  };

  const handleSignOut = () =>
    signOut({
      redirect: true,
      callbackUrl: process.env.NEXTAUTH_URL,
    });

  return (
     <div className="min-h-screen bg-gray-50">
      {/* Wallet Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <button
              title={blockchainInfo.testnet}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {blockchainInfo.svg ? (
                <Image
                  alt="blockchain"
                  src={blockchainInfo.svg}
                  width={24}
                  height={24}
                />
              ) : (
                <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>

            <CopyButton
              copyValue={walletAddress}
              copyLabel={getAddressAbbreviation(walletAddress)}
              variant="outline"
            />
          </div>

          <div className="relative">
            <button
              disabled={restorePin.isLoading}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              {restorePin.isLoading ? (
                <div className="h-5 w-5 animate-spin">↻</div>
              ) : (
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg origin-top-right z-10">
              <div className="py-1">
                {wallets?.data.wallets.map((wallet) => {
                  if (wallet.id === params.id) return null;
                  return (
                    <button
                      key={wallet.id}
                      onClick={() => router.push(`/wallets/${wallet.id}`)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Image
                        src={blockchainMeta(wallet.blockchain).svg}
                        alt={`${wallet.blockchain}-icon`}
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      {blockchainNames[wallet.blockchain]}
                    </button>
                  );
                })}
                <button
                  onClick={() => router.push("/wallets/create")}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create new wallet
                </button>
                <button
                  onClick={handleChangePin}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Cog6ToothIcon className="h-4 w-4 mr-2" />
                  Change Pin
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <ArrowRightStartOnRectangleIcon className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}
