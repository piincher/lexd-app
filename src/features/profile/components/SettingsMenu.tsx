import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/app/store/Auth';
import { useShippingMarkPromptStore } from '@src/app/store/shippingMarkPromptStore';
import { getMenuSections } from './SettingsMenuData';
import { SettingsMenuItem } from './SettingsMenuItem';
import { createStyles } from './SettingsMenu.styles';

const SHIPPING_MARK_SCREEN = 'ShippingMark';

interface Props {
  onNavigate: (screen: string) => void;
}

export const SettingsMenu: React.FC<Props> = ({ onNavigate }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const cardBg = colors.background.card;
  const cardBorder = colors.border;
  const userId = useAuth((state) => state.user?._id);
  const userPromptState = useShippingMarkPromptStore(
    (state) => (userId ? state.users[userId] : undefined),
  );
  const menuSections = getMenuSections(colors);

  const isShippingMarkHighlighted = !userPromptState?.dismissedAt && !userPromptState?.downloadedAt;

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
                highlight={item.screen === SHIPPING_MARK_SCREEN && isShippingMarkHighlighted}
              />
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

export default SettingsMenu;
