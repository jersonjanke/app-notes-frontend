import { useState } from 'react';
import AuthService from 'services/AuthService';
import { Wrapper } from './style';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../store/actions/user';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'next/link';
import Title from 'components/Title';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await AuthService.login({ email, password });
      dispatch(userUpdate(data));
      setLoading(false);
      router.push('/dashboard');
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Title level={1}>Login</Title>
      <Input
        title="E-mail"
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        title="Senha"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link href="/signup">Criar conta</Link>
      <Button loading={loading} label="login" onClick={handleLogin} />
    </Wrapper>
  );
};

export default Login;
