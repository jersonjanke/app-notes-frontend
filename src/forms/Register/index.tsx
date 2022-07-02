import Title from 'components/Title';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import { useFormik } from 'formik';
import { User } from 'types/Login';
import * as yup from 'yup';
import { Wrapper, WrapperForm, Form } from './style';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSignUp } from 'store/actions/user';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().min(3).required('Campo obrigatório'),
    email: yup.string().min(3).required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values: User) => {
      dispatch(setSignUp(values));
      router.push('/password');
    },
  });

  return (
    <Wrapper data-testid="register">
      <Card>
        <Title level={2}>Criar conta!</Title>
        <WrapperForm>
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
              placeholder="Informe seu e-mail"
            />
            <Button
              disabled={!formik.isValid || !formik.dirty}
              style={{ marginTop: 12 }}
              type="submit"
            >
              Próximo
            </Button>
          </Form>
        </WrapperForm>
      </Card>
    </Wrapper>
  );
};

export default Register;
