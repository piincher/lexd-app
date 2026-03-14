export const goodsQueryKeys = {
  all: ['goods'] as const,
  detail: (id: string) => ['goods', id] as const,
};
export default goodsQueryKeys;
