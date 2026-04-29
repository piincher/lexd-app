import { useState } from "react";
import * as Clipboard from "expo-clipboard";

export const useClipboard = () => {
   const [isCopied, setIsCopied] = useState(false);

   const copyToClipboard = async (text: string) => {
      try {
         await Clipboard.setStringAsync(text);
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
         console.error("Failed to copy to clipboard", error);
      }
   };

   return { copyToClipboard, isCopied };
};
