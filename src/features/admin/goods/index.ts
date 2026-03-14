/**
 * Admin V2 Goods Feature - Public API
 * Enterprise-grade goods management for warehouse operations
 */

// API Client (explicit export to avoid duplicate type exports)
export { adminGoodsApi } from './api/goodsApi';

// Services
export * from './services/GoodsService';

// Hooks
export * from './hooks';

// Types (comprehensive types from ./types, NOT from ./api/types to avoid duplicates)
export * from './types';

// Screens
export { default as ReceiveGoodsScreen } from './screens/ReceiveGoodsScreen';
export { default as GoodsListScreen } from './screens/GoodsListScreen';
export { default as AdminGoodsDetailScreen } from './screens/GoodsDetailScreen';

// Components (for advanced usage)
export * from './components';
