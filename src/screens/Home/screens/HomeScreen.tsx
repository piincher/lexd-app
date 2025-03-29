//v1
// import { COLORS } from "@src/constants/Colors";
// import { Fonts } from "@src/constants/Fonts";
// import { IMAGES } from "@src/constants/Images";
// import { HomeTabScreenProps } from "@src/navigations/type";
// import React from "react";
// import {
//    Image,
//    ScrollView,
//    StyleSheet,
//    Text,
//    View,
//    useWindowDimensions,
//    Pressable,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Banner from "../components/Banner";
// import BlockComponent from "../components/Block";
// import { useShippingMode } from "@src/store/shippingMode";
// import Animated, {
//    Extrapolate,
//    FadeIn,
//    FadeInDown,
//    FadeInLeft,
//    FadeInRight,
//    FadeInUp,
//    interpolate,
//    useAnimatedRef,
//    useAnimatedScrollHandler,
//    useAnimatedStyle,
//    useSharedValue,
//    withSpring,
//    withTiming,
// } from "react-native-reanimated";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import { LinearGradient } from "expo-linear-gradient";
// import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

// const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
// const PARTNER_LOGOS = [
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
// ];

// const WhyUsCard = ({
//    icon,
//    title,
//    description,
//    index,
// }: {
//    icon: string;
//    title: string;
//    description: string;
//    index: number;
// }) => (
//    <View style={[styles.whyUsCard, { backgroundColor: index % 2 === 0 ? "#4A90E2" : "#1ED7B5" }]}>
//       <FontAwesome6 name={icon} size={32} color="white" />
//       <Text style={styles.whyUsTitle}>{title}</Text>
//       <Text style={styles.whyUsDescription}>{description}</Text>
//    </View>
// );

// const HomeScreen = ({ navigation }: HomeTabScreenProps<"Home">) => {
//    const { width } = useWindowDimensions();
//    const scrollY = useSharedValue(0);
//    const scrollRef = useAnimatedRef<ScrollView>();
//    const headerHeight = useSharedValue(100);
//    const isScrolled = useSharedValue(false);

//    const setType = useShippingMode((state) => state.setType);

//    const handlePressBlockOne = () => {
//       console.log("handlePressBlockOne");
//       const air = "air";
//       setType(air);
//       navigation.navigate("UserActiveOrders", { type: air });
//    };

//    const handlePressBlockTwo = () => {
//       const sea = "sea";
//       setType(sea);
//       navigation.navigate("UserActiveOrders", { type: sea });
//    };

//    const scrollHandler = useAnimatedScrollHandler({
//       onScroll: (event) => {
//          scrollY.value = event.contentOffset.y;
//          headerHeight.value = interpolate(
//             event.contentOffset.y,
//             [0, 100],
//             [100, 70],
//             Extrapolate.CLAMP
//          );
//          isScrolled.value = event.contentOffset.y > 50;
//       },
//    });

//    const headerStyle = useAnimatedStyle(() => ({
//       height: headerHeight.value,
//       paddingVertical: interpolate(headerHeight.value, [70, 100], [8, 16]),
//    }));

//    const backButtonStyle = useAnimatedStyle(() => ({
//       opacity: withTiming(isScrolled.value ? 1 : 0),
//       transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
//    }));

//    return (
//       <SafeAreaView style={styles.container}>
//          <Animated.View style={[styles.headerContainer, headerStyle]}>
//             <Image source={IMAGES.flat_logo} style={styles.logo} />
//          </Animated.View>

//          <AnimatedScrollView
//             ref={scrollRef}
//             onScroll={scrollHandler}
//             scrollEventThrottle={16}
//             contentContainerStyle={styles.scrollContent}
//          >
//             {/* Banner Section */}
//             <Animated.View entering={FadeInDown.delay(200).springify()}>
//                <Banner />
//             </Animated.View>

//             {/* Main Actions */}
//             <Animated.Text entering={FadeInDown.delay(300).springify()} style={styles.voirPlusText}>
//                Voir Plus
//             </Animated.Text>

//             <View style={styles.blocksContainer}>
//                <Animated.View entering={FadeInRight.delay(400).springify()}>
//                   <BlockComponent
//                      title="Mes Commandes Aeriennes"
//                      icon="plane-departure"
//                      backgroundColor={COLORS.blue}
//                      iconLib="FontAwesome6"
//                      onPress={handlePressBlockOne}
//                   />
//                </Animated.View>
//                <Animated.View entering={FadeInLeft.delay(400).springify()}>
//                   <BlockComponent
//                      title="Mes Commandes Maritimes"
//                      icon="sailboat"
//                      backgroundColor="#1ED7B5"
//                      iconLib="FontAwesome6"
//                      onPress={handlePressBlockTwo}
//                   />
//                </Animated.View>
//             </View>

//             {/* Redesigned Shipping Solutions */}
//             <View style={styles.section}>
//                <Text style={styles.sectionTitle}>Our Shipping Solutions</Text>
//                <View style={styles.shippingCardsContainer}>
//                   <View style={styles.shippingCard}>
//                      <View style={styles.shippingIconContainer}>
//                         <FontAwesome6 name="plane" size={32} color="#4A90E2" />
//                      </View>
//                      <View style={styles.shippingTextContainer}>
//                         <Text style={styles.shippingCardTitle}>Air Freight</Text>
//                         <Text style={styles.shippingCardText}>
//                            Fast 2-3 week delivery with real-time tracking
//                         </Text>
//                      </View>
//                   </View>

//                   <View style={styles.shippingCard}>
//                      <View style={styles.shippingIconContainer}>
//                         <FontAwesome6 name="ship" size={32} color="#1ED7B5" />
//                      </View>
//                      <View style={styles.shippingTextContainer}>
//                         <Text style={styles.shippingCardTitle}>Sea Freight</Text>
//                         <Text style={styles.shippingCardText}>
//                            Cost-effective bulk shipping (45-60 days)
//                         </Text>
//                      </View>
//                   </View>
//                </View>
//             </View>

//             {/* How Does It Work Section */}
//             <View style={styles.section}>
//                <Text style={styles.sectionTitle}>How Does It Work?</Text>
//                <View style={styles.workflowContainer}>
//                   {[
//                      {
//                         icon: "box",
//                         title: "1. Place Order",
//                         description: "Shop from any Chinese platform and use our warehouse address",
//                      },
//                      {
//                         icon: "warehouse",
//                         title: "2. Consolidation",
//                         description: "We store & combine your packages for optimal shipping",
//                      },
//                      {
//                         icon: "plane-departure",
//                         title: "3. Choose Shipping",
//                         description: "Select air or sea freight based on your needs",
//                      },
//                      {
//                         icon: "box-open",
//                         title: "4. Receive Goods",
//                         description: "Fast customs clearance and final delivery",
//                      },
//                   ].map((step, index) => (
//                      <View key={index} style={styles.workflowStep}>
//                         <View style={styles.workflowIcon}>
//                            <FontAwesome6 name={step.icon} size={24} color="white" />
//                         </View>
//                         <View style={styles.workflowText}>
//                            <Text style={styles.workflowStepTitle}>{step.title}</Text>
//                            <Text style={styles.workflowStepDescription}>{step.description}</Text>
//                         </View>
//                      </View>
//                   ))}
//                </View>
//             </View>

//             {/* Why Us Section */}
//             <View style={styles.section}>
//                <Text style={styles.sectionTitle}>Why Choose Us?</Text>
//                <ScrollView
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.whyUsContainer}
//                >
//                   {[
//                      {
//                         icon: "globe",
//                         title: "Global Coverage",
//                         description: "150+ countries served",
//                      },
//                      {
//                         icon: "clock",
//                         title: "24/7 Support",
//                         description: "Dedicated customer service",
//                      },
//                      {
//                         icon: "shield-alt",
//                         title: "Full Insurance",
//                         description: "Protected shipments",
//                      },
//                      {
//                         icon: "dollar-sign",
//                         title: "Best Prices",
//                         description: "Competitive rates",
//                      },
//                   ].map((item, index) => (
//                      <WhyUsCard key={index} {...item} index={index} />
//                   ))}
//                </ScrollView>
//             </View>

//             {/* Partners Section */}
//             <View style={styles.section}>
//                <Text style={styles.sectionTitle}>Trusted Partners</Text>
//                <ScrollView
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.partnersScroll}
//                >
//                   {PARTNER_LOGOS.map((logo, index) => (
//                      <Image key={index} source={{ uri: logo }} style={styles.partnerLogo} />
//                   ))}
//                </ScrollView>
//             </View>
//          </AnimatedScrollView>

//          {/* Back to Top Button */}
//          <Animated.View style={[styles.backToTop, backButtonStyle]}>
//             <Pressable
//                onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
//                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
//             >
//                <LinearGradient colors={["#4A90E2", "#1ED7B5"]} style={styles.backToTopButton}>
//                   <AntDesign name="arrowup" size={24} color="white" />
//                </LinearGradient>
//             </Pressable>
//          </Animated.View>
//       </SafeAreaView>
//    );
// };

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: COLORS.white,
//    },
//    headerContainer: {
//       borderColor: COLORS.blue,
//       justifyContent: "center",
//       paddingHorizontal: 20,
//       backgroundColor: "white",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 8,
//       elevation: 5,
//    },
//    logo: {
//       width: "100%",
//       height: 60,
//       resizeMode: "contain",
//    },
//    scrollContent: {
//       paddingBottom: 100,
//    },
//    voirPlusText: {
//       textAlign: "center",
//       fontFamily: Fonts.black,
//       fontSize: 26,
//       margin: 18,
//       textTransform: "uppercase",
//       color: COLORS.blue,
//    },
//    blocksContainer: {
//       flexDirection: "row",
//       justifyContent: "center",
//       marginVertical: 16,
//       gap: 16,
//       paddingHorizontal: 16,
//    },
//    section: {
//       marginVertical: 24,
//       paddingHorizontal: 16,
//    },
//    sectionTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 26,
//       color: "#2C3E50",
//       marginBottom: 24,
//       textAlign: "center",
//    },
//    shippingCardsContainer: {
//       gap: 16,
//    },
//    shippingCard: {
//       backgroundColor: "white",
//       borderRadius: 12,
//       padding: 16,
//       flexDirection: "row",
//       alignItems: "center",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 8,
//       elevation: 3,
//    },
//    shippingIconContainer: {
//       backgroundColor: "#F5F7FA",
//       borderRadius: 8,
//       padding: 12,
//       marginRight: 16,
//    },
//    shippingTextContainer: {
//       flex: 1,
//    },
//    shippingCardTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 18,
//       color: "#2C3E50",
//       marginBottom: 4,
//    },
//    shippingCardText: {
//       fontFamily: Fonts.meduim,
//       fontSize: 14,
//       color: "#7F8C9A",
//    },
//    workflowContainer: {
//       gap: 16,
//    },
//    workflowStep: {
//       backgroundColor: "white",
//       borderRadius: 12,
//       padding: 16,
//       flexDirection: "row",
//       alignItems: "center",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 8,
//       elevation: 3,
//    },
//    workflowIcon: {
//       backgroundColor: "#4A90E2",
//       borderRadius: 8,
//       padding: 12,
//       marginRight: 16,
//    },
//    workflowText: {
//       flex: 1,
//    },
//    workflowStepTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 16,
//       color: "#2C3E50",
//       marginBottom: 4,
//    },
//    workflowStepDescription: {
//       fontFamily: Fonts.meduim,
//       fontSize: 14,
//       color: "#7F8C9A",
//       lineHeight: 20,
//    },
//    whyUsContainer: {
//       paddingHorizontal: 16,
//    },
//    whyUsCard: {
//       width: 240,
//       padding: 20,
//       borderRadius: 12,
//       marginRight: 16,
//    },
//    whyUsTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 18,
//       color: "white",
//       marginVertical: 8,
//    },
//    whyUsDescription: {
//       fontFamily: Fonts.meduim,
//       fontSize: 14,
//       color: "rgba(255,255,255,0.9)",
//    },
//    partnersScroll: {
//       paddingHorizontal: 16,
//    },
//    partnerLogo: {
//       width: 160,
//       height: 80,
//       resizeMode: "contain",
//       marginRight: 32,
//    },
//    backToTop: {
//       position: "absolute",
//       bottom: 30,
//       right: 20,
//       zIndex: 100,
//    },
//    backToTopButton: {
//       width: 50,
//       height: 50,
//       borderRadius: 25,
//       justifyContent: "center",
//       alignItems: "center",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.3,
//       shadowRadius: 6,
//       elevation: 8,
//    },
// });

// export default HomeScreen;
// v2
// import { COLORS } from "@src/constants/Colors";
// import { Fonts } from "@src/constants/Fonts";
// import { IMAGES } from "@src/constants/Images";
// import { HomeTabScreenProps } from "@src/navigations/type";
// import React from "react";
// import {
//    Image,
//    ScrollView,
//    StyleSheet,
//    Text,
//    View,
//    useWindowDimensions,
//    Pressable,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Banner from "../components/Banner";
// import BlockComponent from "../components/Block";
// import { useShippingMode } from "@src/store/shippingMode";
// import Animated, {
//    Extrapolate,
//    FadeIn,
//    FadeInDown,
//    FadeInLeft,
//    FadeInRight,
//    FadeInUp,
//    SlideInDown,
//    SlideInLeft,
//    SlideInRight,
//    ZoomIn,
//    interpolate,
//    useAnimatedRef,
//    useAnimatedScrollHandler,
//    useAnimatedStyle,
//    useSharedValue,
//    withSpring,
//    withTiming,
// } from "react-native-reanimated";
// import { LinearGradient } from "expo-linear-gradient";
// import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

// const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
// const PARTNER_LOGOS = [
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
//    "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
// ];

// const BentoGridItem = ({
//    children,
//    entering,
//    style,
// }: {
//    children: React.ReactNode;
//    entering?: any;
//    style?: any;
// }) => (
//    <Animated.View entering={entering} style={[styles.bentoItem, style]}>
//       {children}
//    </Animated.View>
// );

// const HomeScreen = ({ navigation }: HomeTabScreenProps<"Home">) => {
//    const { width } = useWindowDimensions();
//    const scrollY = useSharedValue(0);
//    const scrollRef = useAnimatedRef<ScrollView>();

//    const setType = useShippingMode((state) => state.setType);

//    const handlePressBlockOne = () => {
//       setType("air");
//       navigation.navigate("UserActiveOrders", { type: "air" });
//    };

//    const handlePressBlockTwo = () => {
//       setType("sea");
//       navigation.navigate("UserActiveOrders", { type: "sea" });
//    };

//    const scrollHandler = useAnimatedScrollHandler({
//       onScroll: (event) => {
//          scrollY.value = event.contentOffset.y;
//       },
//    });

//    const WorkflowStep = ({
//       icon,
//       title,
//       description,
//       index,
//    }: {
//       icon: string;
//       title: string;
//       description: string;
//       index: number;
//    }) => {
//       const animationStyle = useAnimatedStyle(() => ({
//          opacity: interpolate(
//             scrollY.value,
//             [index * 200, index * 200 + 300],
//             [0, 1],
//             Extrapolate.CLAMP
//          ),
//          transform: [
//             {
//                translateY: interpolate(
//                   scrollY.value,
//                   [index * 200, index * 200 + 300],
//                   [50, 0],
//                   Extrapolate.CLAMP
//                ),
//             },
//          ],
//       }));

//       return (
//          <Animated.View style={[styles.workflowStep, animationStyle]}>
//             <View style={styles.stepIndicator}>
//                <Text style={styles.stepNumber}>0{index + 1}</Text>
//                <FontAwesome6 name={icon} size={24} color="white" />
//             </View>
//             <View style={styles.stepContent}>
//                <Text style={styles.workflowTitle}>{title}</Text>
//                <Text style={styles.workflowDescription}>{description}</Text>
//             </View>
//          </Animated.View>
//       );
//    };

//    return (
//       <SafeAreaView style={styles.container}>
//          <AnimatedScrollView
//             ref={scrollRef}
//             onScroll={scrollHandler}
//             scrollEventThrottle={16}
//             contentContainerStyle={styles.scrollContent}
//          >
//             {/* Hero Section */}
//             <BentoGridItem entering={FadeIn.duration(800)} style={styles.heroBento}>
//                <Banner />
//             </BentoGridItem>

//             {/* Shipping Methods Bento Grid */}
//             <View style={styles.bentoRow}>
//                <BentoGridItem
//                   entering={SlideInRight.springify().delay(200)}
//                   style={styles.shippingMethodCard}
//                >
//                   <Pressable onPress={handlePressBlockOne}>
//                      <LinearGradient
//                         colors={["#4A90E2", "#1ED7B5"]}
//                         style={styles.shippingCardInner}
//                      >
//                         <FontAwesome6 name="plane" size={48} color="white" />
//                         <Text style={styles.shippingCardTitle}>Air Shipping</Text>
//                         <Text style={styles.shippingCardText}>
//                            2-3 Weeks Delivery • Real-time Tracking • Premium Service
//                         </Text>
//                      </LinearGradient>
//                   </Pressable>
//                </BentoGridItem>

//                <BentoGridItem
//                   entering={SlideInLeft.springify().delay(200)}
//                   style={styles.shippingMethodCard}
//                >
//                   <Pressable onPress={handlePressBlockTwo}>
//                      <LinearGradient
//                         colors={["#1ED7B5", "#4A90E2"]}
//                         style={styles.shippingCardInner}
//                      >
//                         <FontAwesome6 name="ship" size={48} color="white" />
//                         <Text style={styles.shippingCardTitle}>Sea Shipping</Text>
//                         <Text style={styles.shippingCardText}>
//                            6-8 Weeks Delivery • Cost Effective • Best for Bulk
//                         </Text>
//                      </LinearGradient>
//                   </Pressable>
//                </BentoGridItem>
//             </View>

//             {/* How It Works Section */}
//             <BentoGridItem entering={ZoomIn.duration(800)} style={styles.section}>
//                <Text style={styles.sectionTitle}>How It Works?</Text>

//                <View style={styles.workflowContainer}>
//                   <WorkflowStep
//                      icon="headset"
//                      title="Contact & Choose Method"
//                      description="Get in touch with our team and select your preferred shipping method"
//                      index={0}
//                   />

//                   <WorkflowStep
//                      icon="map-location-dot"
//                      title="Receive Warehouse Address"
//                      description="We provide our Chinese warehouse address for package consolidation"
//                      index={1}
//                   />

//                   <WorkflowStep
//                      icon="box-archive"
//                      title="Package Arrival"
//                      description="We notify you when all items arrive at our facility"
//                      index={2}
//                   />

//                   <WorkflowStep
//                      icon="earth-africa"
//                      title="Ship to Mali"
//                      description="We handle customs clearance and transport to Mali"
//                      index={3}
//                   />

//                   <WorkflowStep
//                      icon="hand-holding-hand"
//                      title="Collect Package"
//                      description="Pick up your shipment from our Mali distribution center"
//                      index={4}
//                   />
//                </View>
//             </BentoGridItem>

//             {/* Why Choose Us Bento Grid */}
//             <View style={styles.bentoRow}>
//                <BentoGridItem entering={FadeInUp.delay(200)} style={styles.whyUsCard}>
//                   <FontAwesome6 name="clock-rotate-left" size={32} color="#4A90E2" />
//                   <Text style={styles.whyUsTitle}>10+ Years Experience</Text>
//                   <Text style={styles.whyUsText}>Trusted logistics expertise since 2013</Text>
//                </BentoGridItem>

//                <BentoGridItem entering={FadeInUp.delay(400)} style={styles.whyUsCard}>
//                   <FontAwesome6 name="shield-halved" size={32} color="#1ED7B5" />
//                   <Text style={styles.whyUsTitle}>Fully Insured</Text>
//                   <Text style={styles.whyUsText}>100% cargo protection guarantee</Text>
//                </BentoGridItem>
//             </View>

//             {/* Partners Section */}
//             <BentoGridItem entering={FadeIn.delay(200)} style={styles.section}>
//                <Text style={styles.sectionTitle}>Trusted Partners</Text>
//                <ScrollView
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.partnersScroll}
//                >
//                   {PARTNER_LOGOS.map((logo, index) => (
//                      <Animated.Image
//                         key={index}
//                         source={{ uri: logo }}
//                         style={styles.partnerLogo}
//                         entering={FadeInRight.delay(index * 200).springify()}
//                      />
//                   ))}
//                </ScrollView>
//             </BentoGridItem>
//          </AnimatedScrollView>
//       </SafeAreaView>
//    );
// };

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: COLORS.white,
//    },
//    scrollContent: {
//       paddingBottom: 100,
//    },
//    bentoRow: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       justifyContent: "space-between",
//       paddingHorizontal: 16,
//       gap: 16,
//       marginVertical: 16,
//    },
//    bentoItem: {
//       borderRadius: 24,
//       overflow: "hidden",
//       backgroundColor: "white",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.1,
//       shadowRadius: 12,
//       elevation: 5,
//    },
//    heroBento: {
//       margin: 16,
//       height: 400,
//    },
//    shippingMethodCard: {
//       width: "48%",
//       height: 300,
//    },
//    shippingCardInner: {
//       flex: 1,
//       padding: 24,
//       justifyContent: "center",
//       alignItems: "center",
//    },
//    shippingCardTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 22,
//       color: "white",
//       marginVertical: 12,
//       textAlign: "center",
//    },
//    shippingCardText: {
//       fontFamily: Fonts.medium,
//       fontSize: 14,
//       color: "rgba(255,255,255,0.9)",
//       textAlign: "center",
//       lineHeight: 20,
//    },
//    section: {
//       margin: 16,
//       padding: 24,
//    },
//    sectionTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 32,
//       color: "#2C3E50",
//       marginBottom: 32,
//       textAlign: "center",
//    },
//    workflowContainer: {
//       gap: 24,
//    },
//    workflowStep: {
//       flexDirection: "row",
//       alignItems: "center",
//       backgroundColor: "white",
//       borderRadius: 20,
//       padding: 20,
//       gap: 16,
//    },
//    stepIndicator: {
//       backgroundColor: "#4A90E2",
//       borderRadius: 16,
//       width: 60,
//       height: 60,
//       justifyContent: "center",
//       alignItems: "center",
//    },
//    stepNumber: {
//       position: "absolute",
//       top: -8,
//       right: -8,
//       backgroundColor: "#1ED7B5",
//       borderRadius: 12,
//       padding: 4,
//       fontSize: 12,
//       fontFamily: Fonts.bold,
//       color: "white",
//       minWidth: 24,
//       textAlign: "center",
//    },
//    stepContent: {
//       flex: 1,
//    },
//    workflowTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 18,
//       color: "#2C3E50",
//       marginBottom: 8,
//    },
//    workflowDescription: {
//       fontFamily: Fonts.medium,
//       fontSize: 14,
//       color: "#7F8C9A",
//       lineHeight: 20,
//    },
//    whyUsCard: {
//       width: "48%",
//       padding: 24,
//       justifyContent: "center",
//       alignItems: "center",
//    },
//    whyUsTitle: {
//       fontFamily: Fonts.bold,
//       fontSize: 20,
//       color: "#2C3E50",
//       marginVertical: 12,
//       textAlign: "center",
//    },
//    whyUsText: {
//       fontFamily: Fonts.medium,
//       fontSize: 14,
//       color: "#7F8C9A",
//       textAlign: "center",
//       lineHeight: 20,
//    },
//    partnersScroll: {
//       paddingHorizontal: 16,
//    },
//    partnerLogo: {
//       width: 160,
//       height: 80,
//       resizeMode: "contain",
//       marginRight: 32,
//    },
// });

// export default HomeScreen;

import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import FadingAnnouncement from "@src/components/Announcement/Annoncement";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useShippingMode } from "@src/store/shippingMode";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
   Extrapolate,
   FadeInDown,
   FadeInRight,
   interpolate,
   useAnimatedRef,
   useAnimatedScrollHandler,
   useAnimatedStyle,
   useSharedValue,
   withSpring,
   withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/Banner";
import { Header } from "../components/Header";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const PARTNER_LOGOS = [
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png",
];

const WhyUsCard = ({
   icon,
   title,
   description,
   index,
}: {
   icon: string;
   title: string;
   description: string;
   index: number;
}) => (
   <View style={[styles.whyUsCard, { backgroundColor: index % 2 === 0 ? "#4A90E2" : "#1ED7B5" }]}>
      <FontAwesome6 name={icon} size={32} color="white" />
      <Text style={styles.whyUsTitle}>{title}</Text>
      <Text style={styles.whyUsDescription}>{description}</Text>
   </View>
);

const HomeScreen = ({ navigation }: HomeTabScreenProps<"Home">) => {
   const scrollY = useSharedValue(0);
   const scrollRef = useAnimatedRef<ScrollView>();
   const headerHeight = useSharedValue(100);
   const isScrolled = useSharedValue(false);

   const setType = useShippingMode((state) => state.setType);

   const handlePressBlockOne = () => {
      navigation.navigate("faq");
   };

   const handlePressBlockTwo = () => {
      navigation.navigate("AboutUs");
   };

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
         headerHeight.value = interpolate(
            event.contentOffset.y,
            [0, 100],
            [100, 70],
            Extrapolate.CLAMP
         );
         isScrolled.value = event.contentOffset.y > 800;
      },
   });

   const headerStyle = useAnimatedStyle(() => ({
      height: headerHeight.value,
      paddingVertical: interpolate(headerHeight.value, [70, 100], [8, 16]),
   }));

   const backButtonStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isScrolled.value ? 1 : 0),
      transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
   }));

   const whatsappStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
   }));

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
            {/* Banner Section */}
            <Animated.View entering={FadeInDown.delay(200).springify()}>
               <Banner />
            </Animated.View>

            {/* Main Actions */}

            {/* Shipping Solutions */}
            <FadingAnnouncement />
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Nos Solutions d'Expédition</Text>
               <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalScroll}
               >
                  <Animated.View entering={FadeInRight.delay(200)}>
                     <Pressable onPress={handlePressBlockOne} style={styles.card}>
                        <LinearGradient colors={["#4A90E2", "#1ED7B5"]} style={styles.cardGradient}>
                           <FontAwesome6 name="plane" size={48} color="white" />
                           <Text style={styles.cardTitle}>Fret Aérien</Text>
                           <Text style={styles.cardText}>
                              Livraison rapide en 2 à 3 semaines avec suivi en temps réel
                           </Text>
                        </LinearGradient>
                     </Pressable>
                  </Animated.View>

                  <Animated.View entering={FadeInRight.delay(400)}>
                     <Pressable onPress={handlePressBlockTwo} style={styles.card}>
                        <LinearGradient colors={["#1ED7B5", "#4A90E2"]} style={styles.cardGradient}>
                           <FontAwesome6 name="ship" size={48} color="white" />
                           <Text style={styles.cardTitle}>Sea Freight</Text>
                           <Text style={styles.cardText}>
                              Expédition économique en vrac (6 à 8 semaines)
                           </Text>
                        </LinearGradient>
                     </Pressable>
                  </Animated.View>
               </ScrollView>
            </View>

            {/* Key Features */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Pourquoi ChinaLink Express?</Text>
               <View style={styles.featuresGrid}>
                  {[
                     "Expedition rapide",
                     "Suivi en temps réel",
                     "Assurance complète",
                     "Dedouanement inclus",
                     "Service client 24/7",
                  ].map((feature, index) => (
                     <Animated.View
                        key={index}
                        style={styles.featureItem}
                        entering={FadeInDown.delay(index * 100).springify()}
                     >
                        <FontAwesome6 name="check-circle" size={20} color="#1ED7B5" />
                        <Text style={styles.featureText}>{feature}</Text>
                     </Animated.View>
                  ))}
               </View>
            </View>

            {/* How It Works Section */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Comment ça marche ?</Text>
               <View style={styles.workflowContainer}>
                  {[
                     {
                        icon: "headset",
                        title: "1. Contactez & Choisissez la Méthode",
                        description:
                           "Contactez-nous et choisissez votre méthode d'expédition préférée",
                     },
                     {
                        icon: "map-location-dot",
                        title: "2. Recevez l'adresse de l'entrepôt",
                        description:
                           "Nous fournissons notre adresse d'entrepôt chinois pour la consolidation des colis",
                     },
                     {
                        icon: "box-archive",
                        title: "3. Arrivée des colis",
                        description:
                           "Nous vous informons de l'arrivée de tous les articles à notre dépôt",
                     },
                     {
                        icon: "earth-africa",
                        title: "4. Expédition vers le Mali",
                        description:
                           "Nous nous occupons du dédouanement et du transport vers le Mali",
                     },
                     {
                        icon: "hand-holding-hand",
                        title: "5. Collecte du colis",
                        description:
                           "Récupérez votre envoi dans notre centre de distribution au Mali",
                     },
                  ].map((step, index) => (
                     <View key={index} style={styles.workflowStep}>
                        <View style={styles.workflowIcon}>
                           <FontAwesome6 name={step.icon} size={24} color="white" />
                        </View>
                        <View style={styles.workflowText}>
                           <Text style={styles.workflowStepTitle}>{step.title}</Text>
                           <Text style={styles.workflowStepDescription}>{step.description}</Text>
                        </View>
                     </View>
                  ))}
               </View>
            </View>

            {/* Partners Section */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Les services utilisés</Text>
               <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.partnersScroll}
               >
                  {PARTNER_LOGOS.map((logo, index) => (
                     <Image key={index} source={{ uri: logo }} style={styles.partnerLogo} />
                  ))}
               </ScrollView>
            </View>
         </AnimatedScrollView>

         {/* Back to Top Button */}
         <Animated.View style={[styles.backToTop, backButtonStyle]}>
            <Pressable
               onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
               style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
               <LinearGradient colors={["#4A90E2", "#1ED7B5"]} style={styles.backToTopButton}>
                  <AntDesign name="arrowup" size={24} color="white" />
               </LinearGradient>
            </Pressable>
         </Animated.View>

         {/* WhatsApp Button */}
         <Animated.View style={[styles.whatsappButton, whatsappStyle]}>
            <Pressable
               onPress={() =>
                  Linking.openURL(
                     "whatsapp://send?phone=+8618851725957&text=Bonjour%20ChinaLink,%20J%20ai%20une%20demande%20d'expedition%20a%20faire%20:)"
                  )
               }
               style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
               <LinearGradient colors={["#25D366", "#128C7E"]} style={styles.whatsappContainer}>
                  <FontAwesome6 name="whatsapp" size={28} color="white" />
               </LinearGradient>
            </Pressable>
         </Animated.View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   headerContainer: {
      borderColor: COLORS.blue,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      paddingHorizontal: 20,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
   },
   logo: {
      width: "80%",
      height: 60,
      resizeMode: "contain",
   },
   scrollContent: {
      paddingBottom: 100,
   },
   voirPlusText: {
      textAlign: "center",
      fontFamily: Fonts.black,
      fontSize: 26,
      margin: 18,
      textTransform: "uppercase",
      color: COLORS.blue,
   },
   blocksContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 16,
      gap: 16,
      paddingHorizontal: 16,
   },
   section: {
      marginVertical: 24,
      paddingHorizontal: 16,
   },
   sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 26,
      color: "#2C3E50",
      marginBottom: 24,
      textAlign: "center",
   },
   horizontalScroll: {
      paddingHorizontal: 16,
      gap: 16,
   },
   card: {
      width: 200,
      height: 280,
      borderRadius: 24,
      marginRight: 16,
      overflow: "hidden",
   },
   cardGradient: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
   },
   cardTitle: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      color: "white",
      marginVertical: 12,
      textAlign: "center",
   },
   cardText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: "rgba(255,255,255,0.9)",
      textAlign: "center",
      lineHeight: 22,
   },
   featuresGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "center",
   },
   featureItem: {
      width: "45%",
      backgroundColor: "white",
      padding: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
   },
   featureText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: "#2C3E50",
      flexShrink: 1,
   },
   workflowContainer: {
      gap: 16,
   },
   workflowStep: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
   },
   workflowIcon: {
      backgroundColor: "#4A90E2",
      borderRadius: 8,
      padding: 12,
      marginRight: 16,
   },
   workflowText: {
      flex: 1,
   },
   workflowStepTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: "#2C3E50",
      marginBottom: 4,
   },
   workflowStepDescription: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: "#7F8C9A",
      lineHeight: 20,
   },
   whyUsContainer: {
      paddingHorizontal: 16,
   },
   whyUsCard: {
      width: 240,
      padding: 20,
      borderRadius: 12,
      marginRight: 16,
   },
   whyUsTitle: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: "white",
      marginVertical: 8,
   },
   whyUsDescription: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: "rgba(255,255,255,0.9)",
   },
   partnersScroll: {
      paddingHorizontal: 16,
   },
   partnerLogo: {
      width: 70,
      height: 80,
      resizeMode: "contain",
      marginRight: 32,
   },
   backToTop: {
      position: "absolute",
      bottom: 30,
      right: 20,
      zIndex: 100,
   },
   backToTopButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
   },
   whatsappButton: {
      position: "absolute",
      bottom: 30,
      left: 20,
      zIndex: 100,
   },
   whatsappContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
   },
   headerActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      marginTop: 8,
   },
});

export default HomeScreen;
