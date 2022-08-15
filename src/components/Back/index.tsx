/* eslint-disable @next/next/link-passhref */
import Image from 'next/image';
import Link from 'next/link';
import { pages } from 'utils/pages';

const Back: React.FC = () => {
  return (
    <Link href={pages.dashboard} passHref>
      <Image
        data-testid="back"
        style={{ cursor: 'pointer' }}
        layout="fixed"
        src="/svg/arrow-left-circle.svg"
        height={32}
        width={32}
        alt="back"
      />
    </Link>
  );
};

export default Back;
