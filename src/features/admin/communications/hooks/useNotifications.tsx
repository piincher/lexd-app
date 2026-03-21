import { sendNotificationSms } from "@src/api/order";
import { SMSKEY } from "@src/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";

export const useSendNotificationSms = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: sendNotificationSms,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [SMSKEY] });
         showMessage({
            message: "SMS envoye avec succes",
            description: "Votre message a ete mis en file d'attente pour l'envoi.",
            type: "success",
            duration: 3000,
         });
      },
      onError: () => {
         showMessage({
            message: "Echec de l'envoi",
            description: "Une erreur est survenue. Veuillez reessayer.",
            type: "danger",
         });
      },
   });
};
