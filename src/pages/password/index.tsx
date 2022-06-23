import Password from '@/components/Password';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';

const PasswordPage: React.FC = () => {
  return (
    <Row>
      <Col md={8} sm={12} xs={12}>
        <Password />
      </Col>
      <Hidden sm xs>
        <Col md={4}>
          <Image
            layout="responsive"
            alt="Image trompete"
            width={232}
            height={614}
            src="/img/trompete.png"
          />
        </Col>
      </Hidden>
    </Row>
  );
};

export default PasswordPage;
