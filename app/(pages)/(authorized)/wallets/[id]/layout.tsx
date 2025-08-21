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
  ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { blockchainNames } from "@/app/shared/types";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const blockchainInfo = blockchainMeta(wallet?.data.wallet.blockchain);
  const walletAddress = wallet?.data.wallet.address ?? "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangePin = async () => {
    setIsDropdownOpen(false);
    const challengeId = await restorePin.mutateAsync();

    client?.execute(challengeId, (error) => {
      if (!error) {
        // handle successful changing of pin.
        alert("Your pin has successfully been reset");
      }

      // handle change pin error (e.g. user closed out, bad answers, etc).
    });
  };

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    signOut({
      redirect: true,
      callbackUrl: process.env.NEXTAUTH_URL,
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Combined Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/70 w-full">
        <div className="flex items-center justify-between p-4">
          {/* PUSHCART on far left */}
          <Link 
            href="/signin" 
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors flex-shrink-0"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-sm">
              <ShoppingCartIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <span className="font-bold text-lg">PUSHCART</span>
          </Link>

          {/* Wallet Address centered with maximum space */}
          <div className="flex items-center justify-center flex-grow mx-4 min-w-0">
            <div className="flex items-center gap-4 bg-indigo-50/50 rounded-xl p-3 w-full max-w-4xl">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-sm flex-shrink-0">
                {blockchainInfo.svg ? (
                  <Image
                    alt="blockchain"
                    src={blockchainInfo.svg}
                    width={24}
                    height={24}
                    className="filter brightness-110"
                  />
                ) : (
                  <QuestionMarkCircleIcon className="h-6 w-6 text-indigo-400" />
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-grow">
                <span className="text-xs text-gray-500 font-medium">Wallet Address</span>
                <div className="flex items-center gap-2 justify-between w-full">
                  <span className="text-sm font-medium text-gray-800 truncate flex-grow">
                    {walletAddress}
                  </span>
                  <CopyButton
                    copyValue={walletAddress}
                    variant="ghost"
                    className="text-gray-600 hover:text-indigo-600 flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown menu on right */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              disabled={restorePin.isLoading}
              className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all disabled:opacity-50"
            >
              {restorePin.isLoading ? (
                <div className="h-5 w-5 animate-spin text-indigo-600">↻</div>
              ) : (
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/70 origin-top-right z-10 overflow-hidden">
                <div className="py-1.5">
                  {wallets?.data.wallets.map((wallet) => {
                    if (wallet.id === params.id) return null;
                    return (
                      <button
                        key={wallet.id}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          router.push(`/wallets/${wallet.id}`);
                        }}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/80 w-full text-left transition-colors"
                      >
                        <Image
                          src={blockchainMeta(wallet.blockchain).svg}
                          alt={`${wallet.blockchain}-icon`}
                          width={16}
                          height={16}
                          className="mr-2.5"
                        />
                        {blockchainNames[wallet.blockchain]}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/wallets/create");
                    }}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/80 w-full text-left transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2.5" />
                    Create new wallet
                  </button>
                  <button
                    onClick={handleChangePin}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/80 w-full text-left transition-colors"
                  >
                    <Cog6ToothIcon className="h-4 w-4 mr-2.5" />
                    Change Pin
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/80 w-full text-left transition-colors"
                  >
                    <ArrowRightStartOnRectangleIcon className="h-4 w-4 mr-2.5" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
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