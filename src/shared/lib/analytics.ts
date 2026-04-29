/**
 * Analytics Service
 *
 * Mixpanel-backed analytics wrapper providing a singleton instance
 * for tracking events, screen views, user identity, and user properties.
 *
 * Replaces the previous Firebase Analytics integration.
 */

import { Mixpanel } from 'mixpanel-react-native';

const MIXPANEL_TOKEN = '35d3bba02ee4e264ccee8679c8fc6d73';

let mixpanelInstance: Mixpanel | null = null;

export function getMixpanel(): Mixpanel {
  if (!mixpanelInstance) {
    mixpanelInstance = new Mixpanel(MIXPANEL_TOKEN, false);
    mixpanelInstance.init();
  }
  return mixpanelInstance;
}

/** Track a named event with optional properties */
export async function trackEvent(
  name: string,
  properties?: Record<string, unknown>
): Promise<void> {
  try {
    const mp = getMixpanel();
    await mp.track(name, properties);
  } catch (error) {
    console.warn('[Analytics] Failed to track event:', error);
  }
}

/** Track a screen view */
export async function trackScreenView(
  screenName: string,
  screenClass?: string
): Promise<void> {
  try {
    const mp = getMixpanel();
    await mp.track('screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  } catch (error) {
    console.warn('[Analytics] Failed to track screen view:', error);
  }
}

/** Track a purchase event */
export async function trackPurchase(
  transactionId: string,
  value: number,
  currency: string,
  items?: Array<{
    item_id: string;
    item_name: string;
    item_category?: string;
    quantity?: number;
    price?: number;
  }>
): Promise<void> {
  try {
    const mp = getMixpanel();
    await mp.track('purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items,
    });
  } catch (error) {
    console.warn('[Analytics] Failed to track purchase:', error);
  }
}

/** Set the distinct user ID */
export async function setUserId(userId: string | null): Promise<void> {
  try {
    const mp = getMixpanel();
    if (userId) {
      await mp.identify(userId);
    } else {
      await mp.reset();
    }
  } catch (error) {
    console.warn('[Analytics] Failed to set user ID:', error);
  }
}

/** Set a user property on the people profile */
export async function setUserProperty(
  name: string,
  value: string | null
): Promise<void> {
  try {
    const mp = getMixpanel();
    if (value !== null) {
      await mp.getPeople().set(name, value);
    } else {
      await mp.getPeople().unset(name);
    }
  } catch (error) {
    console.warn('[Analytics] Failed to set user property:', error);
  }
}

/** Flush queued events to Mixpanel */
export async function flushAnalytics(): Promise<void> {
  try {
    const mp = getMixpanel();
    await mp.flush();
  } catch (error) {
    console.warn('[Analytics] Failed to flush:', error);
  }
}

/** Alias an anonymous ID to a known user ID (e.g. after signup) */
export async function aliasUser(aliasId: string): Promise<void> {
  try {
    const mp = getMixpanel();
    await mp.alias(aliasId, MIXPANEL_TOKEN);
  } catch (error) {
    console.warn('[Analytics] Failed to alias user:', error);
  }
}
