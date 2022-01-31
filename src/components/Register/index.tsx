import { useFormik } from 'formik'
import AuthService from 'services/AuthService'
import { User } from 'types/Login'
import * as yup from 'yup'

const Register = () => {
  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
    confirm_password: yup.string().required('Campo obrigatório'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: schema,
    onSubmit: (values: User) => {
      AuthService.signup(values).then(console.log).catch(console.error)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        id="name"
        onChange={formik.handleChange}
        placeholder="Nome"
      />
      <input
        type="text"
        id="email"
        onChange={formik.handleChange}
        placeholder="E-mail"
      />
      <input
        type="password"
        id="password"
        onChange={formik.handleChange}
        placeholder="Senha"
      />
      <input
        type="password"
        id="confirm_password"
        onChange={formik.handleChange}
        placeholder="Repita Senha"
      />
      <button type="submit">Salvar</button>
    </form>
  )
}

export default Register
