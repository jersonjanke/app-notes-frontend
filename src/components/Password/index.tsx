import Button from 'components/Button';
import Card from 'components/Card';
import InputPassword from 'components/InputPassword';
import PasswordValidate from '@/components/PasswordValidate';
import Title from 'components/Title';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthService from 'services/AuthService';
import { PasswordData, User } from 'types/Login';
import * as yup from 'yup';

type State = {
  user: User;
};

const Password: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: State) => state?.user);
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    password: yup.string().min(6).required('Campo obrigatório'),
    confirm_password: yup.string().min(6).required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: PasswordData) => {
      try {
        setLoading(true);
        await AuthService.signUp({
          ...values,
          email: user.email,
          name: user.name,
        });
        setLoading(false);
        router.push('/signup-success');
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    },
  });

  return (
    <Card>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Title level={2}>Criar senha!</Title>
        <PasswordValidate password={formik.values.password} />
        <InputPassword
          title="Senha"
          id="password"
          onChange={formik.handleChange}
          placeholder="Informe sua senha"
        />
        <InputPassword
          title="Confirme senha"
          id="confirm_password"
          onChange={formik.handleChange}
          placeholder="Confirme sua senha"
        />
        <Button
          loading={loading}
          disabled={!formik.isValid || !user?.validPassword}
          label="Finalizar"
          type="submit"
        />
      </form>
    </Card>
  );
};

export default Password;
