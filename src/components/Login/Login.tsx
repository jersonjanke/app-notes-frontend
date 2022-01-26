import { useState } from 'react'
import AuthService from 'services/AuthService'
import { Wrapper } from './style'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const { data } = await AuthService.login({ email, password })
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <h2>Login</h2>
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
      <a>Criar conta</a>
      <button onClick={handleLogin}>Login</button>
    </Wrapper>
  )
}

export default Login
