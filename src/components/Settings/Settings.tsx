import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import ReactModal from 'react-modal';
import { primary } from 'utils/colors';
import Flex from '../Flex';
import Title from '../Title';
import { useDispatch, useSelector } from 'react-redux';
import { setConfig } from 'store/actions/config';
import { StoreData } from 'types/Login';
import Button from '../Button';
import { WrapperButtonOut } from './style';
import { userUpdate } from 'store/actions/user';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Settings: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);

  const handleLogOut = () => {
    dispatch(userUpdate({ email: '', name: '', token: '' }));
  };

  return (
    <ReactModal isOpen={open} id="settings" ariaHideApp={false}>
      <Flex justifyContent="space-between">
        <Title level={2}>Configurações</Title>
        <FontAwesomeIcon
          size="2x"
          color={primary}
          onClick={onClose}
          icon={faTimes as IconProp}
          style={{ cursor: 'pointer' }}
        />
      </Flex>
      <hr />
      <Flex gap="4px" justifyContent="space-between" style={{ marginTop: 24 }}>
        <span style={{ fontSize: 18 }}>Microfone</span>
        <Switch
          onColor={primary}
          onChange={() =>
            dispatch(
              setConfig({
                ...state.config,
                microphone: !state.config.microphone,
              })
            )
          }
          checked={state.config.microphone}
        />
      </Flex>
      <WrapperButtonOut>
        <Button onClick={handleLogOut}>Sair</Button>
      </WrapperButtonOut>
    </ReactModal>
  );
};

export default Settings;
