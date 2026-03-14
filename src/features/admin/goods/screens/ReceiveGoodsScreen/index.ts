/**
 * ReceiveGoodsScreen - Feature-Based Architecture
 * 
 * Form-heavy screen for receiving goods with:
 * - Zod validation
 * - React Hook Form
 * - Composed form sections
 */

// Screen
export { ReceiveGoodsScreen } from './ReceiveGoodsScreen';
export { default } from './ReceiveGoodsScreen';

// Components
export {
  ReceiveGoodsForm,
  GoodsDimensionsInput,
  GoodsPhotosUpload,
  GoodsConditionSelector,
} from './components';

// Hooks
export {
  useReceiveGoodsForm,
  useReceiveGoodsScreen,
} from './hooks';

// Types
export type {
  ReceiveGoodsFormData,
  GoodsDimensionsInputProps,
  GoodsPhotosUploadProps,
  GoodsConditionSelectorProps,
} from './types';
