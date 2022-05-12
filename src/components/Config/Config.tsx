import { useDispatch, useSelector } from 'react-redux';
import { setConfig } from 'store/actions/config';
import { ConfigData } from 'types/Config';
import { gray, black } from 'utils/colors';

const Config: React.FC = () => {
  const dispatch = useDispatch();
  const config = useSelector((state: ConfigData) => state.config);
  return (
    <fieldset style={{ border: `1px solid ${gray}`, color: black }}>
      <legend>Configuração:</legend>

      <div>
        <input
          type="checkbox"
          id="microphone"
          name="microphone"
          onChange={() =>
            dispatch(setConfig({ ...config, microphone: !config.microphone }))
          }
          checked={config.microphone}
        />
        <label htmlFor="microphone">Microfone</label>
      </div>
    </fieldset>
  );
};

export default Config;
