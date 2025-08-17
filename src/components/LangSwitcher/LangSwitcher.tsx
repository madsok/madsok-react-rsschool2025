import { useRouter, usePathname } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Lang');
  return (
    <>
      <div>
        <button onClick={() => router.push({ pathname }, { locale: 'en' })}>
          {t('en')}
        </button>
        <button onClick={() => router.push({ pathname }, { locale: 'ru' })}>
          {t('ru')}
        </button>
      </div>
    </>
  );
}

export default LangSwitcher;
