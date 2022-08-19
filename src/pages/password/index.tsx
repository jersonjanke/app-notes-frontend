import Password from 'forms/Password';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';
import Head from 'next/head';

const PasswordPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Guitar Notes - Senha</title>
      </Head>
      <Row>
        <Col md={8} sm={12} xs={12}>
          <Password />
        </Col>
        <Hidden sm xs>
          <Col md={4}>
            <Image
              layout="intrinsic"
              alt="Image trompete"
              width={264}
              height={476}
              src="/img/trompete.png"
            />
          </Col>
        </Hidden>
      </Row>
    </>
  );
};

export default PasswordPage;
