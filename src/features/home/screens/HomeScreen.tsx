import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Header } from "../components/Header";
import Banner from "../components/Banner";
import { ShippingSolutionsSection } from "../components/ShippingSolutionsSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { WorkflowSection } from "../components/WorkflowSection";
import { PartnersSection } from "../components/PartnersSection";
import { BackToTopButton } from "../components/BackToTopButton";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useHomeScreen } from "../hooks/useHomeScreen";
import createStyles from "./HomeScreen.styles";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const HomeScreen: React.FC = () => {
  const {
    scrollRef,
    scrollHandler,
    backButtonStyle,
    whatsappStyle,
    handleBackToTop,
    handlePressBlockOne,
    handlePressBlockTwo,
    styles,
    colors,
  } = useHomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AnimatedScrollView
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Banner />
        </Animated.View>
        <ShippingSolutionsSection
          onPressAir={handlePressBlockOne}
          onPressSea={handlePressBlockTwo}
          colors={colors}
        />
        <FeaturesSection colors={colors} />
        <WorkflowSection colors={colors} />
        <PartnersSection colors={colors} />
      </AnimatedScrollView>
      <BackToTopButton animatedStyle={backButtonStyle} onPress={handleBackToTop} />
      <WhatsAppButton animatedStyle={whatsappStyle} />
    </SafeAreaView>
  );
};

export default HomeScreen;
