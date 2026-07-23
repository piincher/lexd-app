/**
 * HomeBottomTab - Bottom tab navigator
 * Role-based tabs: admin, customer, guest
 */

import React, { useEffect } from 'react';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { HomeTabParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers';
import { useAuth } from '@src/store/Auth';
import { useTabBarStore } from '@src/store/tabBarStore';
import { isAdminRole } from '@src/shared/lib/roles';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

// Screens
import { HomeScreen } from '@src/features/home';
import { GuestPreviewScreen } from '@src/features/guestExperience';
import { CustomerDashboardScreen } from '@src/features/customer/dashboard';
import { AdminDashBoard, AdminToolsScreen } from '@src/features/admin/dashboard';
import { StatsScreen as Stats } from '@src/features/stats';
import { ProfileScreen as Profile } from '@src/features/profile';
import { ShipmentsScreen } from '@src/features/shipments';
import { MyPaymentHistoryScreen } from '@src/features/payments';
import AdminGoodsList from '@src/features/admin/goods/screens/GoodsListScreen';
import AdminContainerListScreen from '@src/features/admin/containers/screens/ContainerListScreen';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

type TabBarIconProps = {
  color: string;
  size: number;
};

interface TabConfig {
  name: keyof HomeTabParamList;
  // React Navigation tab screens have heterogeneous route props in this config array.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  show: boolean;
  options: {
    tabBarLabel: string;
    tabBarAccessibilityLabel?: string;
    tabBarIcon: (props: TabBarIconProps) => React.ReactNode;
  };
}

export const HomeBottomTab: React.FC = () => {
  const role = useAuth((state) => state.user?.role);
  const token = useAuth((state) => state.token);
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const setTabBarVisible = useTabBarStore((state) => state.setVisible);
  const isTabBarVisible = useTabBarStore((state) => state.isVisible);

  const adminRole = isAdminRole(role);
  const showTabBar = adminRole || isTabBarVisible;
  const bottomPadding = Math.max(insets.bottom, 8);
  const tabBarHeight = 58 + bottomPadding;

  useEffect(() => {
    setTabBarVisible(true);
  }, [adminRole, token, setTabBarVisible]);

  const tabs: TabConfig[] = [
    {
      name: 'Home',
      component: HomeScreen,
      show: !adminRole && !token,
      options: {
        tabBarLabel: 'Accueil',
        tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} />,
      },
    },
    {
      name: 'GuestPreview',
      component: GuestPreviewScreen,
      show: !adminRole && !token,
      options: {
        tabBarLabel: 'Démo',
        tabBarAccessibilityLabel: 'Mode démo',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="route" size={size} color={color} />,
      },
    },
    {
      name: 'CustomerDashboard',
      component: CustomerDashboardScreen,
      show: !adminRole && !!token,
      options: {
        // "Accueil", not "Tableau de Bord": it is the first tab for a signed-in
        // customer exactly as Home is for a guest, and the old label was the
        // first to truncate on a narrow bar.
        tabBarLabel: 'Accueil',
        tabBarAccessibilityLabel: 'Accueil',
        tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} />,
      },
    },
    {
      name: 'AdminDashBoard',
      component: AdminDashBoard,
      show: adminRole,
      options: {
        tabBarLabel: 'Admin',
        tabBarIcon: ({ color, size }) => <AntDesign name="book" color={color} size={size} />,
      },
    },
    {
      // Replaces the Orders / MyGoods / MyContainers trio. Those were three
      // views of one shipment — the operational decomposition leaking into the
      // customer's navigation. Goods are now the contents of a shipment, and
      // an order is simply a shipment that has not been consolidated yet.
      // All three screens stay registered on the stack, so deep links and any
      // remaining direct navigation still resolve.
      name: 'Shipments',
      component: ShipmentsScreen,
      show: !adminRole && !!token,
      options: {
        tabBarLabel: 'Envois',
        tabBarAccessibilityLabel: 'Mes envois',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="route" size={size} color={color} />,
      },
    },
    {
      // Promoted out of the profile stack. What a customer owes gates the
      // release of their cargo, so it should not take three taps to reach.
      name: 'Payments',
      component: MyPaymentHistoryScreen,
      show: !adminRole && !!token,
      options: {
        tabBarLabel: 'Paiements',
        tabBarAccessibilityLabel: 'Mes paiements',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="wallet" size={size} color={color} />,
      },
    },
    {
      name: 'Stats',
      component: Stats,
      show: adminRole,
      options: {
        tabBarLabel: 'Stats',
        tabBarIcon: ({ color, size }) => <Entypo name="pie-chart" color={color} size={size} />,
      },
    },
    {
      name: 'AdminGoodsList',
      component: AdminGoodsList,
      show: adminRole,
      options: {
        tabBarLabel: 'Marchandises',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="box" size={size} color={color} />,
      },
    },
    {
      name: 'ContainerList',
      component: AdminContainerListScreen,
      show: adminRole,
      options: {
        tabBarLabel: 'Conteneurs',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="ship" size={size} color={color} />,
      },
    },
    {
      // Full admin directory — Récompenses, Commandes, Logistique, Clients,
      // every screen the operator can reach. Owns the MenuCategories surface
      // that used to live at the bottom of AdminDashBoard. Admin-only.
      name: 'AdminTools',
      component: AdminToolsScreen,
      show: adminRole,
      options: {
        tabBarLabel: 'Outils',
        tabBarAccessibilityLabel: 'Outils admin',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="th-large" size={size} color={color} />,
      },
    },
    {
      name: 'Profile',
      component: Profile,
      show: true,
      options: {
        // "Compte" rather than "Profil": this tab now holds points, support,
        // documents and settings, not just profile details.
        tabBarLabel: 'Compte',
        tabBarAccessibilityLabel: 'Mon compte',
        tabBarIcon: ({ color, size }) => <Entypo name="user" color={color} size={size} />,
      },
    },
  ];

  const visibleTabs = tabs.filter((t) => t.show);
  const initialRoute = adminRole ? 'AdminDashBoard' : token ? 'CustomerDashboard' : 'Home';

  return (
    <BottomTab.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.disabled,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          height: 54,
          paddingVertical: 3,
        },
        // Border-first, matching the rest of the app: the hairline rule
        // separates the bar, so the shadow stack is no longer needed.
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopColor: colors.border,
          borderTopWidth: HAIRLINE,
          display: showTabBar ? 'flex' : 'none',
          height: tabBarHeight,
          paddingBottom: bottomPadding,
          paddingTop: 4,
          elevation: 0,
        },
      }}
      screenListeners={{
        focus: () => setTabBarVisible(true),
        tabPress: () => {
          setTabBarVisible(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
    >
      {visibleTabs.map((tab) => (
        <BottomTab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </BottomTab.Navigator>
  );
};
