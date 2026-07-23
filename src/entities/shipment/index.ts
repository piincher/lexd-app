/**
 * Shipment entity — the customer's single unit of "my stuff is on its way".
 *
 * Import from here rather than reaching into ./model or ./ui.
 */

export {
  SHIPMENT_STAGES,
  MILESTONE_STAGES,
  STAGE_BY_KEY,
  toStage,
  toException,
  resolveStage,
  stageProgress,
  stageLabel,
  stageShortLabel,
  needsCustomerAction,
  type ShipmentStage,
  type ShipmentException,
  type ShipmentMode,
  type StageMeta,
  type StageSource,
} from './model/lifecycle';

export {
  fromContainer,
  fromOrder,
  buildShipments,
  toMode,
  type Shipment,
  type ShipmentItem,
} from './model/shipment';

export { ShipmentTimeline, type ShipmentTimelineProps } from './ui/ShipmentTimeline';
