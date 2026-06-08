/**
 * SegmentTabs — pill segmented control used to split the detail screen into
 * focused sections (Itinéraire / Sacs / Marchandises) so only one list shows
 * at a time. This removes the old "endless stack of cards" and the nested
 * FlashList-in-ScrollView problem.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export interface SegmentTab {
  key: string;
  label: string;
  icon?: MaterialIconName;
  count?: number;
}

interface SegmentTabsProps {
  tabs: SegmentTab[];
  active: string;
  onChange: (key: string) => void;
}

export const SegmentTabs: React.FC<SegmentTabsProps> = ({ tabs, active, onChange }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.paper }]}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.85}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isActive && { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            {tab.icon && (
              <MaterialCommunityIcons
                name={tab.icon}
                size={15}
                color={isActive ? colors.primary.main : colors.text.secondary}
              />
            )}
            <Text
              style={[styles.label, { color: isActive ? colors.text.primary : colors.text.secondary }]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
            {typeof tab.count === 'number' && (
              <View
                style={[
                  styles.countPill,
                  { backgroundColor: isActive ? colors.primary.main : colors.neutral[300] },
                ]}
              >
                <Text style={[styles.countText, { color: isActive ? colors.text.inverse : colors.text.secondary }]}>
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', borderRadius: 12, padding: 4, gap: 4 },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 9,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  label: { fontSize: 13, fontWeight: '700' },
  countPill: { minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' },
  countText: { fontSize: 11, fontWeight: '800' },
});

export default SegmentTabs;
