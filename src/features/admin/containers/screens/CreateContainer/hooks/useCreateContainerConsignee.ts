import { useState, useCallback } from 'react';
import { Consignee } from '../../../../consignees';

export const useCreateContainerConsignee = (
  updateField: (field: 'consigneeId', value: string) => void
) => {
  const [selectedConsigneeName, setSelectedConsigneeName] = useState<string>('');
  const [consigneeSearchQuery, setConsigneeSearchQuery] = useState<string>('');
  const [showConsigneeDropdown, setShowConsigneeDropdown] = useState<boolean>(false);

  const handleSelectConsignee = useCallback((consignee: Consignee) => {
    updateField('consigneeId', consignee._id);
    setSelectedConsigneeName(consignee.name);
    setConsigneeSearchQuery('');
    setShowConsigneeDropdown(false);
  }, [updateField]);

  const handleClearConsignee = useCallback(() => {
    updateField('consigneeId', '');
    setSelectedConsigneeName('');
    setConsigneeSearchQuery('');
  }, [updateField]);

  return {
    selectedConsigneeName,
    consigneeSearchQuery,
    showConsigneeDropdown,
    setConsigneeSearchQuery,
    setShowConsigneeDropdown,
    handleSelectConsignee,
    handleClearConsignee,
  };
};
