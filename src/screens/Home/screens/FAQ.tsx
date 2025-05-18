import SearchBar from "@src/components/SearchBar/SearhBar";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import React, { useState } from "react";
import { Dimensions, LayoutAnimation, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, MotiText, AnimatePresence } from "moti";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
   FadeIn,
   FadeOut,
   Layout,
   SlideInDown,
   SlideOutUp,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";
import { TapGestureHandler } from "react-native-gesture-handler";

const faqs = [
   {
      question: "Quels services proposons-nous ?",
      answer:
         "Nous optimisons vos expéditions en prenant en charge la réception de vos colis en Chine, où nous gérons intégralement vos envois, puis leur expédition vers le Bamako, assurant ainsi un acheminement rapide et sécurisé de vos marchandises.",
   },
   {
      question: "Quels sont nos délais de livraison ?",
      answer:
         "Pour les envois maritimes, le délai d'expédition est généralement compris entre 6 et 8 semaines. Pour les envois aériens, le délai d'expédition est de 2 à 3 semaines. Ces délais peuvent varier en fonction des conditions météorologiques.",
   },
   {
      question: "Comment sont calculés les frais d'expédition ?",
      answer:
         "Les frais sont basés sur le poids et le volume des colis.Nous appliquons un volume minimum de 0.1 CBM, facturé même si le volume réel est inférieur.Ce minimum inclut jusqu’à 10 kg de marchandise.Si le poids dépasse 10 kg, un supplément de 0.025 CBM est ajouté tous les 5 kg supplémentaires.Exemples :0.05 CBM, 8 kg → facturé 0.1 CBM 0.05 CBM, 12 kg → facturé 0.125 CBM 0.05 CBM, 17 kg → facturé 0.15 CBM Les volumes sont  arrondis selon nos standards de chargement pour répondre aux contraintes du conteneur. Cette pratique permet de compenser les frais de groupage, de palettes, et de gestion logistique.",
   },
   {
      question: "Comment puis-je suivre mes envois ?",
      answer:
         "Vous pouvez suivre vos envois en utilisant notre application mobile. Il vous suffit de vous connecter à votre compte pour obtenir des informations en temps réel sur l'état de votre colis.",
   },
   {
      question: "Quels types de marchandises pouvez-vous expédier ?",
      answer:
         "Nous assurons l'expédition d'une vaste gamme de marchandises, incluant les biens de consommation, les produits électroniques, les matériaux de construction,Les habits,Chaussures entre autres. Pour toute demande relative à des marchandises spécifiques, nous vous invitons à nous contacter directement via WhatsApp au +8618851725957.",
   },
   {
      question: "Offrez-vous un service de groupage ?",
      answer:
         "Oui, nous proposons un service de groupage pour optimiser les coûts d'expédition en consolidant plusieurs colis dans un même envoi.",
   },
   {
      question: "Pourquoi les coûts d'expédition maritime varient-ils ?",
      answer:
         "Les coûts varient en fonction du prix du carburant, des saisons, et des réglementations locales. Nous nous efforçons de proposer des tarifs compétitifs.",
   },
   {
      question: "Puis-je envoyer des colis volumineux par avion ?",
      answer:
         "Oui, nous proposons l'expédition de colis volumineux par avion. Contactez-nous pour plus d'informations sur les tarifs et les délais de livraison.",
   },

   {
      question: "Comment puis-je payer mes frais d'expédition ?",
      answer:
         "Nous acceptons actuellement les paiements en espèces et via mobile money. De plus, un moyen de paiement intégré dans notre application sera bientôt disponible, incluant Wave, Orange Money et MobiCash. Pour plus de détails, nous vous invitons à contacter notre service client.",
   },

   {
      question: "Les prix incluent-ils les frais de douane ?",
      answer: "Oui, les frais de douane sont pris en charge par nous.",
   },

   {
      question: "Quels sont les objets interdits à l’expédition ?",
      answer:
         "Nous n'acceptons pas les produits illégaux, explosifs, batteries lithium, parfums, animaux vivants, et autres objets interdits par les lois internationales. Contactez-nous pour plus d'informations sur whatsapp +8618851725957.",
   },

   {
      question: "Puis-je expédier plusieurs colis sous un même envoi ?",
      answer: "Oui, vous pouvez expédier plusieurs colis sous un même envoi.",
   },
   {
      question: "Quels sont les avantages de l’expédition maritime ?",
      answer:
         "L'expédition maritime est idéale pour les gros volumes et offre un coût plus économique que l'expédition aérienne.",
   },

   {
      question: "Les prix d'expédition incluent-ils le transport jusqu'à mon domicile ?",
      answer: "Non, les prix concernent l’expédition jusqu’à notre entrepôt à Bamako.",
   },
   {
      question: "Proposez-vous un service d’achat et d’expédition ?",
      answer: "Oui, nous pouvons acheter les produits pour vous et les expédier à votre adresse.",
   },
   {
      question: "Comment puis-je contacter le service client ?",
      answer: "Vous pouvez nous contacter sur WhatsApp au +8618851725957.",
   },
   {
      question: "Avez-vous d'autres questions ?",
      answer:
         "Si vous avez d'autres questions ou avez besoin d'assistance, n'hésitez pas à nous contacter sur WhatsApp au +8618851725957.",
   },
];
const FAQItem = React.memo(
   ({ question, answer, index }: { question: string; answer: string; index: number }) => {
      const [expanded, setExpanded] = useState(false);
      const theme = useTheme();

      return (
         <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 50 }}
         >
            <TapGestureHandler
               onEnded={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setExpanded(!expanded);
               }}
            >
               <Animated.View
                  style={{
                     backgroundColor: COLORS.white,
                     borderRadius: 12,
                     marginHorizontal: 16,
                     marginBottom: 8,
                     shadowColor: "#000",
                     shadowOffset: { width: 0, height: 2 },
                     shadowOpacity: 0.1,
                     shadowRadius: 4,
                     elevation: 2,
                  }}
                  layout={Layout.delay(100)}
               >
                  <MotiView
                     style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                     }}
                     animate={{ paddingBottom: expanded ? 8 : 16 }}
                     transition={{ type: "timing" }}
                  >
                     <MotiView
                        style={{ marginRight: 12 }}
                        from={{ rotate: "0deg" }}
                        animate={{ rotate: expanded ? "180deg" : "0deg" }}
                        transition={{ type: "timing" }}
                     >
                        <AntDesign name="caretdown" size={24} color="black" />
                     </MotiView>

                     <MotiText
                        style={{
                           flex: 1,
                           fontFamily: Fonts.bold,
                           fontSize: 14,
                           color: COLORS.black,
                        }}
                        animate={{
                           color: expanded ? COLORS.black : COLORS.blue,
                        }}
                        transition={{ type: "timing" }}
                     >
                        {question}
                     </MotiText>
                  </MotiView>

                  {expanded && (
                     <MotiView
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "timing" }}
                     >
                        <Animated.Text
                           style={{
                              padding: 16,
                              paddingTop: 0,
                              fontFamily: Fonts.meduim,
                              fontSize: 13,
                              lineHeight: 20,
                           }}
                           entering={FadeIn.delay(50)}
                           exiting={FadeOut}
                        >
                           {answer}
                        </Animated.Text>
                     </MotiView>
                  )}
               </Animated.View>
            </TapGestureHandler>
         </MotiView>
      );
   }
);

const Faq = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const theme = useTheme();

   // ... (keep the same faqs array as before)

   const filteredFaqs = faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <MotiView
               from={{ translateY: -20, opacity: 0 }}
               animate={{ translateY: 0, opacity: 1 }}
               transition={{ type: "timing", duration: 400 }}
               style={{
                  paddingHorizontal: 16,
                  paddingBottom: 8,
                  backgroundColor: theme.colors.background,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 4,
                  zIndex: 1,
               }}
            >
               <MotiText
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 200 }}
                  style={{
                     fontSize: 24,
                     fontFamily: Fonts.bold,
                     color: COLORS.blue,
                     marginVertical: 16,
                  }}
               >
                  FAQ
               </MotiText>

               <Animated.View entering={SlideInDown.delay(100)} exiting={SlideOutUp}>
                  <SearchBar
                     placeholder="Chercher dans la FAQ..."
                     value={searchQuery}
                     onChangeSearch={(query) => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setSearchQuery(query);
                     }}
                  />
               </Animated.View>
            </MotiView>

            <Animated.FlatList
               data={filteredFaqs}
               keyExtractor={(item, index) => item.question + index}
               contentContainerStyle={{ paddingTop: 16 }}
               renderItem={({ item, index }) => (
                  <FAQItem question={item.question} answer={item.answer} index={index} />
               )}
               ListEmptyComponent={
                  <MotiView
                     from={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     style={{ alignItems: "center", marginTop: 40 }}
                  >
                     <MotiText
                        style={{
                           fontFamily: Fonts.meduim,
                           color: theme.colors.error,
                           fontSize: 16,
                        }}
                     >
                        Aucun résultat trouvé
                     </MotiText>
                  </MotiView>
               }
               scrollEventThrottle={16}
               keyboardDismissMode="on-drag"
               windowSize={11}
               initialNumToRender={10}
               maxToRenderPerBatch={5}
            />
         </SafeAreaView>
      </GestureHandlerRootView>
   );
};

export default Faq;
