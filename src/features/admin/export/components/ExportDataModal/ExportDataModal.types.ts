import { ExportEntity } from "../../types";

export interface ExportDataModalProps {
  visible: boolean;
  onDismiss: () => void;
  entity: ExportEntity;
  entityLabel: string;
}
