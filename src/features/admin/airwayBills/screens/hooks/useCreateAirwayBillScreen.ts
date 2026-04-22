import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCreateAirwayBill, useSearchAirwayBillConsignees } from '../../hooks/useAirwayBills';
import { AirwayBillConsignee } from '../../types';

export const useCreateAirwayBillScreen = () => {
  const navigation = useNavigation();
  const createMutation = useCreateAirwayBill();

  const [flightNumber, setFlightNumber] = useState('');
  const [airline, setAirline] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [notes, setNotes] = useState('');
  const [capacityWeight, setCapacityWeight] = useState<number>(28000);
  const [consigneeSearchQuery, setConsigneeSearchQuery] = useState('');
  const [showConsigneeDropdown, setShowConsigneeDropdown] = useState(false);
  const [selectedConsignee, setSelectedConsignee] = useState<AirwayBillConsignee | null>(null);

  const normalizedConsigneeSearch = useMemo(() => {
    const search = consigneeSearchQuery.trim();
    const isPhoneLike = /^[\d\s\-+()]+$/.test(search);
    return isPhoneLike ? search.replace(/[^\d+]/g, '') : search;
  }, [consigneeSearchQuery]);

  const { data: consignees = [], isLoading: isLoadingConsignees } =
    useSearchAirwayBillConsignees(normalizedConsigneeSearch);

  const handleConsigneeSearchChange = (query: string) => {
    setConsigneeSearchQuery(query);
    setShowConsigneeDropdown(true);
  };

  const handleSelectConsignee = (consignee: AirwayBillConsignee) => {
    setSelectedConsignee(consignee);
    setConsigneeSearchQuery('');
    setShowConsigneeDropdown(false);
  };

  const handleClearConsignee = () => {
    setSelectedConsignee(null);
  };

  const handleSubmit = async () => {
    try {
      await createMutation.mutateAsync({
        flightNumber: flightNumber.trim() || undefined,
        airline: airline.trim() || undefined,
        departureAirport: departureAirport.trim().toUpperCase() || undefined,
        arrivalAirport: arrivalAirport.trim().toUpperCase() || undefined,
        consigneeId: selectedConsignee?._id,
        capacityWeight: Number(capacityWeight) || 28000,
        notes: notes.trim() || undefined,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create airway bill:', error);
    }
  };

  return {
    values: { flightNumber, airline, departureAirport, arrivalAirport, notes, capacityWeight },
    setters: { setFlightNumber, setAirline, setDepartureAirport, setArrivalAirport, setNotes, setCapacityWeight },
    consignee: {
      selected: selectedConsignee,
      consignees,
      searchQuery: consigneeSearchQuery,
      showDropdown: showConsigneeDropdown,
      isLoading: isLoadingConsignees,
      setShowDropdown: setShowConsigneeDropdown,
      handleSearchChange: handleConsigneeSearchChange,
      handleSelect: handleSelectConsignee,
      handleClear: handleClearConsignee,
    },
    isSubmitting: createMutation.isPending,
    handleSubmit,
  };
};
