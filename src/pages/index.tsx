import axios from 'axios';
import Login from 'components/Login/Login';
import type { NextPage } from 'next';
import { Row, Col, Hidden } from 'react-grid-system';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { StoreData } from 'types/Login';
import { getCookie } from 'cookies-next';
import { userUpdate } from 'store/actions/user';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = useSelector((state: StoreData) => state.user);

  useEffect(() => {
    const userData = getCookie('token');
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
