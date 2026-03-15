/**
 * Goods Feature Screens - Public API
 */

// GoodsListScreen
export { GoodsListScreen } from './GoodsListScreen';
export { default as GoodsListScreenDefault } from './GoodsListScreen';

// GoodsDetailScreen
export { GoodsDetailScreen } from './GoodsDetailScreen';
export { 
  StatusBadge,
  GoodsDetailHeader,
  GoodsDetailInfo,
  GoodsDetailPhysicalProps,
  GoodsDetailLocation,
  GoodsDetailPricing,
  GoodsDetailReception,
  GoodsDetailQRCode,
  GoodsDetailPhoto,
  GoodsDetailActions,
  GoodsDetailSkeleton,
} from './GoodsDetailScreen/components';
export { useGoodsDetailScreen } from './GoodsDetailScreen/hooks';

// ReceiveGoodsScreen (migrated to Feature-Based Architecture)
export { ReceiveGoodsScreen } from './ReceiveGoodsScreen';
export { default as ReceiveGoodsScreenDefault } from './ReceiveGoodsScreen';

// Re-export screen-specific components and hooks from ReceiveGoodsScreen
export {
  ReceiveGoodsForm,
  GoodsDimensionsInput,
  GoodsPhotosUpload,
  GoodsConditionSelector,
} from './ReceiveGoodsScreen/components';

export {
  useReceiveGoodsForm,
  useReceiveGoodsScreen,
} from './ReceiveGoodsScreen/hooks';

// Re-export types from ReceiveGoodsScreen
export type {
  ReceiveGoodsFormData,
  GoodsDimensionsInputProps,
  GoodsPhotosUploadProps,
  GoodsConditionSelectorProps,
} from './ReceiveGoodsScreen/types';

// VoidGoodsScreen
export { VoidGoodsScreen } from './VoidGoodsScreen';
export { default as VoidGoodsScreenDefault } from './VoidGoodsScreen';

// VoidGoodsListScreen
import VoidGoodsListScreen from './VoidGoodsListScreen';
export { VoidGoodsListScreen };
