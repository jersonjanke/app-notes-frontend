import Password from '@/components/Password';
import { Row, Col } from 'react-grid-system';
import trompete from '../../../public/img/trompete.png';
import Image from 'next/image';

const PasswordPage: React.FC = () => {
  return (
    <Row>
      <Col md={8}>
        <Password />
      </Col>
      <Col md={4}>
        <Image width={232} height={614} src={trompete} />
      </Col>
    </Row>
  );
};

export default PasswordPage;
