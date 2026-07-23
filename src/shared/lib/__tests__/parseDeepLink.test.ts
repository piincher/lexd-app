import { parseDeepLink } from '../parseDeepLink';

describe('parseDeepLink', () => {
  describe('URL prefixes', () => {
    it('parses the lexd:// custom scheme', () => {
      expect(parseDeepLink('lexd://tracking/ABC123')).toEqual({
        screen: 'ContainerTracking',
        params: { containerId: 'ABC123' },
      });
    });

    // These four must keep working: they are the hosts declared in app.json's
    // associatedDomains. A mismatch here means universal links dead-end.
    it.each([
      'https://lexdservices.com/tracking/ABC123',
      'https://www.lexdservices.com/tracking/ABC123',
      'http://lexdservices.com/tracking/ABC123',
      'http://www.lexdservices.com/tracking/ABC123',
    ])('parses the universal link %s', (url) => {
      expect(parseDeepLink(url)).toEqual({
        screen: 'ContainerTracking',
        params: { containerId: 'ABC123' },
      });
    });

    it('routes a bare link to the tab host', () => {
      expect(parseDeepLink('lexd://')).toEqual({ screen: 'HomeTab', params: undefined });
      expect(parseDeepLink('https://www.lexdservices.com/')).toEqual({
        screen: 'HomeTab',
        params: undefined,
      });
    });
  });

  describe('merged shipment tabs', () => {
    // Orders / MyGoods / MyContainers are no longer tabs. Links already sent to
    // customers still use these paths, so all three must land on Shipments
    // rather than navigating to a route that no longer exists.
    it.each(['containers', 'goods-list', 'orders'])(
      'routes the legacy /%s path to the unified Shipments tab',
      (segment) => {
        expect(parseDeepLink(`lexd://${segment}`)).toEqual({
          screen: 'HomeTab',
          params: { screen: 'Shipments' },
        });
      },
    );

    it('still routes the surviving tabs to themselves', () => {
      expect(parseDeepLink('lexd://home')).toEqual({
        screen: 'HomeTab',
        params: { screen: 'Home' },
      });
      expect(parseDeepLink('lexd://dashboard')).toEqual({
        screen: 'HomeTab',
        params: { screen: 'CustomerDashboard' },
      });
      expect(parseDeepLink('lexd://profile')).toEqual({
        screen: 'HomeTab',
        params: { screen: 'Profile' },
      });
    });
  });

  describe('resource links', () => {
    it('routes a single goods item to its detail screen', () => {
      expect(parseDeepLink('lexd://goods/G-42')).toEqual({
        screen: 'GoodsDetail',
        params: { goodsId: 'G-42' },
      });
    });

    it('distinguishes goods sub-routes', () => {
      expect(parseDeepLink('lexd://goods/new')).toEqual({ screen: 'ScanQR', params: {} });
      expect(parseDeepLink('lexd://goods/G-42/edit')).toEqual({
        screen: 'EditGoods',
        params: { goodsId: 'G-42' },
      });
    });

    it('routes a shared tracking token', () => {
      expect(parseDeepLink('lexd://s/tok123')).toEqual({
        screen: 'SharedShipment',
        params: { token: 'tok123' },
      });
    });

    it('routes packing and loading lists', () => {
      expect(parseDeepLink('lexd://packing/C-1')).toEqual({
        screen: 'ClientPackingList',
        params: { containerId: 'C-1' },
      });
      expect(parseDeepLink('lexd://loading/C-1')).toEqual({
        screen: 'ClientLoadingList',
        params: { containerId: 'C-1' },
      });
    });
  });

  describe('query strings', () => {
    it('merges decoded query params', () => {
      expect(parseDeepLink('lexd://order/O-1?ref=Bamako%20Warehouse')).toEqual({
        screen: 'OrderDetail',
        params: { id: 'O-1', ref: 'Bamako Warehouse' },
      });
    });

    it('ignores malformed pairs rather than throwing', () => {
      const result = parseDeepLink('lexd://faq?broken&ok=1');
      expect(result).toEqual({ screen: 'FAQ', params: { ok: '1' } });
    });
  });

  describe('admin links', () => {
    it('flags admin destinations so the guard can reject non-admins', () => {
      expect(parseDeepLink('lexd://admin/dashboard')).toEqual({
        screen: 'HomeTab',
        params: { screen: 'AdminDashBoard' },
        requiresAdmin: true,
      });
    });

    it('does not flag customer destinations as admin', () => {
      expect(parseDeepLink('lexd://orders')?.requiresAdmin).toBeUndefined();
    });
  });

  it('returns null for an unrecognized route', () => {
    expect(parseDeepLink('lexd://not-a-real-route')).toBeNull();
  });
});
