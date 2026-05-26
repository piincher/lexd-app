import type { ContainerClientDirectory, ContainerClientProfile } from './containerAssistTypes';

type LooseRecord = Record<string, unknown>;

const emptyDirectory = (): ContainerClientDirectory => ({ byClientId: {}, byGoodsId: {} });

const asRecord = (value: unknown): LooseRecord =>
  value && typeof value === 'object' ? value as LooseRecord : {};

const getArray = (value: unknown, key: string): LooseRecord[] => {
  const maybeArray = asRecord(value)[key];
  return Array.isArray(maybeArray) ? maybeArray.map(asRecord) : [];
};

const normalizeResponse = (response: unknown) => {
  const apiData = asRecord(response).data;
  return asRecord(apiData).data || apiData || response;
};

const makeProfile = (clientId: unknown, name: unknown, phone: unknown): ContainerClientProfile | null => {
  const clientName = typeof name === 'string' ? name.trim() : '';
  const lowerName = clientName.toLowerCase();
  if (!clientName || lowerName === 'unknown' || lowerName === 'client inconnu') return null;

  const clientPhone = typeof phone === 'string' && phone.trim().toLowerCase() !== 'n/a'
    ? phone.trim()
    : '';

  return {
    clientId: `${clientId || clientName}`.trim(),
    clientName,
    clientPhone,
  };
};

const putProfile = (
  directory: ContainerClientDirectory,
  profile: ContainerClientProfile | null,
  goodsValue: unknown,
) => {
  if (!profile) return;
  const goods = asRecord(goodsValue);
  if (profile.clientId) directory.byClientId[profile.clientId] = profile;
  const goodsKeys = [goods._id, goods.id, goods.goodsId].filter(Boolean);
  goodsKeys.forEach((key) => {
    directory.byGoodsId[`${key}`] = profile;
  });
};

export const buildContainerClientDirectory = (packingListResponse: unknown): ContainerClientDirectory => {
  const directory = emptyDirectory();
  const data = normalizeResponse(packingListResponse);

  getArray(data, 'clients').forEach((client) => {
    const profile = makeProfile(client.clientId, client.clientName, client.clientPhone);
    getArray(client, 'goods').forEach((goods) => putProfile(directory, profile, goods));
    if (profile) directory.byClientId[profile.clientId] = profile;
  });

  getArray(data, 'goods').forEach((goods) => {
    const client = asRecord(goods.client);
    const profile = makeProfile(
      client.id || client._id || goods.clientId,
      goods.clientName || client.name,
      goods.clientPhone || client.phone || client.phoneNumber,
    );
    putProfile(directory, profile, goods);
  });

  return directory;
};
