import { useCallback } from "react";
import { Share } from "react-native";
import { useCreateShareToken } from "@src/shared/hooks/useCreateShareToken";
import { Goods } from "../api";

export interface UseGoodsShareResult {
  handleShare: () => Promise<void>;
}

export const useGoodsShare = (goods: Goods): UseGoodsShareResult => {
  const { mutateAsync: createShareToken } = useCreateShareToken();

  const handleShare = useCallback(async () => {
    try {
      const result = await createShareToken({
        type: "goods",
        resourceReference: goods.goodsId,
      });
      await Share.share({
        message: `Suivez ma marchandise ChinaLink Express: ${goods.goodsId}\n${result.url}`,
        title: `Marchandise ${goods.goodsId}`,
      });
    } catch {
      try {
        await Share.share({
          message: `Marchandise ${goods.goodsId} - ${goods.description}\nStatut: ${goods.status}`,
          title: `Détails Marchandise ${goods.goodsId}`,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  }, [goods, createShareToken]);

  return { handleShare };
};
