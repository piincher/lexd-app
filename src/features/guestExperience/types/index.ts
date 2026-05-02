export type DemoShipmentMode = 'sea' | 'air';

export interface DemoTimelineStep {
  id: string;
  title: string;
  detail: string;
  status: 'done' | 'active' | 'next';
  icon: string;
}

export interface DemoShipment {
  id: string;
  mode: DemoShipmentMode;
  label: string;
  route: string;
  status: string;
  eta: string;
  goodsCount: number;
  goodsPreview: string[];
  timeline: DemoTimelineStep[];
}

export interface DemoBenefit {
  id: string;
  title: string;
  detail: string;
  icon: string;
}

export interface DemoDocument {
  id: string;
  title: string;
  detail: string;
  availability: string;
  icon: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  detail: string;
  channel: string;
  time: string;
  icon: string;
}

export interface DemoClientStep {
  id: string;
  title: string;
  detail: string;
  icon: string;
}

export interface DemoFaq {
  id: string;
  question: string;
  answer: string;
}

export interface DemoMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'success' | 'info' | 'warning' | 'neutral';
}

export interface DemoGoodsItem {
  id: string;
  name: string;
  trackingCode: string;
  status: string;
  route: string;
  quantity: number;
  volume: string;
  balance: string;
  mode: DemoShipmentMode;
}

export interface DemoLockedFeature {
  id: string;
  title: string;
  detail: string;
  reason: string;
  icon: string;
}
