import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import * as Haptics from 'expo-haptics';

interface MenuItem {
  title: string;
  subtitle: string;
  icon: string;
  screen: string;
  iconBg: string;
  iconColor: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: 'Compte',
    items: [
      {
        title: 'Historique des commandes',
        subtitle: 'Consultez vos commandes passees',
        icon: 'history',
        screen: 'PastOrders',
        iconBg: 'rgba(59,130,246,0.1)',
        iconColor: '#3B82F6',
      },
      {
        title: 'Notifications',
        subtitle: 'Gerez vos preferences',
        icon: 'bell-outline',
        screen: 'NotificationSettings',
        iconBg: 'rgba(245,158,11,0.1)',
        iconColor: '#F59E0B',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        title: 'FAQ',
        subtitle: 'Questions frequentes',
        icon: 'help-circle',
        screen: 'FAQ',
        iconBg: 'rgba(34,197,94,0.1)',
        iconColor: '#22C55E',
      },
      {
        title: 'Centre d\'assistance',
        subtitle: 'Ouvrir un ticket ou suivre une demande',
        icon: 'lifebuoy',
        screen: 'TicketList',
        iconBg: 'rgba(59,130,246,0.1)',
        iconColor: '#3B82F6',
      },
      {
        title: 'A propos de ChinaLink',
        subtitle: 'En savoir plus sur nous',
        icon: 'information-outline',
        screen: 'AboutUs',
        iconBg: 'rgba(139,92,246,0.1)',
        iconColor: '#8B5CF6',
      },
    ],
  },
  {
    title: 'Application',
    items: [
      {
        title: 'Introduction',
        subtitle: 'Revoir le guide de demarrage',
        icon: 'play-circle-outline',
        screen: 'OnBoarding',
        iconBg: 'rgba(236,72,153,0.1)',
        iconColor: '#EC4899',
      },
    ],
  },
];

interface Props {
  onNavigate: (screen: string) => void;
}

export const SettingsMenu: React.FC<Props> = ({ onNavigate }) => {
  const { colors, isDark } = useAppTheme();
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';

  return (
    <>
      {MENU_SECTIONS.map((section) => (
        <View key={section.title} style={styles.menuGroup}>
          <Text style={[styles.menuGroupTitle, { color: colors.text.secondary }]}>
            {section.title}
          </Text>
          <View style={[styles.menuCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            {section.items.map((item, index) => (
              <React.Fragment key={item.title}>
                {index > 0 && (
                  <View style={[styles.menuDivider, { backgroundColor: cardBorder }]} />
                )}
                <Pressable
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                    pressed && {
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    },
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onNavigate(item.screen);
                  }}
                >
                  <View style={[styles.menuIconCircle, { backgroundColor: item.iconBg }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={20} color={item.iconColor} />
                  </View>
                  <View style={styles.menuTextCol}>
                    <Text style={[styles.menuItemTitle, { color: colors.text.primary }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.text.secondary }]}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.disabled} />
                </Pressable>
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  menuGroup: {
    marginTop: 12,
  },
  menuGroupTitle: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextCol: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 1,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 70,
  },
});

export default SettingsMenu;
