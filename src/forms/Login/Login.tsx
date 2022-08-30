import { useState } from 'react';
import AuthService from 'services/AuthService';
import { Wrapper, WrapperText } from './style';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../store/actions/user';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'next/link';
import Title from 'components/Title';
import InputPassword from '../../components/InputPassword';
import { toastMSG } from 'utils/toast';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import Flex from 'components/Flex';
import Image from 'next/image';
import { pages } from 'utils/pages';
import { cookies, keys } from 'utils/cookies';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const responseGoogle = (response: GoogleLoginResponse) => {
    const payload = {
      email: response.profileObj.email,
      name: response.profileObj.givenName,
      token: response.tokenObj.id_token,
    };

    cookies.set(keys.user, JSON.stringify(payload));
    dispatch(userUpdate(payload));
    router.push(pages.dashboard);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await AuthService.login({ email, password });
      cookies.set(keys.user, JSON.stringify(data));
      dispatch(userUpdate(data));
      axios.defaults.headers.common['Authorization'] = data.token;
      setLoading(false);
      router.push(pages.dashboard);
    } catch (err: any) {
      setLoading(false);
      err?.response?.data?.errors?.forEach((error: string) =>
        toastMSG(error, 'error')
      );
    }
  };

  return (
    <>
      <Wrapper data-testid="login-form">
        <form>
          <Title level={1}>Login</Title>
          <Input
            title="E-mail"
            id="username"
            name="username"
            autoComplete="username"
            placeholder="Insira seu e-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            title="Senha"
            id="password"
            name="password"
            autoComplete="password"
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>

        <Flex gap="8px">
          <Button
            style={{ marginTop: 8 }}
            loading={loading}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Flex style={{ marginTop: 8 }}>
            <GoogleLogin
              clientId="829625549487-m7dvtef9obacodq027b6j7eegt3p6oon.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button onClick={renderProps.onClick} style={{ width: 56 }}>
                  <Image
                    data-testid="back"
                    layout="fixed"
                    src="/img/Google.webp"
                    height={32}
                    width={32}
                    alt="Google"
                  />
                </Button>
              )}
              buttonText="Login"
              onSuccess={(response) =>
                responseGoogle(response as GoogleLoginResponse)
              }
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Flex>
        </Flex>
        <Link href="/signup">Criar conta</Link>
      </Wrapper>
      <WrapperText>
        Este projeto pretende desenvolver uma aplicação no tema de educação,
        trazendo uma gamificação para deixar o aprendizado mais divertido. A
        proposta é a realização de um jogo no campo da educação musical.
      </WrapperText>
    </>
  );
};

export default Login;
