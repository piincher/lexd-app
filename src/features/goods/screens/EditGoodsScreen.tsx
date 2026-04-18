/**
 * Edit Goods Screen
 * Allows clients to edit goods information before container assignment
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, ActivityIndicator, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { useEditGoodsScreen } from './hooks/useEditGoodsScreen';
import { GoodsForm } from '../components';
import { useAuth } from '@src/store/Auth';

const EditGoodsScreen: React.FC<RootStackScreenProps<'EditGoods'>> = ({
  route,
  navigation,
}) => {
  const { goodsId } = route.params;
  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  const isAdmin = user?.role === 'admin';
  const isAuthLoading = !token; // Auth hasn't rehydrated yet if no token
  
  const {
    formData,
    isLoading,
    isSaving,
    isError,
    error,
    canEdit,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSave,
  } = useEditGoodsScreen(goodsId, isAdmin);

  if (isAuthLoading || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Modifier" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.Crimson} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !canEdit) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Modifier" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name={!isAdmin ? "shield-lock" : "lock"} size={64} color={COLORS.SlateGray} />
          <Text style={styles.errorTitle}>Modification impossible</Text>
          <Text style={styles.errorText}>
            {error || 'Les marchandises ne peuvent être modifiées après leur assignation à un conteneur.'}
          </Text>
          <Button mode="contained" onPress={() => navigation.goBack()} style={styles.backButton}>
            Retour
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Modifier la marchandise" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GoodsForm
          data={formData}
          onChange={updateField}
          calculatedCBM={calculatedCBM}
          calculatedTotalCost={calculatedTotalCost}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          loading={isSaving}
          disabled={isSaving}
          style={styles.saveButton}
          icon="content-save"
        >
          {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  backButton: {
    marginTop: 24,
  },
  saveButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});

export default EditGoodsScreen;
