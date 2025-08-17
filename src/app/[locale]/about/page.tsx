import { useTranslations } from 'next-intl';

function About() {
  const t = useTranslations('About');
  return (
    <>
      <p>{t('name')}</p>
      <a href="https://rs.school/courses/reactjs">{t('course')}</a>
    </>
  );
}

export default About;
