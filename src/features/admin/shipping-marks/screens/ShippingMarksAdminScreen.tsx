import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { showMessage } from 'react-native-flash-message';
import { Screen } from '@src/shared/ui/Screen';
import { Loading } from '@src/shared/ui/Loading';
import { Button } from '@src/shared/ui/Button';
import { shareShippingMark } from '@src/shared/lib/shippingMarkShare';
import { useShippingMarksAdmin } from '../hooks/useShippingMarksAdmin';
import { useShippingMarkConfig } from '../hooks/useShippingMarkConfig';
import { ClientSearchBar } from '../components/ClientSearchBar';
import { BulkSendModal } from '../components/BulkSendModal';
import { BulkActions } from '../components/BulkActions';
import { ShippingMarkConfigForm } from '../components/ShippingMarkConfigForm';
import { ClientsList } from '../components/ClientsList';
import { ClientShippingMarkPreviewModal } from '../components/ClientShippingMarkPreviewModal';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';

const DEFAULT_SINGLE_SEND_CAPTION =
  "Bonjour {{name}}, voici votre marque d'expédition. Merci de l'envoyer à votre fournisseur avec l'adresse de l'entrepôt. Le fournisseur doit l'imprimer et la coller sur chaque colis.";

export const ShippingMarksAdminScreen: React.FC<RootStackScreenProps<'ShippingMarksAdmin'>> = ({ route }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [sendAll, setSendAll] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [previewClient, setPreviewClient] = useState<ShippingMarkClient | null>(null);

  const {
    clients,
    pagination,
    isLoading,
    isFetching,
    updateSearch,
    goToPage,
    regenerateMark,
    isRegenerating,
    sendBulkWhatsApp,
    isSendingBulk,
    searchQuery,
    toggleClientSelection,
  } = useShippingMarksAdmin(route.params?.q);

  const { config, isLoading: configLoading, updateConfig, isUpdating } = useShippingMarkConfig();

  const handleSend = async (caption: string) => {
    if (sendAll) {
      await sendBulkWhatsApp({ all: true, q: searchQuery, caption });
    } else {
      await sendBulkWhatsApp({ userIds: Array.from(selected), caption });
    }
    setShowModal(false);
    setSendAll(false);
    setSelected(new Set());
  };

  const handleDownload = async (client: ShippingMarkClient) => {
    if (!client.shippingMarkImageUrl) return;
    try {
      await shareShippingMark(client.shippingMarkImageUrl, client.clientId);
    } catch (error) {
      showMessage({
        message: 'Téléchargement impossible',
        description: error instanceof Error ? error.message : 'Impossible de télécharger la marque.',
        type: 'danger',
      });
    }
  };

  const handleSendOne = async (client: ShippingMarkClient) => {
    try {
      await sendBulkWhatsApp({
        userIds: [client._id],
        caption: DEFAULT_SINGLE_SEND_CAPTION,
      });

      showMessage({
        message: 'Envoi programmé',
        description: `La marque ${client.clientId} est en file d'envoi WhatsApp.`,
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur WhatsApp',
        description: error instanceof Error ? error.message : "Impossible d'envoyer la marque.",
        type: 'danger',
      });
    }
  };

  if (isLoading || configLoading) return <Loading message="Chargement..." fullScreen />;

  return (
    <Screen header={{ title: "Marques d'expédition" }} scrollable={false} contentStyle={styles.screenContent}>
      <View style={styles.container}>
        <Button
          title={showSettings ? 'Masquer les paramètres' : 'Paramètres de la marque'}
          icon="settings-outline"
          variant="outline"
          onPress={() => setShowSettings((visible) => !visible)}
          style={styles.settingsButton}
        />
        {showSettings && <ShippingMarkConfigForm config={config} onSave={updateConfig} isSaving={isUpdating} />}
        <ClientSearchBar onSearch={updateSearch} loading={isFetching} />
        <BulkActions
          selectedCount={selected.size}
          total={pagination?.total}
          onSendSelected={() => {
            setSendAll(false);
            setShowModal(true);
          }}
          onSendAll={() => {
            setSendAll(true);
            setShowModal(true);
          }}
        />
        <ClientsList
          clients={clients}
          selected={selected}
          onToggle={(id) => setSelected(toggleClientSelection(selected, id))}
          onToggleAll={() =>
            setSelected(selected.size === clients.length ? new Set() : new Set(clients.map((c) => c._id)))
          }
          onPreview={setPreviewClient}
          onDownload={(client) => {
            void handleDownload(client);
          }}
          onSend={(client) => {
            void handleSendOne(client);
          }}
          onRegenerate={regenerateMark}
          isRegenerating={isRegenerating}
          isSending={isSendingBulk}
          page={pagination?.page}
          pages={pagination?.pages}
          hasPrev={pagination?.hasPrev}
          hasNext={pagination?.hasNext}
          onPageChange={goToPage}
        />
      </View>
      <BulkSendModal
        visible={showModal}
        count={sendAll ? pagination?.total ?? 0 : selected.size}
        onClose={() => {
          setShowModal(false);
          setSendAll(false);
        }}
        onSend={handleSend}
        isSending={isSendingBulk}
      />
      <ClientShippingMarkPreviewModal
        visible={Boolean(previewClient)}
        client={previewClient}
        isSending={isSendingBulk}
        isRegenerating={isRegenerating}
        onClose={() => setPreviewClient(null)}
        onDownload={(client) => {
          void handleDownload(client);
        }}
        onSend={(client) => {
          void handleSendOne(client);
        }}
        onRegenerate={regenerateMark}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  settingsButton: {
    marginBottom: 12,
  },
});
