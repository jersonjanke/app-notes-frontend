import axios from 'axios';
import Login from 'forms/Login/Login';
import type { NextPage } from 'next';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { StoreData } from 'types/Login';
import { userUpdate } from 'store/actions/user';
import Head from 'next/head';
import { cookies, keys } from 'utils/cookies';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = useSelector((state: StoreData) => state.user);

  useEffect(() => {
    cookies.remove(keys.user);
  }, []);

  useEffect(() => {
    const userData = cookies.get(keys.user);
    userData && setData(JSON.parse(userData as string));
    if (user?.token?.length) {
      axios.defaults.headers.common['Authorization'] = user.token;
    }
  }, [user]);

  useEffect(() => {
    if (data && !user?.token?.length) {
      dispatch(userUpdate(data));
    }
  }, [data, dispatch, user]);

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
