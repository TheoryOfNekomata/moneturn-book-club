import * as React from 'react';
import { useRouter } from 'next/router';

export interface UseEditorArgs {
  itemIdQueryKey: string;
  saveFn?: React.FormEventHandler<HTMLElementTagNameMap['form']>;
  deleteFn?: React.FormEventHandler<HTMLElementTagNameMap['form']>;
}

export const useEditor = ({ itemIdQueryKey, saveFn, deleteFn }: UseEditorArgs) => {
  const router = useRouter();
  const currentItemId = React.useMemo(() => router.query[itemIdQueryKey] as string, [router.query[itemIdQueryKey]]);
  const handleAction = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['form']>>(async (e) => {
    e.preventDefault();
    const { submitter } = e.nativeEvent as { submitter: HTMLElementTagNameMap['button'] };

    if (submitter.name !== 'action') {
      return;
    }

    switch (submitter.value) {
      case 'cancel': {
        const { dialog: _, ...etcQuery } = router.query;
        await router.replace({
          query: etcQuery,
        });
        return;
      }
      case 'save': {
        await saveFn?.(e);
        const { dialog: _, ...etcQuery } = router.query;
        await router.replace({
          query: etcQuery,
        });
        return;
      }
      case 'delete': {
        await deleteFn?.(e);
        await router.replace({
          pathname: '/',
        });
        return;
      }
    }
  }, []);

  return React.useMemo(() => ({
    currentItemId,
    handleAction,
  }), [
    currentItemId,
    handleAction,
  ]);
};
