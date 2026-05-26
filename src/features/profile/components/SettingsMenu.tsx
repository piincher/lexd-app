import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getMenuSections } from './SettingsMenuData';
import { SettingsMenuItem } from './SettingsMenuItem';
import { createStyles } from './SettingsMenu.styles';

interface Props {
  onNavigate: (screen: string) => void;
}

export const SettingsMenu: React.FC<Props> = ({ onNavigate }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const cardBg = colors.background.card;
  const cardBorder = colors.border;
  const menuSections = getMenuSections(colors);

  return (
    <>
      {menuSections.map((section) => (
        <View key={section.title} style={styles.menuGroup}>
          <Text style={[styles.menuGroupTitle, { color: colors.text.secondary }]}>
            {section.title}
          </Text>
          <View style={[styles.menuCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            {section.items.map((item, index) => (
              <SettingsMenuItem
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
                screen={item.screen}
                onNavigate={onNavigate}
                showDivider={index > 0}
              />
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

export default SettingsMenu;
