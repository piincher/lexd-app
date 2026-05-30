import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Menu, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from '../GoodsDetailScreen.styles';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Goods } from '../../../types';
import { getStatusConfig } from '../../../components/GoodsCardStatus';
import { getVariantColors } from '../../../components/statusVariant';
import { shareLink, adminGoodsDetailLink } from '@src/shared/lib/shareLink';

interface GoodsDetailHeaderProps {
  goods: Goods;
  container: any;
  hasContainers: boolean;
  hasAirwayBills: boolean;
  menuVisible: boolean;
  onMenuToggle: (visible: boolean) => void;
  onStatusUpdate: (status: string) => void;
  onAssignPress: () => void;
  onUnassignPress: () => void;
  canUnassign: boolean;
  onDelete: () => void;
  onBack: () => void;
  /** When set, the menu shows "Assigner un client" for goods with no client yet. */
  onAssignClientPress?: () => void;
  isOwnerUnidentified?: boolean;
  /** When set + the goods has a client, the menu shows a "Renvoyer notification WhatsApp" item. */
  onResendNotification?: () => void;
  isResendingNotification?: boolean;
}

export const GoodsDetailHeader: React.FC<GoodsDetailHeaderProps> = ({
  goods,
  hasContainers,
  hasAirwayBills,
  menuVisible,
  onMenuToggle,
  onStatusUpdate,
  onAssignPress,
  onUnassignPress,
  canUnassign,
  onDelete,
  onBack,
  onAssignClientPress,
  isOwnerUnidentified,
  onResendNotification,
  isResendingNotification,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  // react-native-paper's Menu does NOT auto-dismiss on item press in this version —
  // tapping an item leaves `menuVisible` stuck at true. When an action then opens an
  // Alert and the operator dismisses it, the next tap on the three-dot anchor calls
  // `onMenuToggle(true)` on already-true state → no-op → menu appears broken on the
  // third tap. `withClose` makes every item explicitly close the menu before running
  // its handler so the state never gets stuck.
  const withClose = (fn?: () => void) => () => {
    onMenuToggle(false);
    fn?.();
  };

  const isAir = goods.shippingMode === 'AIR';
  // Recolor the header by shipping mode — matches the goods list (sea = ocean, air = violet).
  const headerGradient = isAir ? Theme.gradients.purple : Theme.gradients.ocean;
  const status = getStatusConfig(goods.status);
  const statusDot = getVariantColors(status.variant, colors).dot;

  return (
    <LinearGradient colors={headerGradient} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerPillRow}>
          <Menu
            visible={menuVisible}
            onDismiss={() => onMenuToggle(false)}
            anchor={
              <TouchableOpacity onPress={() => onMenuToggle(true)} style={styles.iconButton}>
                <Ionicons name="ellipsis-vertical" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={withClose(() =>
                shareLink({
                  message: `Marchandise ${goods.goodsId}`,
                  url: adminGoodsDetailLink(goods.goodsId),
                  title: 'Partager la marchandise',
                }),
              )}
              title="Partager le lien"
              leadingIcon="share-variant"
            />
            {isOwnerUnidentified && onAssignClientPress && (
              <Menu.Item
                onPress={withClose(onAssignClientPress)}
                title="Assigner un client"
                leadingIcon="account-search"
              />
            )}
            {goods.status === 'RECEIVED_AT_WAREHOUSE' && (
              <Menu.Item
                onPress={withClose(onAssignPress)}
                title={isAir ? 'Assigner à la lettre de transport' : 'Assigner au conteneur'}
                disabled={isAir ? !hasAirwayBills : !hasContainers}
              />
            )}
            {canUnassign && (
              <Menu.Item
                onPress={withClose(onUnassignPress)}
                title="Retirer de la lettre de transport"
                titleStyle={{ color: colors.status.error }}
              />
            )}
            <Menu.Item
              onPress={withClose(() => onStatusUpdate('READY_FOR_PICKUP'))}
              title="Prêt pour retrait"
            />
            {/* Operator can re-trigger the customer notification when the original
                dispatch failed (visible in the receive success badge / NotificationLog). */}
            {onResendNotification && !isOwnerUnidentified && (
              <Menu.Item
                onPress={withClose(onResendNotification)}
                title={isResendingNotification ? 'Envoi en cours…' : 'Renvoyer notification WhatsApp'}
                leadingIcon="whatsapp"
                disabled={!!isResendingNotification}
              />
            )}
            <Divider />
            <Menu.Item
              onPress={withClose(onDelete)}
              title="Supprimer"
              titleStyle={{ color: colors.status.error }}
            />
          </Menu>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.headerContent}>
        <View style={styles.goodsIdBadge}>
          <MaterialCommunityIcons name="package-variant" size={20} color="#FFFFFF" style={styles.badgeIcon} />
          <Text style={styles.goodsIdText}>{goods.goodsId}</Text>
        </View>
        <View style={styles.statusWrapper}>
          <View style={styles.headerPill}>
            <Ionicons name={isAir ? 'airplane' : 'boat'} size={13} color="#FFFFFF" />
            <Text style={styles.headerPillText}>{isAir ? 'Aérien' : 'Maritime'}</Text>
          </View>
          <View style={styles.headerPill}>
            <View style={[styles.headerPillDot, { backgroundColor: statusDot }]} />
            <Text style={styles.headerPillText}>{status.label}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
