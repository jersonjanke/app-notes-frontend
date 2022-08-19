import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pages } from 'utils/pages';
import { cookies, keys } from 'utils/cookies';

export default function withAuthPage(PageComponent: React.FC) {
  const WrappedPageComponent = () => {
    const router = useRouter();
    const token = cookies.get(keys.user);

    useEffect(() => {
      if (!token) {
        cookies.remove(keys.user);
        router.push(pages.root);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <PageComponent {...PageComponent.defaultProps} />;
  };
  return WrappedPageComponent;
}
