export const runBatch = (
  ids: string[],
  execute: (id: string, callbacks: { onSuccess: () => void; onError: () => void }) => void,
  onComplete: (errors: number) => void,
) => {
  let completed = 0;
  let errors = 0;
  const check = () => { if (completed + errors === ids.length) onComplete(errors); };
  ids.forEach((id) =>
    execute(id, { onSuccess: () => { completed++; check(); }, onError: () => { errors++; check(); } }),
  );
};
