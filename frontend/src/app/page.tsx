import { redirect } from 'next/navigation';
import { defaultLocale } from '~/i18n';

// Root page that redirects to default locale
const RootPage = () => {
  redirect(`/${defaultLocale}`);
};

export default RootPage;