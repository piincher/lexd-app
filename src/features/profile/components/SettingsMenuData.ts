import type { ComponentProps } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];
type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

interface MenuItem {
  title: string;
  subtitle: string;
  icon: MaterialIconName;
  screen: string;
  iconBg: string;
  iconColor: string;
  highlight?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const hexToRgba = (hex: string, alpha: number) => {
  if (!hex.startsWith('#') || hex.length < 7) return hex;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const getMenuSections = (colors: AppColors): MenuSection[] => [
  {
    title: 'Compte',
    items: [
      {
        title: 'Historique des commandes',
        subtitle: 'Consultez vos commandes passées',
        icon: 'history',
        screen: 'PastOrders',
        iconBg: hexToRgba(colors.status.info, 0.1),
        iconColor: colors.status.info,
      },
      {
        title: 'Parrainage',
        subtitle: 'Partagez votre code et suivez vos points',
        icon: 'gift-outline',
        screen: 'Referral',
        iconBg: hexToRgba(colors.primary.main, 0.1),
        iconColor: colors.primary.main,
      },
      {
        title: 'Notifications',
        subtitle: 'Gérez vos préférences',
        icon: 'bell-outline',
        screen: 'NotificationSettings',
        iconBg: hexToRgba(colors.status.warning, 0.1),
        iconColor: colors.status.warning,
      },
      {
        title: 'Annonces',
        subtitle: 'Nouveautés, entrepôts et prix CBM',
        icon: 'bullhorn-outline',
        screen: 'AnnouncementInbox',
        iconBg: hexToRgba(colors.primary.main, 0.1),
        iconColor: colors.primary.main,
      },
      {
        title: "Marque d'expédition",
        subtitle: 'Téléchargez votre marque pour le fournisseur',
        icon: 'qrcode',
        screen: 'ShippingMark',
        iconBg: hexToRgba(colors.primary.main, 0.1),
        iconColor: colors.primary.main,
      },
      {
        title: "Adresses d'entrepôt",
        subtitle: 'Adresse de réception en Chine (air et mer)',
        icon: 'warehouse',
        screen: 'WarehouseAddress',
        iconBg: hexToRgba(colors.status.info, 0.1),
        iconColor: colors.status.info,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        title: 'FAQ',
        subtitle: 'Questions fréquentes',
        icon: 'help-circle',
        screen: 'FAQ',
        iconBg: hexToRgba(colors.status.success, 0.1),
        iconColor: colors.status.success,
      },
      {
        title: 'Centre d\'assistance',
        subtitle: 'Ouvrir ou suivre une demande',
        icon: 'lifebuoy',
        screen: 'TicketList',
        iconBg: hexToRgba(colors.status.info, 0.1),
        iconColor: colors.status.info,
      },
      {
        title: 'À propos de LEXD',
        subtitle: 'En savoir plus sur notre service',
        icon: 'information-outline',
        screen: 'AboutUs',
        iconBg: hexToRgba(colors.accent.gold, 0.1),
        iconColor: colors.accent.gold,
      },
    ],
  },
  {
    title: 'Application',
    items: [
      {
        title: 'Introduction',
        subtitle: 'Revoir le guide de démarrage',
        icon: 'play-circle-outline',
        screen: 'OnBoarding',
        iconBg: hexToRgba(colors.status.error, 0.1),
        iconColor: colors.status.error,
      },
    ],
  },
];
