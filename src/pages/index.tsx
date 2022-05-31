import Login from 'components/Login/Login';
import type { NextPage } from 'next';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';
import guitar from '../../public/img/guitar.png';

export async function getStaticProps() {
  return { props: { loading: true } };
}

const Home: NextPage = () => {
  return (
    <Row>
      <Hidden sm xs>
        <Col md={4}>
          <Image
            alt="guitar"
            layout="responsive"
            width={851}
            height={1262}
            src={guitar}
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
