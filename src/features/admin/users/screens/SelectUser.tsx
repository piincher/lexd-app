import type { RootStackScreenProps } from "@src/navigations/type";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "@src/components/AppButton/AppButton";
import { Header } from "@src/components/Header/Header";
import { useSelectUser } from "../hooks/useSelectUser";
import { UserSearchInput } from "../components/UserSearchInput";
import { UserSelectList } from "../components/UserSelectList";
import { createStyles } from "./SelectUser.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

const BUTTON_TITLE = "Ajouter";

const SelectUser = ({ navigation }: RootStackScreenProps<"SelectUser">) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const { selectedUser, search, filteredUsers, handlers } = useSelectUser(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choisir un client" navigation={navigation} />
      <UserSearchInput value={search} onChangeText={handlers.handleSearch} />
      <UserSelectList
        users={filteredUsers}
        selectedUser={selectedUser}
        onSelectUser={handlers.handleSelectUser}
      />
      <View style={styles.buttonContainer}>
        <AppButton title={BUTTON_TITLE} onPress={handlers.handleCreate} />
      </View>
    </SafeAreaView>
  );
};

export default SelectUser;
