import Title from 'components/Title';
import Input from 'components/Input';
import Button from 'components/Button';
import { useFormik } from 'formik';
import AuthService from 'services/AuthService';
import { User } from 'types/Login';
import * as yup from 'yup';
import { Wrapper, Form } from './style';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().min(3).required('Campo obrigatório'),
    email: yup.string().min(3).required('Campo obrigatório'),
    password: yup.string().min(6).required('Campo obrigatório'),
    confirm_password: yup.string().min(6).required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: User) => {
      try {
        await AuthService.signUp(values);
        router.push('/signup-success');
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Wrapper>
      <Title level={2}>Criar conta!</Title>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          title="Nome"
          id="name"
          onChange={formik.handleChange}
          placeholder="Informe seu nome"
        />
        <Input
          type="email"
          title="E-mail"
          id="email"
          onChange={formik.handleChange}
          placeholder="Inforne seu e-mail"
        />
        <Input
          type="password"
          title="Senha"
          id="password"
          onChange={formik.handleChange}
          placeholder="Informe sua senha"
        />
        <Input
          type="password"
          title="Confirme senha"
          id="confirm_password"
          onChange={formik.handleChange}
          placeholder="Confirme sua senha"
        />
        <Button
          disabled={!formik.isValid || !formik.dirty}
          label="Salvar"
          type="submit"
        />
      </Form>
    </Wrapper>
  );
};

export default Register;
