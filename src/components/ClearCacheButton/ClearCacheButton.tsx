import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

function ClearCacheButton() {
  const queryClient = useQueryClient();
  const t = useTranslations('ClearCacheButton');

  function handleClearCache() {
    queryClient.removeQueries({ queryKey: ['dataRequest'] });
  }

  return <button onClick={handleClearCache}>{t('btnName')}</button>;
}

export default ClearCacheButton;
