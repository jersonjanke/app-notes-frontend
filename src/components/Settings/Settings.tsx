import { primary } from 'utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setConfig } from 'store/actions/config';
import { StoreData } from 'types/Login';
import { userUpdate } from 'store/actions/user';
import Switch from 'react-switch';
import ReactModal from 'react-modal';
import Flex from '../Flex';
import Title from '../Title';
import { useCallback, useEffect, useState } from 'react';
import SettingsService, { SettingsData } from 'services/SettingsService';
import { useRouter } from 'next/router';
import { gray } from 'utils/colors';
import Image from 'next/image';
import closeIcon from '../../../public/icons/x-circle.svg';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Settings: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const router = useRouter();

  const getSettings = useCallback(() => {
    SettingsService.getSettings(state.user.email).then((response) => {
      if (response.length > 0) {
        setSettings(response[response.length - 1]);
        dispatch(setConfig(response[response.length - 1]));
      } else {
        fetchCreateSettings();
      }
    });
  }, []);

  const fetchCreateSettings = useCallback(() => {
    SettingsService.createSettings({
      autoplay: false,
      microphone: false,
      email: state.user.email,
    }).then((response) => {
      setSettings(response[response.length - 1]);
    });
  }, []);

  const handleUpdate = (settings: SettingsData) => {
    SettingsService.updateSettings(settings);
  };

  useEffect(() => {
    if (settings?.update) {
      delete settings.update;
      handleUpdate(settings);
      dispatch(setConfig(settings));
    }
  }, [settings]);

  useEffect(() => {
    setTimeout(() => {
      getSettings();
    }, 500);
  }, [router?.isReady]);

  useEffect(() => {
    open && getSettings();
  }, [open]);

  const handleLogOut = () => {
    dispatch(userUpdate({ email: '', name: '', token: '' }));
    router.push('/');
  };

  return (
    <ReactModal isOpen={open} id="settings" ariaHideApp={false}>
      <Flex justifyContent="space-between">
        <Title level={2}>Configurações</Title>
        <Image
          layout="fixed"
          src={closeIcon}
          height={32}
          width={32}
          onClick={onClose}
        />
      </Flex>
      <hr />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        style={{ height: '90%' }}
      >
        <Flex flexDirection="column">
          {/* <Flex
            gap="4px"
            justifyContent="space-between"
            style={{ marginTop: 24 }}
          >
            <span style={{ fontSize: 18 }}>Autoplay</span>
            <Switch
              onColor={primary}
              onChange={() =>
                settings &&
                setSettings({
                  ...settings,
                  autoplay: !settings.autoplay,
                  update: true,
                })
              }
              checked={settings?.autoplay ? settings?.autoplay : false}
            />
          </Flex> */}
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

        <Flex justifyContent="flex-start">
          <a
            style={{
              border: `1px solid  ${gray}`,
              padding: 8,
              borderRadius: 8,
            }}
            onClick={handleLogOut}
          >
            Logout
          </a>
        </Flex>
      </Flex>
    </ReactModal>
  );
};

export default Settings;
