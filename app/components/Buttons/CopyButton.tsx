"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface CopyButtonProps {
  copyValue: string;
  copyLabel?: string;
  variant?: 'plain' | 'ghost' | 'solid';
  className?: string;
}

const COPY_CLIPBOARD_RESET_INTERVAL = 3000;
export const CopyButton: React.FC<CopyButtonProps> = ({
  copyLabel,
  copyValue,
  variant = 'plain',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const setTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (setTimerRef.current) {
        clearTimeout(setTimerRef.current);
      }
    };
  }, []);

  const handleCopyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    if (setTimerRef.current) {
      clearTimeout(setTimerRef.current);
    }
    setTimerRef.current = setTimeout(() => {
      setCopied(false);
    }, COPY_CLIPBOARD_RESET_INTERVAL);
  }, [copyValue]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 border-none';
      case 'solid':
        return 'bg-primary-600 text-white hover:bg-primary-700';
      case 'plain':
      default:
        return 'bg-white border border-gray-300 hover:bg-gray-50';
    }
  };

  return copyLabel ? (
    <button
      onClick={handleCopyToClipboard}
      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm ${getVariantClasses()} ${className}`}
    >
      {copied ? "Copied" : <span className="truncate">{copyLabel}</span>}
      {copied ? <CheckIcon width={20} /> : <DocumentDuplicateIcon width={20} />}
    </button>
  ) : (
    <button 
      onClick={handleCopyToClipboard}
      className={`p-2 rounded-md ${getVariantClasses()} ${className}`}
    >
      {copied ? <CheckIcon width={20} /> : <DocumentDuplicateIcon width={20} />}
    </button>
  );
};