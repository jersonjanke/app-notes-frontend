import { useState } from 'react'
import AuthService from 'services/AuthService'
import { Wrapper } from './style'
import { useDispatch } from 'react-redux'
import { userUpdate } from '../../store/actions/user'
import { useRouter } from 'next/router'
import Button from 'components/Button'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { data } = await AuthService.login({ email, password })
      dispatch(userUpdate(data))
      setLoading(false)
      router.push('/dashboard')
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <h3>Login</h3>
      <label>E-mail</label>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <label>Senha</label>
      <input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <a onClick={() => router.push('/signup')}>Criar conta</a>
      <Button loading={loading} label="login" onClick={handleLogin} />
    </Wrapper>
  )
}

export default Login
