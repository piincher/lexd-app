import {
   FlatList,
   StyleSheet,
   Text,
   View,
   Animated,
   Dimensions,
   Image,
   TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { IMAGES } from "@src/constants/Images";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { RootStackScreenProps } from "@src/navigations/type";

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
   {
      key: "3571572",
      title: "Envoyez des colis à vos proches par voie aérienne",
      description:
         "Nous vous aidons à envoyer des colis à vos proches en Afrique de l'ouest(Mali)!",
      image: IMAGES.onboarding2,
   },
   {
      key: "3571747",
      title: "Suivez vos colis en temps réel",
      description:
         "Nous vous permettons de suivre vos colis en temps réel et de savoir où ils se trouvent!",
      image: IMAGES.onboarding1,
   },
   {
      key: "3571680",
      title: "Soyez informé de l'état de vos colis en temps réel",
      description:
         "Nous vous informons de l'état de vos colis en temps réel et vous notifions de chaque étape!",
      image: IMAGES.onboarding3,
   },
   {
      key: "3571603",
      title: "Recuperez vos colis en toute sécurité",
      description:
         "Nous vous permettons de récupérer vos colis en toute sécurité et en toute confiance!",
      image: IMAGES.onboarding4,
   },
];

const Indicator = ({ scrollX }) => {
   return (
      <View
         style={{
            position: "absolute",
            bottom: 10,
            flexDirection: "row",
            margin: 10,
         }}
      >
         {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
               inputRange,
               outputRange: [0.8, 1.4, 0.8],
               extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
               inputRange,
               outputRange: [0.4, 1, 0.8],
               extrapolate: "clamp",
            });
            return (
               <Animated.View
                  key={`indicator ${_.key}`}
                  style={{
                     height: 10,
                     width: 10,
                     borderRadius: 5,
                     backgroundColor: "#fff",
                     opacity,
                     margin: 10,
                     transform: [
                        {
                           scale,
                        },
                     ],
                  }}
               />
            );
         })}
      </View>
   );
};

const Backdrop = ({ scrollX }) => {
   const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_, i) => i * width),
      outputRange: bgs.map((bg) => bg),
   });
   return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />;
};
const { width, height } = Dimensions.get("screen");

const Square = ({ scrollX }) => {
   const YOLO = Animated.modulo(
      Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
      1
   );
   const rotate = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["-35deg", "0deg", "-35deg"],
   });

   const translateX = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -height, 0],
   });
   return (
      <Animated.View
         style={{
            width: height,
            height: height,
            backgroundColor: "#fff",
            borderRadius: 86,
            position: "absolute",
            top: -height * 0.6,
            left: -height * 0.3,
            transform: [
               {
                  rotate,
               },
               {
                  translateX,
               },
            ],
         }}
      />
   );
};
const OnBoarding = ({ navigation }: RootStackScreenProps<"OnBoarding">) => {
   const appLaunch = useAppLaunchStore((state) => state.setIsAppLaunchFirst);
   const scrollX = useRef(new Animated.Value(0)).current;
   return (
      <View style={styles.container}>
         <Backdrop scrollX={scrollX} />
         <Square scrollX={scrollX} />
         <Animated.FlatList
            horizontal
            data={DATA}
            scrollEventThrottle={32}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
               useNativeDriver: false,
            })}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
               return (
                  <View style={{ width, alignItems: "center", padding: 20 }}>
                     <View
                        style={{
                           flex: 0.7,
                           justifyContent: "center",
                        }}
                     >
                        <Image
                           source={item.image}
                           style={{
                              width: width / 2,
                              height: width / 2,
                              resizeMode: "contain",
                           }}
                        />
                     </View>
                     <View style={{ flex: 0.3 }}>
                        <Text
                           style={{
                              color: COLORS.white,
                              fontSize: 28,
                              marginBottom: 10,
                              fontFamily: Fonts.black,
                           }}
                        >
                           {item.title}
                        </Text>
                        <Text style={{ color: COLORS.white, fontFamily: Fonts.boldItalic }}>
                           {item.description}
                        </Text>
                     </View>
                  </View>
               );
            }}
         />

         <Indicator scrollX={scrollX} />
         <View
            style={{
               flexDirection: "row",
               gap: 30,
               position: "absolute",
               bottom: 120,
            }}
         >
            <TouchableOpacity
               style={{
                  height: 40,
                  width: 120,
                  backgroundColor: COLORS.white,
                  borderRadius: 5,
                  justifyContent: "center",
               }}
               onPress={() => {
                  appLaunch(false);
                  navigation.replace("CheckRoute");
               }}
            >
               <Text style={{ textAlign: "center" }}>Commencer </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default OnBoarding;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
