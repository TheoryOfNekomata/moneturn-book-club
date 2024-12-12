import React from 'react';
import { useRouter } from 'next/router';

export const useBackNavigation = () => {
  const router = useRouter();
  const handleBack = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['form']>>((e) => {
    e.preventDefault();
    router.back();
  }, [router]);

  return React.useMemo(() => ({
    handleBack,
  }), [handleBack]);
};
