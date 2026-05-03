export type DemoShipmentMode = 'sea' | 'air';

export interface DemoTimelineStep {
  id: string;
  title: string;
  detail: string;
  status: 'done' | 'active' | 'next';
  icon: string;
  date?: string;
  location?: string;
}

export interface DemoShipment {
  id: string;
  mode: DemoShipmentMode;
  label: string;
  route: string;
  status: string;
  statusColor: string;
  eta: string;
  etaDate: string;
  progress: number;
  goodsCount: number;
  weight: string;
  volume: string;
  containerNumber?: string;
  airwayBillNumber?: string;
  goodsPreview: string[];
  timeline: DemoTimelineStep[];
  waypoints: DemoWaypoint[];
}

export interface DemoWaypoint {
  id: string;
  city: string;
  country: string;
  code: string;
  status: 'done' | 'active' | 'next';
  icon: string;
  date?: string;
}

export interface DemoBenefit {
  id: string;
  title: string;
  detail: string;
  icon: string;
  color: string;
}

export interface DemoDocument {
  id: string;
  title: string;
  detail: string;
  availability: string;
  icon: string;
  pages: number;
  size: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  detail: string;
  channel: string;
  time: string;
  icon: string;
  color: string;
  read: boolean;
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
  tone: 'success' | 'info' | 'warning' | 'neutral' | 'primary';
  change?: string;
}

export interface DemoGoodsItem {
  id: string;
  name: string;
  trackingCode: string;
  status: string;
  statusColor: string;
  route: string;
  quantity: number;
  volume: string;
  weight: string;
  balance: string;
  mode: DemoShipmentMode;
  imageColor: string;
}

export interface DemoLockedFeature {
  id: string;
  title: string;
  detail: string;
  reason: string;
  icon: string;
  previewCount?: number;
}

export interface DemoQuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}
