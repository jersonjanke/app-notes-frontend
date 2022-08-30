import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pages } from 'utils/pages';
import { cookies, keys } from 'utils/cookies';
import { useDispatch } from 'react-redux';
import { userUpdate } from 'store/actions/user';
import { toastMSG } from 'utils/toast';

export default function withAuthPage(PageComponent: React.FC) {
  const WrappedPageComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      const user = cookies.get(keys.user);
      if (!user) {
        cookies.remove(keys.user);
        router.push(pages.root);
        return toastMSG('Token inválido!', 'error');
      } else {
        const payload = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = payload.token;
        dispatch(userUpdate(payload));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <PageComponent {...PageComponent.defaultProps} />;
  };
  return WrappedPageComponent;
}
