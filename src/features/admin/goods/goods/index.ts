/**
 * Admin V2 Goods Feature - Public API
 * Enterprise-grade goods management for warehouse operations
 */

// API & Services
export * from './api';
export * from './services/GoodsService';

// Hooks
export * from './hooks';

// Types
export * from './types';

// Screens
export { default as ReceiveGoodsScreen } from './screens/ReceiveGoodsScreen';
export { default as GoodsListScreen } from './screens/GoodsListScreen';
export { default as AdminGoodsDetailScreen } from './screens/GoodsDetailScreen';

// Components (for advanced usage)
export { GoodsCard } from '@src/features/goods/components';
