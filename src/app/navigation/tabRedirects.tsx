import React, { useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "@src/navigations/navigationRef";
import type { HomeTabParamList } from "@src/navigations/type";
import { useTabBarStore } from "@src/store/tabBarStore";

const createHomeTabRedirect = (screen: keyof HomeTabParamList) => {
   const HomeTabRedirect = () => {
      const setTabBarVisible = useTabBarStore((state) => state.setVisible);

      useEffect(() => {
         setTabBarVisible(true);
         navigationRef.dispatch(
            CommonActions.navigate({
               name: "HomeTab",
               params: { screen },
            }),
         );
      }, [setTabBarVisible]);

      return null;
   };
   return HomeTabRedirect;
};

export const AdminDashboardTabRedirect = createHomeTabRedirect("AdminDashBoard");
export const AdminGoodsListTabRedirect = createHomeTabRedirect("AdminGoodsList");
export const ContainerListTabRedirect = createHomeTabRedirect("ContainerList");
export const CustomerDashboardTabRedirect = createHomeTabRedirect("CustomerDashboard");

/**
 * The MyGoods / MyContainers / Orders stack routes are kept as redirects so
 * anything still navigating to them — old deep links, push payloads, saved
 * state — resolves instead of dead-ending. All three now land on the unified
 * Shipments tab that replaced them.
 */
export const ShipmentsTabRedirect = createHomeTabRedirect("Shipments");
export const MyGoodsTabRedirect = ShipmentsTabRedirect;
export const MyContainersTabRedirect = ShipmentsTabRedirect;
export const OrdersTabRedirect = ShipmentsTabRedirect;
