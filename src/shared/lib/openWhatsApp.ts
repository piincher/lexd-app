import { Linking, Platform } from 'react-native';
import { LEXD_CONTACTS } from '@src/shared/constants/contact';

/**
 * Open WhatsApp with Business priority fallback.
 *
 * Strategy:
 * 1. Try WhatsApp Business first (platform-specific method)
 *    - Android: explicit intent with package com.whatsapp.w4b
 *    - iOS: whatsapp-business:// URL scheme
 * 2. Fall back to regular WhatsApp (whatsapp://)
 * 3. Final fallback to https://wa.me/ web link
 *
 * @param phone   Phone number with or without + prefix (e.g. "+22376696177")
 * @param text    Optional pre-filled message
 */
export const openWhatsApp = async (phone: string, text?: string): Promise<void> => {
  const clean = phone.replace(/\D/g, '');
  const encodedText = text ? `&text=${encodeURIComponent(text)}` : '';

  // ── 1. WhatsApp Business ────────────────────────────────────────────
  if (Platform.OS === 'android') {
    // On Android, the URL scheme "whatsapp-business://" is NOT registered
    // by WhatsApp Business. We must use an explicit intent with the package name.
    const businessIntent =
      `intent://send?phone=${clean}${encodedText}` +
      `#Intent;scheme=whatsapp;package=com.whatsapp.w4b;action=android.intent.action.VIEW;end`;
    try {
      const supported = await Linking.canOpenURL(businessIntent);
      if (supported) {
        await Linking.openURL(businessIntent);
        return;
      }
    } catch {
      // WhatsApp Business not installed or can't be queried — fall through
    }
  } else {
    // iOS: WhatsApp Business registers the "whatsapp-business://" scheme
    const businessUrl = `whatsapp-business://send?phone=${clean}${encodedText}`;
    const businessSupported = await Linking.canOpenURL(businessUrl).catch(() => false);
    if (businessSupported) {
      await Linking.openURL(businessUrl);
      return;
    }
  }

  // ── 2. Regular WhatsApp ─────────────────────────────────────────────
  const appUrl = `whatsapp://send?phone=${clean}${encodedText}`;
  const appSupported = await Linking.canOpenURL(appUrl).catch(() => false);
  if (appSupported) {
    await Linking.openURL(appUrl);
    return;
  }

  // ── 3. Web fallback ─────────────────────────────────────────────────
  const webUrl = `https://wa.me/${clean}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  await Linking.openURL(webUrl);
};

/**
 * Open the company's support WhatsApp (LEXD).
 * Uses the centralized support phone number.
 */
export const openSupportWhatsApp = async (text?: string): Promise<void> => {
  await openWhatsApp(LEXD_CONTACTS.main.phone, text);
};
