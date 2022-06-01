import { Container } from 'react-grid-system';
import Image from 'next/image';
import Band from '../../../public/img/band.png';
import Title from '@/components/Title';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

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
        <Title level={1}>Usuário criado com sucesso!</Title>
        <Image
          layout="fixed"
          alt="Imagem Sucesso"
          src={Band}
          width={540}
          height={260}
        />
        <Button onClick={() => router.push('/')}>Login</Button>
      </div>
    </Container>
  );
};

export default SignUpSuccess;
