import React, { useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PromoCampaignForm.styles';

interface Slide {
  imageUrl: string;
  title: string;
  body: string;
  ctaText: string;
  ctaAction: string;
  ctaTarget: string;
  order: number;
}

interface SlideEditorProps {
  slides: Slide[];
  updateSlide: (index: number, field: string, value: string) => void;
  removeSlide: (index: number) => void;
  addSlide: () => void;
}

export const SlideEditor: React.FC<SlideEditorProps> = ({ slides, updateSlide, removeSlide, addSlide }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const pickImage = useCallback(async (index: number) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'L\'accès à la galerie est nécessaire pour choisir une image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        updateSlide(index, 'imageUrl', result.assets[0].uri);
      }
    } catch (error) {
      console.error('[SlideEditor] Image picker error:', error);
      Alert.alert('Erreur', 'Impossible de sélectionner l\'image');
    }
  }, [updateSlide]);

  return (
    <>
      <Text style={styles.sectionTitle}>Slides</Text>
      {slides.map((slide, index) => (
        <View key={index} style={styles.slideCard}>
          <Text style={styles.label}>Image</Text>
          {slide.imageUrl ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: slide.imageUrl }} style={styles.thumbnail} />
              <TouchableOpacity style={styles.changeImageButton} onPress={() => pickImage(index)}>
                <Text style={styles.changeImageText}>Changer l&apos;image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.pickImageButton} onPress={() => pickImage(index)}>
              <Text style={styles.pickImageText}>Choisir une image</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.label}>Titre slide</Text>
          <TextInput style={styles.input} value={slide.title} onChangeText={(v) => updateSlide(index, 'title', v)} placeholder="Titre" />
          <Text style={styles.label}>Texte slide</Text>
          <TextInput style={[styles.input, styles.textArea]} value={slide.body} onChangeText={(v) => updateSlide(index, 'body', v)} multiline placeholder="Texte" />
          <Text style={styles.label}>CTA slide</Text>
          <TextInput style={styles.input} value={slide.ctaText} onChangeText={(v) => updateSlide(index, 'ctaText', v)} placeholder="Texte du bouton" />
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.flex]} value={slide.ctaAction} onChangeText={(v) => updateSlide(index, 'ctaAction', v)} placeholder="Action" />
            <TextInput style={[styles.input, styles.flex]} value={slide.ctaTarget} onChangeText={(v) => updateSlide(index, 'ctaTarget', v)} placeholder="Cible" />
          </View>
          {slides.length > 1 && (
            <TouchableOpacity onPress={() => removeSlide(index)}>
              <Text style={styles.removeText}>Supprimer cette slide</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addSlide}>
        <Text style={styles.addButtonText}>+ Ajouter une slide</Text>
      </TouchableOpacity>
    </>
  );
};
