import { NextPage } from 'next';
import { primary } from 'utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setConfig } from 'store/actions/config';
import { StoreData } from 'types/Login';
import { userUpdate } from 'store/actions/user';
import Switch from 'react-switch';
import Flex from '../../components/Flex';
import Title from '../../components/Title';
import { useCallback, useEffect, useState } from 'react';
import SettingsService, { SettingsData } from 'services/SettingsService';
import { useRouter } from 'next/router';
import { setCookies } from 'cookies-next';
import Button from 'components/Button';
import Back from 'components/Back';

const SettingsPage: NextPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const router = useRouter();

  const fetchCreateSettings = useCallback(() => {
    SettingsService.createSettings({
      autoplay: false,
      microphone: false,
      email: state.user.email,
    }).then((response) => {
      setSettings(response[response.length - 1]);
    });
  }, [state?.user?.email]);

  const getSettings = useCallback(() => {
    SettingsService.getSettings(state.user.email).then((response) => {
      if (response.length > 0) {
        setSettings(response[response.length - 1]);
        dispatch(setConfig(response[response.length - 1]));
      } else {
        fetchCreateSettings();
      }
    });
  }, [dispatch, fetchCreateSettings, state?.user?.email]);

  const handleUpdate = (settings: SettingsData) => {
    SettingsService.updateSettings(settings);
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
      getSettings();
    }, 500);
  }, [router?.isReady, getSettings]);

  const handleLogOut = () => {
    dispatch(userUpdate({ email: '', name: '', token: '' }));
    setCookies('token', null);
    router.push('/');
  };

  return (
    <div style={{ height: '50vh' }}>
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
          <Flex
            gap="4px"
            justifyContent="space-between"
            style={{ marginTop: 24 }}
          >
            <span style={{ fontSize: 18 }}>Microfone</span>
            <Switch
              onColor={primary}
              onChange={() =>
                settings &&
                setSettings({
                  ...settings,
                  microphone: !settings?.microphone,
                  update: true,
                })
              }
              checked={settings?.microphone ? settings?.microphone : false}
            />
          </Flex>
        </Flex>

        <hr />

        <Flex justifyContent="flex-start">
          <Button onClick={handleLogOut}>Logout</Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default SettingsPage;
