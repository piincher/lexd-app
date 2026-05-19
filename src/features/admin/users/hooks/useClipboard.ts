import { useCallback } from "react";
import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";

/**
 * Hook to copy text to clipboard with feedback.
 */
export const useClipboard = () => {
  const copy = useCallback(async (text: string, label?: string) => {
    await Clipboard.setStringAsync(text);
    showMessage({
      message: `${label || "Texte"} copié`,
      type: "success",
      duration: 1500,
    });
  }, []);

  return { copy };
};
