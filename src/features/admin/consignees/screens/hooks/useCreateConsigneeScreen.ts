import { useNavigation } from '@react-navigation/native';
import type { navigationProps } from '@src/navigations/type';
import { useCreateConsigneeForm } from '../../hooks';

export const useCreateConsigneeScreen = () => {
   const navigation = useNavigation<navigationProps>();
   const { formData, errors, isPending, handlers: formHandlers } = useCreateConsigneeForm();

   const handleBack = () => {
      navigation.goBack();
   };

   return {
      formData,
      errors,
      isPending,
      handlers: {
         updateField: formHandlers.updateField,
         handleSubmit: formHandlers.handleSubmit,
         handleBack,
      },
   };
};
