import { Linking, Alert } from "react-native";

/**
 * Open phone dialer with the given number.
 */
export const callPhone = async (phone?: string) => {
  if (!phone) return;
  const url = `tel:${phone}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) await Linking.openURL(url);
};

/**
 * Open WhatsApp with the given number.
 */
export const openWhatsApp = async (phone?: string) => {
  if (!phone) return;
  const cleaned = phone.replace(/\D/g, "");
  const url = `https://wa.me/${cleaned}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("WhatsApp non installé", "Veuillez installer WhatsApp pour envoyer un message.");
  }
};

/**
 * Open email composer.
 */
export const sendEmail = async (email?: string) => {
  if (!email) return;
  const url = `mailto:${email}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) await Linking.openURL(url);
};

/**
 * Open SMS composer.
 */
export const sendSMS = async (phone?: string) => {
  if (!phone) return;
  const url = `sms:${phone}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) await Linking.openURL(url);
};
