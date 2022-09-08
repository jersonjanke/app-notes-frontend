import { NextPage } from 'next';
import { primary } from 'utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setConfig } from 'store/actions/config';
import { StoreData, User } from 'types/Login';
import { userUpdate } from 'store/actions/user';
import Switch from 'react-switch';
import Flex from '../../components/Flex';
import Title from '../../components/Title';
import { useCallback, useEffect, useState } from 'react';
import SettingsService, { SettingsData } from 'services/SettingsService';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import Back from 'components/Back';
import { cookies, keys } from 'utils/cookies';
import withAuthPage from 'hooks/withAuthPage';
import Head from 'next/head';
import Loading from '@/components/Loading';

const SettingsPage: NextPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const fetchCreateSettings = useCallback(() => {
    const user = cookies.get(keys.user) as unknown as User;
    setLoader(true);
    SettingsService.createSettings({
      autoplay: false,
      microphone: false,
      email: user.email,
    }).then((response) => {
      setSettings(response[response.length - 1]);
      setLoader(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.user?.email]);

  const getSettings = useCallback(
    (email: string) => {
      setLoader(true);
      SettingsService.getSettings(email).then((response) => {
        if (response.length > 0) {
          setSettings(response[response.length - 1]);
          dispatch(setConfig(response[response.length - 1]));
          setLoader(false);
        } else {
          setLoader(false);
          fetchCreateSettings();
        }
      });
    },
    [dispatch, fetchCreateSettings]
  );

  const handleUpdate = (settings: SettingsData) => {
    setLoader(true);
    SettingsService.updateSettings(settings).then(() => setLoader(false));
  };

  useEffect(() => {
    if (settings?.update) {
      delete settings.update;
      handleUpdate(settings);
      dispatch(setConfig(settings));
    }
  }, [settings, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      state?.user?.email.length > 0 && getSettings(state?.user?.email);
    }, 500);
  }, [getSettings, state?.user?.email]);

  const handleLogOut = () => {
    dispatch(userUpdate({ email: '', name: '', token: '' }));
    cookies.remove(keys.user);
    router.push('/');
  };

  return (
    <div style={{ height: '50vh' }}>
      <Head>
        <title>Guitar Notes - Configurações</title>
      </Head>
      <Flex data-testid="settings-form" gap="12px">
        <Back />
        <Title level={2}>Configurações</Title>
      </Flex>
      <hr />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        style={{ height: '90%' }}
      >
        <Flex flexDirection="column">
          {loader && <Loading />}
          <Flex
            gap="4px"
            justifyContent="space-between"
            style={{ marginTop: 24 }}
          >
            <span style={{ fontSize: 18 }}>Microfone</span>
            <Switch
              disabled={loader}
              onColor={primary}
              onChange={() => {
                settings
                  ? setSettings({
                      ...settings,
                      microphone: !settings?.microphone,
                      update: true,
                    })
                  : fetchCreateSettings();
              }}
              checked={settings?.microphone ? settings?.microphone : false}
            />
          </Flex>
        </Flex>

        <hr />

        <Flex justifyContent="flex-start">
          <Button color="primary" onClick={handleLogOut}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default withAuthPage(SettingsPage);
