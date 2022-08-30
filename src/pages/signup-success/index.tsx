import { Container } from 'react-grid-system';
import Image from 'next/image';
import Title from 'components/Title';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import Head from 'next/head';

const SignUpSuccess: React.FC = () => {
  const router = useRouter();
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <Head>
          <title>Guitar Notes - Conta criada</title>
        </Head>
        <Title level={1}>Usuário criado com sucesso!</Title>
        <Image
          layout="fixed"
          alt="Imagem Sucesso"
          src="/img/band.png"
          width={540}
          height={260}
        />
        <Button color="primary" onClick={() => router.push('/')}>
          Login
        </Button>
      </div>
    </Container>
  );
};

export default SignUpSuccess;
