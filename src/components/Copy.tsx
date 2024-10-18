"use client";

import { useToast } from "@/hooks/use-toast";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

type CopyProps = {
  text: string;
};

// compatiable
const execCopy = (text: string): boolean => {
  const input = document.createElement("input");
  input.value = text;
  input.style.position = "absolute";
  input.style.top = "-9999px";
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    setTimeout(() => {
      document.body.removeChild(input);
    }, 1e3);
  } catch (e) {
    console.warn("Browser copy unsupport.");
    return false;
  }
  return true;
};

// exec command: copy
const execCommand = {
  async copy(text: string): Promise<boolean> {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        return execCopy(text);
      }
    } else {
      return execCopy(text);
    }
  },
};

export default function CopyText({ text }: CopyProps) {
  const [status, setStatus] = useState<boolean>(false);
  const { toast } = useToast();
  const onCopy = () => {
    setStatus(true);
    execCommand.copy(text).then((success) => {
      if (success) {
        toast({
          description: "复制成功",
        });
      }
    });
    const timerId = setTimeout(() => {
      setStatus(false);
      clearTimeout(timerId);
    }, 2e3);
  };
  return (
    <>
      {status ? (
        <CopyCheck className="cursor-pointer" size={16} />
      ) : (
        <Copy className="cursor-pointer" size={16} onClick={onCopy} />
      )}
    </>
  );
}
