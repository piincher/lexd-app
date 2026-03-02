import { sendNotificationSms } from "@src/api/order";
import { SMSKEY } from "@src/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

export const useSendNotificationSms = () => {
   const queryClient = useQueryClient();
   const navigation = useNavigation();
   
   return useMutation({
      mutationFn: sendNotificationSms,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [SMSKEY] });
         navigation.navigate("HomeTab", { screen: "Home" });
      },
   });
};
