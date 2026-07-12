import { act, renderHook } from '@testing-library/react-native';
import { useAtRiskScreen } from '../useAtRiskScreen';

jest.mock('@src/shared/lib/openWhatsApp', () => ({ openWhatsApp: jest.fn() }));

describe('useAtRiskScreen', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('builds debounced server-side search, filter, and pagination parameters', () => {
    const triggerWinBack = jest.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useAtRiskScreen(triggerWinBack));

    expect(result.current.queryParams).toMatchObject({ days: 60, page: 1, limit: 20, risk: 'all' });

    act(() => result.current.setPage(3));
    expect(result.current.queryParams.page).toBe(3);

    act(() => result.current.setSearch(' Awa '));
    expect(result.current.queryParams.page).toBe(1);
    expect(result.current.queryParams.q).toBeUndefined();

    act(() => jest.advanceTimersByTime(350));
    expect(result.current.queryParams.q).toBe('Awa');

    act(() => result.current.setActiveFilter('90'));
    expect(result.current.queryParams).toMatchObject({ page: 1, risk: '90', q: 'Awa' });
  });
});
