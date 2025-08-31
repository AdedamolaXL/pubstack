'use client';
import { useCart } from '@/app/context/CardContext';
import { useWallets, useWallet, useWalletBalances } from '@/app/axios';
import { BlockchainEnum, blockchainNames } from '@/app/shared/types';
import { LoadingWrapper } from '@/app/components';
import { useCreateTransferMutation } from '@/app/axios/transactions';
import { useW3sContext } from '@/app/providers/W3sProvider';
import { blockchainMeta } from '@/app/shared/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


type SupportedTestnet = 
  | BlockchainEnum.MATIC_AMOY 
  | BlockchainEnum.ETH_SEPOLIA 
  | BlockchainEnum.AVAX_FUJI 
  | BlockchainEnum.SOL_DEVNET;

const MERCHANT_ADDRESSES: Record<SupportedTestnet, string> = {
  [BlockchainEnum.MATIC_AMOY]: '0xce8686244f66cd6576180ddb406a065f7f6e16f3',
  [BlockchainEnum.ETH_SEPOLIA]: '0x75efbc20e4b1f9a5edd3b03c7b179e8710991458',
  [BlockchainEnum.AVAX_FUJI]: '0x75efbc20e4b1f9a5edd3b03c7b179e8710991458',
  [BlockchainEnum.SOL_DEVNET]: 'D8j86vqE3ERGb2Mt1aA6xPecb4L3sagfUNuD3JLRz5FC',
};

const isSupportedBlockchain = (blockchain: string): blockchain is SupportedTestnet => {
  return Object.keys(MERCHANT_ADDRESSES).includes(blockchain);
};

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: wallets } = useWallets();
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { client } = useW3sContext();
  const { data: selectedWallet } = useWallet(selectedWalletId || '');
  
  const { data: walletBalances } = useWalletBalances(
    selectedWalletId || '',
    { name: 'USDC' }
  );
  
  const createTransfer = useCreateTransferMutation();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  const walletsWithBalance = wallets?.data?.wallets?.map(wallet => {
    return {
      ...wallet,
      blockchainInfo: blockchainMeta(wallet.blockchain)
    };
  }) || [];

  const handlePayment = async () => {
    if (!selectedWalletId || !selectedWallet) {
      setError('Please select a wallet');
      return;
    }
    
    if (!isSupportedBlockchain(selectedWallet.data.wallet.blockchain)) {
      setError('Merchant does not accept payments on this blockchain');
      return;
    }

    const usdcTokenBalance = walletBalances?.data?.tokenBalances[0];
    if (!usdcTokenBalance) {
      setError('USDC token not found in wallet');
      return;
    }
    
    const usdcToken = usdcTokenBalance.token;

    const usdcBalance = parseFloat(usdcTokenBalance.amount);
    if (usdcBalance < cartTotal) {
      setError(`Insufficient USDC balance. You need ${cartTotal} USDC but only have ${usdcBalance.toFixed(2)}`);
      return;
    }
    
    const merchantAddress = MERCHANT_ADDRESSES[selectedWallet.data.wallet.blockchain as SupportedTestnet];
     if (!merchantAddress) {
      setError('Merchant does not accept payments on this blockchain');
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Payment details:', {
        destinationAddress: merchantAddress,
        tokenId: usdcToken.id,
        walletId: selectedWalletId,
        amounts: [cartTotal.toFixed(6)],
        feeLevel: "LOW",
        cartTotal: cartTotal
      });

      const { challengeId } = await createTransfer.mutateAsync({
        destinationAddress: merchantAddress,
        tokenId: usdcToken.id,
        walletId: selectedWalletId,
        amounts: [cartTotal.toFixed(6)],
        feeLevel: "LOW"
      });

      console.log('Transaction initiated with challengeId:', challengeId);
      
      client?.execute(challengeId, (error) => {
        if (error) {
          setError('Payment failed: ' + error.message);
          setIsProcessing(false);
        } else {
          clearCart();
          router.push(`/checkout/success?wallet=${selectedWalletId}&amount=${cartTotal}&challengeId=${challengeId}`);
        }
      });
    } catch (err) {
      setError('Payment failed: ' + (err as Error).message);
      setIsProcessing(false);
    }
  };

  if (status === 'loading') {
    return (
      <LoadingWrapper isLoading={true}>
        <div></div>
      </LoadingWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-dune-900 mb-6">Checkout</h1>
        
        {/* Cart Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-dune-900 mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <li key={item.id} className="py-4 flex justify-between">
                <span className="text-dune-700">{item.name} x {item.quantity}</span>
                <span className="text-dune-900 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold text-dune-900">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)} USDC</span>
          </div>
        </div>

        {/* Wallet Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-dune-900 mb-4">Pay with USDC</h2>
          <p className="text-dune-600 mb-4">
            Select a wallet to complete your payment
          </p>
          
          {walletsWithBalance.length === 0 ? (
            <div className="text-center py-8">
              <Image
                src="/NoWallet.svg"
                width={80}
                height={80}
                alt="No wallets"
                className="mx-auto mb-4"
              />
              <p className="text-dune-600 mb-4">
                You don&apos;t have any wallets with USDC
              </p>
              <button
                onClick={() => router.push('/wallets/create')}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Create Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {walletsWithBalance.map(wallet => {
                // For each wallet, we need to get its USDC balance
                return (
                  <WalletBalanceItem 
                    key={wallet.id}
                    wallet={wallet}
                    isSelected={selectedWalletId === wallet.id}
                    onSelect={() => setSelectedWalletId(wallet.id)}
                    cartTotal={cartTotal}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedWalletId || isProcessing}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            !selectedWalletId || isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {isProcessing ? 'Processing Payment...' : 'Pay with USDC'}
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

        {isProcessing && (
          <div className="mt-4 text-center text-dune-600">
            <p>Confirming transaction in your wallet...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const WalletBalanceItem = ({ 
  wallet, 
  isSelected, 
  onSelect, 
  cartTotal 
}: { 
  wallet: any; 
  isSelected: boolean;
  onSelect: () => void;
  cartTotal: number;
}) => {
  const { data: balances, isLoading } = useWalletBalances(wallet.id, { name: 'USDC' });
  const usdcBalance = balances?.data?.tokenBalances[0]?.amount || '0';
  const hasSufficientBalance = parseFloat(usdcBalance) >= cartTotal;
  const isSupported = isSupportedBlockchain(wallet.blockchain);

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
          : 'border-gray-200 hover:border-gray-300'
      } ${
        !isSupported || !hasSufficientBalance ? 'opacity-60' : ''
      }`}
      onClick={isSupported && hasSufficientBalance ? onSelect : undefined}
    >
      <div className="flex items-center">
        <Image
          src={wallet.blockchainInfo.svg}
          width={24}
          height={24}
          alt={wallet.blockchain}
          className="mr-3"
        />
        <div className="flex-1">
          <p className="font-medium text-dune-900">
            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
          </p>
          <p className="text-sm text-dune-600">
            {blockchainNames[wallet.blockchain]}
          </p>
          {!isSupported && (
            <p className="text-xs text-red-500 mt-1">
              Merchant doesn&apos;t accept payments on this network
            </p>
          )}
        </div>
        {isLoading ? (
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <div className="text-right">
            <p className="font-medium text-dune-900">
              {usdcBalance} USDC
            </p>
            <p className={`text-sm ${hasSufficientBalance ? 'text-green-600' : 'text-red-500'}`}>
              {hasSufficientBalance ? 'Sufficient' : 'Insufficient'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};