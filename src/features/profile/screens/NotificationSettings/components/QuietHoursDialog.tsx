import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Portal, Dialog, Button, Text, TextInput } from "react-native-paper";
import { Theme } from "@src/constants/Theme";

interface QuietHoursDialogProps {
   visible: boolean;
   startTime: string;
   endTime: string;
   onDismiss: () => void;
   onSave: (startTime: string, endTime: string) => void;
}

export const QuietHoursDialog: React.FC<QuietHoursDialogProps> = ({
   visible,
   startTime: initialStartTime,
   endTime: initialEndTime,
   onDismiss,
   onSave,
}) => {
   const [startTime, setStartTime] = useState(initialStartTime);
   const [endTime, setEndTime] = useState(initialEndTime);

   const handleSave = () => {
      onSave(startTime, endTime);
      onDismiss();
   };

   return (
      <Portal>
         <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Definir les heures silencieuses</Dialog.Title>
            <Dialog.Content>
               <Text style={styles.dialogText}>
                  Configurez la plage horaire pendant laquelle les notifications doivent etre
                  silencieuses.
               </Text>
               <TextInput
                  label="Heure de debut"
                  value={startTime}
                  onChangeText={setStartTime}
                  style={styles.input}
               />
               <TextInput
                  label="Heure de fin"
                  value={endTime}
                  onChangeText={setEndTime}
                  style={styles.input}
               />
            </Dialog.Content>
            <Dialog.Actions>
               <Button onPress={onDismiss}>Annuler</Button>
               <Button onPress={handleSave}>Enregistrer</Button>
            </Dialog.Actions>
         </Dialog>
      </Portal>
   );
};

const styles = StyleSheet.create({
   dialogText: {
      fontSize: 14,
      color: Theme.colors.text.secondary,
      marginBottom: 12,
   },
   input: {
      marginTop: 8,
   },
});
