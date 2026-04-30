import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const useRecipientSelectorStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        modeRow: {
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 16,
          gap: 10,
        },
        modeTab: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: Theme.neutral[100],
        },
        modeTabActive: {
          backgroundColor: Theme.primary[500],
        },
        modeText: {
          fontSize: 13,
          fontFamily: Fonts.semiBold,
          fontWeight: '600',
          color: Theme.neutral[500],
        },
        modeTextActive: {
          color: '#FFF',
        },
        dateRow: {
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 12,
          gap: 10,
        },
        datePicker: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 14,
          paddingVertical: 10,
          backgroundColor: Theme.primary[50],
          borderRadius: 12,
          borderWidth: 1,
          borderColor: Theme.primary[200],
        },
        dateText: {
          flex: 1,
          fontSize: 13,
          fontFamily: Fonts.medium,
          color: Theme.neutral[700],
        },
        fetchButton: {
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: Theme.primary[500],
          borderRadius: 12,
          justifyContent: 'center',
        },
        fetchButtonDisabled: {
          backgroundColor: Theme.neutral[200],
        },
        fetchButtonText: {
          fontSize: 13,
          fontFamily: Fonts.semiBold,
          fontWeight: '600',
          color: '#FFF',
        },
        searchRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 12,
          gap: 10,
        },
        searchContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Theme.neutral[100],
          borderRadius: 12,
          paddingHorizontal: 12,
          height: 42,
        },
        searchInput: {
          flex: 1,
          fontSize: 14,
          fontFamily: Fonts.regular,
          backgroundColor: 'transparent',
          height: 42,
          marginLeft: 4,
        },
        selectAllButton: {
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: Theme.neutral[100],
        },
        selectAllText: {
          fontSize: 13,
          fontFamily: Fonts.semiBold,
          fontWeight: '600',
          color: Theme.primary[500],
        },
        selectedBar: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: Theme.primary[50],
          borderRadius: 10,
          gap: 6,
        },
        selectedText: {
          flex: 1,
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: Theme.primary[600] || Theme.primary[500],
        },
        clearText: {
          fontSize: 12,
          fontFamily: Fonts.semiBold,
          fontWeight: '600',
          color: '#EF4444',
        },
        list: {
          flex: 1,
          marginTop: 8,
        },
        listContent: {
          paddingHorizontal: 20,
          paddingBottom: 12,
        },
        recipientRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 12,
          marginVertical: 3,
          borderRadius: 12,
          backgroundColor: Theme.colors.background.card,
          borderWidth: 1,
          borderColor: Theme.neutral[100],
        },
        recipientRowSelected: {
          backgroundColor: Theme.primary[50],
          borderColor: Theme.primary[200],
        },
        avatar: {
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: Theme.neutral[200],
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        avatarSelected: {
          backgroundColor: Theme.primary[500],
        },
        avatarText: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: Theme.neutral[600],
        },
        avatarTextSelected: {
          color: '#FFF',
        },
        recipientInfo: {
          flex: 1,
        },
        recipientName: {
          fontSize: 14,
          fontFamily: Fonts.semiBold,
          fontWeight: '600',
          color: Theme.neutral[800],
        },
        recipientPhone: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: Theme.neutral[400],
          marginTop: 1,
        },
        checkbox: {
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: Theme.neutral[300],
          justifyContent: 'center',
          alignItems: 'center',
        },
        checkboxSelected: {
          backgroundColor: Theme.primary[500],
          borderColor: Theme.primary[500],
        },
        emptyContainer: {
          alignItems: 'center',
          paddingVertical: 48,
          gap: 12,
        },
        emptyText: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: Theme.neutral[400],
          textAlign: 'center',
          maxWidth: 240,
        },
      }),
    [],
  );
