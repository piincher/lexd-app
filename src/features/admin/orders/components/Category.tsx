import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

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
   const { colors } = useAppTheme();
   const styles = useMemo(() => StyleSheet.create({
      container: {
         flexDirection: "row",
         justifyContent: "space-between",
         marginHorizontal: 10,
         padding: 8,
         backgroundColor: colors.background.paper,
         borderRadius: 16,
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.08,
         shadowRadius: 8,
         elevation: 4,
         marginBottom: 16,
         borderWidth: 0.5,
         borderColor: colors.border,
      },
      tab: {
         flex: 1,
         marginHorizontal: 4,
         paddingVertical: 12,
         borderRadius: 12,
         alignItems: "center",
         justifyContent: "center",
         backgroundColor: "transparent",
         borderWidth: 0.5,
         borderColor: colors.border,
      },
      activeTab: {
         backgroundColor: colors.primary.main,
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.2,
         shadowRadius: 8,
         elevation: 6,
         borderWidth: 0,
      },
      pressedTab: {
         opacity: Platform.OS === "web" ? 0.9 : 0.8,
      },
      tabContent: {
         flexDirection: "row",
         alignItems: "center",
         gap: 8,
      },
      tabText: {
         fontFamily: Fonts.meduim,
         fontSize: 14,
         fontWeight: "500",
      },
      activeTabText: {
         fontFamily: Fonts.bold,
         fontWeight: "600",
      },
      icon: {
         marginRight: 4,
      },
   }), [colors]);

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
               <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                     styles.tab,
                     isActive && styles.activeTab,
                     pressed && styles.pressedTab,
                  ]}
                  onPress={() => {
                     setStatusChange(item.title);
                     onStatusChange(item.title);
                  }}
                  accessibilityLabel={`Select ${text} status`}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityHint="Switches to the selected status view"
               >
                  <View style={styles.tabContent}>
                     <MaterialIcons
                        name={icon}
                        size={20}
                        color={isActive ? colors.text.inverse : color}
                        style={styles.icon}
                     />
                     <Text
                        style={[
                           styles.tabText,
                           isActive && styles.activeTabText,
                           { color: isActive ? colors.text.inverse : color },
                        ]}
                     >
                        {text}
                     </Text>
                  </View>
               </Pressable>
            );
         })}
      </View>
   );
};
