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

// Screens
import { HomeScreen } from '@src/features/home';
import { GuestPreviewScreen } from '@src/features/guestExperience';
import { CustomerDashboardScreen } from '@src/features/customer/dashboard';
import { AdminDashBoard } from '@src/features/admin/dashboard';
import { OrdersScreen as Orders } from '@src/features/orders';
import { StatsScreen as Stats } from '@src/features/stats';
import { ProfileScreen as Profile } from '@src/features/profile';
import MyGoodsScreen from '@src/features/goods/screens/MyGoodsScreen';
import MyContainersScreen from '@src/features/customer/containers/screens/MyContainersScreen';
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
  const role = useAuth((state) => state.user.role);
  const token = useAuth((state) => state.token);
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const setTabBarVisible = useTabBarStore((state) => state.setVisible);
  const isTabBarVisible = useTabBarStore((state) => state.isVisible);

  const normalizedRole = role.trim().toLowerCase().replace(/[\s_-]/g, '');
  const adminRole = ['admin', 'superadmin'].includes(normalizedRole);
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
        tabBarLabel: 'Tableau de Bord',
        tabBarIcon: ({ color, size }) => <AntDesign name="layout" color={color} size={size} />,
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
      name: 'Orders',
      component: Orders,
      show: !adminRole && !!token,
      options: {
        tabBarLabel: 'Commandes',
        tabBarAccessibilityLabel: 'Commandes',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="clipboard-list" size={size} color={color} />,
      },
    },
    {
      name: 'MyGoods',
      component: MyGoodsScreen,
      show: !adminRole && !!token,
      options: {
        tabBarLabel: 'Mes Marchandises',
        tabBarAccessibilityLabel: 'Mes Marchandises',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="box" size={size} color={color} />,
      },
    },
    {
      name: 'MyContainers',
      component: MyContainersScreen,
      show: !adminRole && !!token,
      options: {
        tabBarLabel: 'Expéditions',
        tabBarAccessibilityLabel: 'Mes expéditions',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="route" size={size} color={color} />,
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
      name: 'Profile',
      component: Profile,
      show: true,
      options: {
        tabBarLabel: 'Profil',
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
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          display: showTabBar ? 'flex' : 'none',
          height: tabBarHeight,
          paddingBottom: bottomPadding,
          paddingTop: 4,
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
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
