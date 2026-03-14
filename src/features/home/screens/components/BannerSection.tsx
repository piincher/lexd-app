import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Banner from "../../components/Banner";

export const BannerSection: React.FC = () => {
   return (
      <View style={styles.container}>
         <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Banner />
         </Animated.View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginBottom: 16,
   },
});
