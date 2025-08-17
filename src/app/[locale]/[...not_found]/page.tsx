import { useTranslations } from 'next-intl';

function NotFound() {
  const t = useTranslations('NotFound');
  return <p>{t('text')}</p>;
}

export default NotFound;
