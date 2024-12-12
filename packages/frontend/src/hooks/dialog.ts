import { useRouter } from 'next/router';
import * as React from 'react';

export const useDialog = () => {
  const router = useRouter();

  const handleDialogSelect = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['form']>>(async (e) => {
    const { submitter } = e.nativeEvent as unknown as { submitter: HTMLElementTagNameMap['button'] };
    e.preventDefault();
    const { [submitter.name]: _dialog, ...etcQuery } = router.query;

    await router.push({
      query: {
        ...etcQuery,
        [submitter.name]: submitter.value,
      },
    });
  }, [router]);

  const currentOpenDialogId = React.useMemo(() => router.query.dialog, [router.query.dialog]);

  return React.useMemo(() => ({
    handleDialogSelect,
    currentOpenDialogId,
  }), [
    handleDialogSelect,
    currentOpenDialogId,
  ]);
};
