import Login from 'forms/Login/Login';
import type { NextPage } from 'next';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';

import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guitar Notes - Login</title>
      </Head>
      <Row>
        <Hidden sm xs>
          <Col md={4}>
            <Image
              alt="guitar"
              layout="responsive"
              priority={true}
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
    </>
  );
};

export default Home;
