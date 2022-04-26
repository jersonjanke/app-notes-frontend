import { Wrapper, Info } from './style';
import Flex from '../Flex';

const Footer: React.FC = () => {
  return (
    <>
      <Wrapper>
        <div className="custom-shape-divider-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </Wrapper>
      <Info>
        <Flex
          justifyContent="space-between"
          alignContent="center"
          style={{ width: '100%', margin: 12 }}
        >
          <Flex>
            <p style={{ color: 'white', fontSize: 12 }}>
              Copyright © 2022 Guitar Notes
            </p>
          </Flex>
          <Flex gap="12px" justifyContent="flex-end" alignItems="center">
            <img src="/icons/instagram-white.png" height={32} width={32} />
            <img src="/icons/facebook-white.png" height={32} width={32} />
            <img src="/icons/github-white.png" height={32} width={32} />
          </Flex>
        </Flex>
      </Info>
    </>
  );
};

export default Footer;
