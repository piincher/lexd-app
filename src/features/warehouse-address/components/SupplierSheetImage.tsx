import React, { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { WarehouseAddress } from '../types';
import type { SupplierIdentity } from '../hooks/useSupplierIdentity';

interface Props {
  address: WarehouseAddress;
  identity: SupplierIdentity;
}

const MODE_LABEL = {
  AIR: '空运 · FRET AÉRIEN',
  SEA: '海运 · FRET MARITIME',
} as const;

const SheetRow: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, highlight && styles.highlight]}>{value || '—'}</Text>
  </View>
);

export const SupplierSheetImage = forwardRef<View, Props>(({ address, identity }, ref) => {
  const contact = address.contactWhatsApp || address.contactWeChat;

  return (
    <View ref={ref} collapsable={false} style={styles.sheet}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>LEXD</Text>
          <Text style={styles.kicker}>供应商收货单 · FICHE FOURNISSEUR</Text>
        </View>
        <View style={styles.modeBadge}><Text style={styles.modeText}>{MODE_LABEL[address.mode]}</Text></View>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>收货地址 · ADRESSE DE RÉCEPTION</Text>
        <View style={styles.details}>
          <SheetRow label="公司 · Société" value={address.companyName || 'LEXD'} />
          <SheetRow label="入仓号 · N° entrepôt" value={address.warehouseCode} highlight />
          <SheetRow label="收件人 · Destinataire" value={address.recipientName} />
          <SheetRow label="电话 · Téléphone" value={address.phone} />
          <SheetRow label="详细地址 · Adresse" value={address.addressDetail} />
          {!!address.postalCode && <SheetRow label="邮编 · Code postal" value={address.postalCode} />}
          {!!contact && <SheetRow label="WhatsApp / WeChat" value={contact} />}
        </View>

        <View style={styles.clientBox}>
          <Text style={styles.clientTitle}>客户编号 · VOTRE ID CLIENT</Text>
          <Text style={styles.clientId}>{identity.clientId || '____________________________'}</Text>
          {!!identity.customerName && <Text style={styles.clientDetail}>{identity.customerName}</Text>}
          {!!identity.phone && <Text style={styles.clientDetail}>{identity.phone}</Text>}
          <Text style={styles.clientHint}>Le fournisseur doit recopier cet ID lisiblement sur chaque colis.</Text>
        </View>

        <View style={styles.warning}>
          <Text style={styles.warningZh}>每个包裹必须注明入仓号和客户编号。</Text>
          <Text style={styles.warningFr}>Chaque colis doit porter le N° d’entrepôt et votre ID client.</Text>
        </View>
        {!!address.note && <Text style={styles.note}>{address.note}</Text>}
      </View>

      <View style={styles.footer}><Text style={styles.footerText}>LEXD · Fiche générée depuis l’application</Text></View>
    </View>
  );
});

SupplierSheetImage.displayName = 'SupplierSheetImage';

const styles = StyleSheet.create({
  sheet: { width: 360, backgroundColor: '#F2F8F4', borderWidth: 4, borderColor: '#064E2C' },
  header: { minHeight: 88, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, backgroundColor: '#FFFFFF', borderBottomWidth: 7, borderBottomColor: '#F5C518', padding: 14 },
  brand: { color: '#14231C', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  kicker: { color: '#5B6B62', fontSize: 8, fontWeight: '700', marginTop: 3 },
  modeBadge: { maxWidth: 112, borderRadius: 10, backgroundColor: '#0B6B3A', paddingHorizontal: 8, paddingVertical: 9 },
  modeText: { color: '#FFFFFF', fontSize: 10, lineHeight: 14, fontWeight: '900', textAlign: 'center' },
  body: { padding: 14, gap: 12 },
  sectionTitle: { borderRadius: 8, backgroundColor: '#064E2C', color: '#FFFFFF', fontSize: 12, fontWeight: '900', paddingHorizontal: 12, paddingVertical: 9 },
  details: { borderWidth: 1, borderColor: '#D8E8DD', borderRadius: 10, backgroundColor: '#FFFFFF', paddingHorizontal: 11 },
  row: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#D8E8DD', paddingVertical: 8, gap: 3 },
  label: { color: '#5B6B62', fontSize: 8, fontWeight: '800', textTransform: 'uppercase' },
  value: { color: '#14231C', fontSize: 13, lineHeight: 18, fontWeight: '700' },
  highlight: { color: '#0B6B3A', fontSize: 21, lineHeight: 25, fontWeight: '900', letterSpacing: 0.5 },
  clientBox: { borderWidth: 2, borderColor: '#F5C518', borderRadius: 10, backgroundColor: '#FFF9DE', padding: 12 },
  clientTitle: { color: '#14231C', fontSize: 11, fontWeight: '900' },
  clientId: { color: '#0B6B3A', fontSize: 18, fontWeight: '900', marginTop: 4 },
  clientDetail: { color: '#14231C', fontSize: 10, lineHeight: 14, fontWeight: '700', marginTop: 2 },
  clientHint: { color: '#5B6B62', fontSize: 9, lineHeight: 13, fontWeight: '600', marginTop: 4 },
  warning: { borderRadius: 10, backgroundColor: '#A90F0F', padding: 11, gap: 3 },
  warningZh: { color: '#FFFFFF', fontSize: 12, fontWeight: '900', textAlign: 'center' },
  warningFr: { color: '#FFFFFF', fontSize: 10, lineHeight: 14, fontWeight: '700', textAlign: 'center' },
  note: { color: '#7A3E00', backgroundColor: '#FFF3D6', borderRadius: 8, padding: 10, fontSize: 9, lineHeight: 13, fontWeight: '700' },
  footer: { backgroundColor: '#064E2C', padding: 10 },
  footerText: { color: '#FFFFFF', fontSize: 8, fontWeight: '700', textAlign: 'center' },
});
