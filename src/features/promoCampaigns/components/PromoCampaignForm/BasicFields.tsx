import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PromoCampaignForm.styles';

interface BasicFieldsProps {
  title: string;
  setTitle: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
  body: string;
  setBody: (v: string) => void;
  backgroundColor: string;
  setBackgroundColor: (v: string) => void;
  textColor: string;
  setTextColor: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  targetLanguages: string;
  setTargetLanguages: (v: string) => void;
  targetPlatforms: string;
  setTargetPlatforms: (v: string) => void;
  dismissBehavior: string;
  setDismissBehavior: (v: string) => void;
  priority: string;
  setPriority: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
}

export const BasicFields: React.FC<BasicFieldsProps> = (props) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <>
      <Text style={styles.label}>Titre</Text>
      <TextInput style={styles.input} value={props.title} onChangeText={props.setTitle} placeholder="Titre de la campagne" />

      <Text style={styles.label}>Sous-titre</Text>
      <TextInput style={styles.input} value={props.subtitle} onChangeText={props.setSubtitle} placeholder="Sous-titre" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, styles.textArea]} value={props.body} onChangeText={props.setBody} multiline placeholder="Description" />

      <Text style={styles.label}>Couleurs</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.flex]} value={props.backgroundColor} onChangeText={props.setBackgroundColor} placeholder="Fond (#1E3A5F)" />
        <TextInput style={[styles.input, styles.flex]} value={props.textColor} onChangeText={props.setTextColor} placeholder="Texte (#FFFFFF)" />
      </View>

      <Text style={styles.label}>Période</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.flex]} value={props.startDate} onChangeText={props.setStartDate} placeholder="YYYY-MM-DD" />
        <TextInput style={[styles.input, styles.flex]} value={props.endDate} onChangeText={props.setEndDate} placeholder="YYYY-MM-DD" />
      </View>

      <Text style={styles.label}>Langues cibles (séparées par des virgules)</Text>
      <TextInput style={styles.input} value={props.targetLanguages} onChangeText={props.setTargetLanguages} placeholder="fr,en,zh,ar" />

      <Text style={styles.label}>Plateformes cibles (séparées par des virgules)</Text>
      <TextInput style={styles.input} value={props.targetPlatforms} onChangeText={props.setTargetPlatforms} placeholder="ios,android,web" />

      <Text style={styles.label}>Comportement à la fermeture</Text>
      <TextInput style={styles.input} value={props.dismissBehavior} onChangeText={props.setDismissBehavior} placeholder="SHOW_AGAIN_NEXT_LAUNCH | HIDE_FOR_24H | NEVER_SHOW_AGAIN" />

      <Text style={styles.label}>Priorité</Text>
      <TextInput style={styles.input} value={props.priority} onChangeText={props.setPriority} keyboardType="numeric" placeholder="0" />

      <Text style={styles.label}>Statut</Text>
      <TextInput style={styles.input} value={props.status} onChangeText={props.setStatus} placeholder="ACTIVE | PAUSED | DRAFT" />
    </>
  );
};
