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

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMenuSections = (colors: any): MenuSection[] => [
  {
    title: 'Compte',
    items: [
      {
        title: 'Historique des commandes',
        subtitle: 'Consultez vos commandes passees',
        icon: 'history',
        screen: 'PastOrders',
        iconBg: hexToRgba(colors.status.info, 0.1),
        iconColor: colors.status.info,
      },
      {
        title: 'Parrainage',
        subtitle: 'Partager votre code et suivre vos points',
        icon: 'gift-outline',
        screen: 'Referral',
        iconBg: hexToRgba(colors.primary.main, 0.1),
        iconColor: colors.primary.main,
      },
      {
        title: 'Notifications',
        subtitle: 'Gerez vos preferences',
        icon: 'bell-outline',
        screen: 'NotificationSettings',
        iconBg: hexToRgba(colors.status.warning, 0.1),
        iconColor: colors.status.warning,
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
        iconBg: hexToRgba(colors.status.success, 0.1),
        iconColor: colors.status.success,
      },
      {
        title: 'Centre d\'assistance',
        subtitle: 'Ouvrir un ticket ou suivre une demande',
        icon: 'lifebuoy',
        screen: 'TicketList',
        iconBg: hexToRgba(colors.status.info, 0.1),
        iconColor: colors.status.info,
      },
      {
        title: 'A propos de ChinaLink',
        subtitle: 'En savoir plus sur nous',
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
        subtitle: 'Revoir le guide de demarrage',
        icon: 'play-circle-outline',
        screen: 'OnBoarding',
        iconBg: hexToRgba(colors.status.error, 0.1),
        iconColor: colors.status.error,
      },
    ],
  },
];
