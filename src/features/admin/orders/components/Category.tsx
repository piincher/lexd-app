import React from 'react';
import { View } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./Category.styles";
import { StatusTab } from "./StatusTab";

interface CategoryProps {
   statusChange: string;
   setStatusChange: (status: string) => void;
   onStatusChange: (status: string) => void;
   status: { id: string; title: string }[];
}

export const Category = ({
   statusChange,
   setStatusChange,
   onStatusChange,
   status,
}: CategoryProps) => {
   const { colors, isDark } = useAppTheme();
   const styles = createStyles(colors, isDark);

   const getStatusText = (title: string) => {
      switch (title) {
         case "Active":
            return "En cours";
         case "In Transit":
            return "En transit";
         case "Delivered":
            return "Livré";
         default:
            return title;
      }
   };

   const getStatusIcon = (title: string) => {
      switch (title) {
         case "Active":
            return "location-on";
         case "In Transit":
            return "directions";
         case "Delivered":
            return "check-circle";
         default:
            return "info";
      }
   };

   const getStatusColor = (title: string) => {
      switch (title) {
         case "Active":
            return colors.primary.main;
         case "In Transit":
            return colors.accent.gold;
         case "Delivered":
            return colors.status.success;
         default:
            return colors.text.secondary;
      }
   };

   return (
      <View style={styles.container}>
         {status.map((item) => {
            const isActive = item.title === statusChange;
            const icon = getStatusIcon(item.title);
            const color = getStatusColor(item.title);
            const text = getStatusText(item.title);

            return (
               <StatusTab
                  key={item.id}
                  title={item.title}
                  isActive={isActive}
                  icon={icon}
                  color={color}
                  text={text}
                  onPress={() => {
                     setStatusChange(item.title);
                     onStatusChange(item.title);
                  }}
               />
            );
         })}
      </View>
   );
};
