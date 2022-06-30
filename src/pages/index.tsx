import Login from 'components/Login/Login';
import type { NextPage } from 'next';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <Row>
      <Hidden sm xs>
        <Col md={4}>
          <Image
            alt="guitar"
            layout="responsive"
            width={626}
            height={774}
            src="/img/guitar.png"
          />
        </Col>
      </Hidden>
      <Col md={8} sm={12}>
        <Login />
      </Col>
    </Row>
  );
};

export default Home;
