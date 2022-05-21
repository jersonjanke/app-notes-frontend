import Password from '@/components/Password';
import { Row, Col, Hidden } from 'react-grid-system';
import trompete from '../../../public/img/trompete.png';
import Image from 'next/image';

const PasswordPage: React.FC = () => {
  return (
    <Row>
      <Col md={8} sm={12} xs={12}>
        <Password />
      </Col>
      <Hidden sm xs>
        <Col md={4}>
          <Image alt="Image trompete" width={232} height={614} src={trompete} />
        </Col>
      </Hidden>
    </Row>
  );
};

export default PasswordPage;
