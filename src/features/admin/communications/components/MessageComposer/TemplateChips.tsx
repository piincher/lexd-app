import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Template } from './composerConstants';
import { createStyles } from './MessageComposer.styles';

interface TemplateChipsProps {
  templates: Template[];
  onSelectTemplate: (message: string) => void;
}

export const TemplateChips: React.FC<TemplateChipsProps> = ({ templates, onSelectTemplate }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateScroll}>
    {templates.map((template) => (
      <TouchableOpacity
        key={template.label}
        onPress={() => onSelectTemplate(template.message)}
        style={styles.templateChip}
        activeOpacity={0.7}
      >
        <Ionicons name={template.icon as any} size={14} color={colors.primary[500]} />
        <Text style={styles.templateText} numberOfLines={1}>
          {template.label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
  );
};
