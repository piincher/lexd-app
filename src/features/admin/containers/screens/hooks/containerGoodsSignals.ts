import type { Goods, ClientInfo, GoodsClientDisplayInfo } from '../../../goods/types';
import type { ContainerClientDirectory, ContainerClientProfile } from './containerAssistTypes';

type GoodsClientHints = Goods & { client?: GoodsClientDisplayInfo | null };

const getClient = (goods: Goods): (ClientInfo & { phone?: string }) | null =>
  goods.clientId && typeof goods.clientId === 'object' ? goods.clientId : null;

const getDirectoryProfile = (
  goods: GoodsClientHints,
  directory?: ContainerClientDirectory,
): ContainerClientProfile | null => {
  if (!directory) return null;
  const clientId = typeof goods.clientId === 'string' ? goods.clientId : getClient(goods)?._id;
  return (
    directory.byGoodsId[goods._id] ||
    directory.byGoodsId[goods.goodsId] ||
    (clientId ? directory.byClientId[clientId] : undefined) ||
    null
  );
};

export const getClientName = (goods: GoodsClientHints, directory?: ContainerClientDirectory) => {
  const client = getClient(goods);
  const hintedName = goods.clientName || goods.client?.name || getDirectoryProfile(goods, directory)?.clientName;
  if (!client && hintedName) return hintedName;
  if (!client) return 'Client inconnu';
  return `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.phoneNumber || client.phone || 'Client';
};

export const getClientPhone = (goods: GoodsClientHints, directory?: ContainerClientDirectory) =>
  getClient(goods)?.phoneNumber ||
  getClient(goods)?.phone ||
  goods.clientPhone ||
  goods.client?.phone ||
  goods.client?.phoneNumber ||
  getDirectoryProfile(goods, directory)?.clientPhone ||
  '';

export const getClientKey = (goods: GoodsClientHints, directory?: ContainerClientDirectory) => {
  const client = getClient(goods);
  const directoryProfile = getDirectoryProfile(goods, directory);
  return client?._id || (typeof goods.clientId === 'string' ? goods.clientId : '') || directoryProfile?.clientId || goods.client?.id || goods.client?._id || 'unknown';
};

export const hasClientDisplayDetails = (goods: GoodsClientHints) =>
  !!(
    (goods.clientId && typeof goods.clientId === 'object') ||
    goods.clientName ||
    goods.client?.name ||
    goods.client?.firstName ||
    goods.client?.lastName ||
    goods.clientPhone ||
    goods.client?.phone ||
    goods.client?.phoneNumber
  );

export const isUnpaid = (goods: Goods) =>
  goods.paymentStatus !== 'PAID' || (goods.amountPaid || 0) < (goods.totalCost || 0);

export const isUnidentified = (goods: GoodsClientHints, directory?: ContainerClientDirectory) =>
  goods.ownerStatus === 'UNIDENTIFIED' || (!goods.clientId && !getDirectoryProfile(goods, directory) && !goods.clientName && !goods.client);

export const isDamaged = (goods: Goods) =>
  goods.condition === 'damaged' ||
  !!goods.intakeException?.isException ||
  !!goods.intakeException?.reasons?.includes('DAMAGED');

export const missingLocation = (goods: Goods) => !goods.warehouseLocation?.trim();

export const missingPhone = (goods: GoodsClientHints, directory?: ContainerClientDirectory) =>
  !isUnidentified(goods, directory) && !getClientPhone(goods, directory);

export const missingQr = (goods: Goods) => !goods.qrCodeData && !goods.qrCodeImageUrl;

export const missingPhoto = (goods: Goods) => !(goods.photos?.length || goods.images?.length);

export const hasGoodsIssue = (goods: GoodsClientHints, directory?: ContainerClientDirectory) =>
  isUnpaid(goods) ||
  isUnidentified(goods, directory) ||
  isDamaged(goods) ||
  missingLocation(goods) ||
  missingPhone(goods, directory) ||
  missingQr(goods) ||
  missingPhoto(goods);
