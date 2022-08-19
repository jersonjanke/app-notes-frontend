import { useRouter } from 'next/router';
import { cookies, keys } from 'utils/cookies';
import { pages } from 'utils/pages';

export const useLogout = () => {
  const router = useRouter();

  return () => {
    cookies.remove(keys.user);
    router.push(pages.root);
  };
};
