import Register from 'components/Register';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';
import drums from '../../../public/img/drums.png';

const SignUp = () => {
  return (
    <Row>
      <Hidden sm xs>
        <Col md={5}>
          <Image
            layout="responsive"
            alt="Image cadastro"
            width={1033}
            height={1150}
            src={drums}
          />
        </Col>
      </Hidden>
      <Col md={7} sm={12}>
        <Register />
      </Col>
    </Row>
  );
};

export default SignUp;
