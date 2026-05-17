import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@src/components/Header/Header';
import { Notification } from '@src/components/Notification/Notification';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';

import { AddUserForm } from '../components/AddUserForm';
import { FormBackground } from '../components/FormBackground';
import { useAddUser } from '../hooks/useAddUser';
import { createStyles } from './AddUser.styles';

const AddUser = ({ navigation }: RootStackScreenProps<'UserAdd'>) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    visible,
    onDismissSnackBar,
    selectedCode,
    setSelectedCode,
    isPending,
    handleSubmit,
    initialValues,
    signupSchema,
    signUpDataCode,
    phoneMaxLength,
  } = useAddUser(navigation);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FormBackground />
      <Header
        title="Ajouter un utilisateur"
        navigation={navigation}
        showNotificationBell
      />
      <View style={styles.content}>
        <AddUserForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signupSchema}
          selectedCode={selectedCode}
          setSelectedCode={setSelectedCode}
          isPending={isPending}
          signUpDataCode={signUpDataCode}
          phoneMaxLength={phoneMaxLength}
        />
      </View>
      <Notification
        message="Utilisateur ajouté avec succès"
        type="success"
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
      />
    </SafeAreaView>
  );
};

export default AddUser;
