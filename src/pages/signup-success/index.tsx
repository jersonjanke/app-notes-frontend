import { Container } from 'react-grid-system';
import Image from 'next/image';
import Band from '../../../public/img/band.png';
import { WrapperImage } from './style';
import Title from '@/components/Title';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

const SignUpSuccess: React.FC = () => {
  const router = useRouter();
  return (
    <Container>
      <WrapperImage>
        <Title level={1}>Usuário criado com sucesso!</Title>
        <Image src={Band} width={540} height={260} />
        <Button onClick={() => router.push('/')} label="Login" />
      </WrapperImage>
    </Container>
  );
};

export default SignUpSuccess;
