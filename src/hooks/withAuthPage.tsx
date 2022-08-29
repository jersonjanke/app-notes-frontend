import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pages } from 'utils/pages';
import { cookies, keys } from 'utils/cookies';
import { useDispatch } from 'react-redux';
import { userUpdate } from 'store/actions/user';

export default function withAuthPage(PageComponent: React.FC) {
  const WrappedPageComponent = () => {
    const router = useRouter();
    const token = cookies.get(keys.user);
    const dispatch = useDispatch();

    useEffect(() => {
      const payload = JSON.parse(cookies.get(keys.user));
      axios.defaults.headers.common['Authorization'] = payload.token;
      dispatch(userUpdate(payload));

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
