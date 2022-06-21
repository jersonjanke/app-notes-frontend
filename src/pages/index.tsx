import Login from 'components/Login/Login';
import type { NextPage } from 'next';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';
import guitar from '../../public/img/guitar.png';

type Props = {
  loaded: boolean;
};

const Home: NextPage<Props> = ({ loaded }) => {
  return (
    <Row>
      {loaded && (
        <>
          <Hidden sm xs>
            <Col md={4}>
              <Image
                alt="guitar"
                layout="responsive"
                width={626}
                height={774}
                src={guitar}
              />
            </Col>
          </Hidden>
          <Col md={8} sm={12}>
            <Login />
          </Col>
        </>
      )}
    </Row>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: { loaded: true },
  };
}
