import Image from 'next/image';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';

const Back: React.FC = () => {
  const router = useRouter();
  return (
    <div style={{ cursor: 'pointer' }}>
      <Image
        layout="fixed"
        src="/svg/arrow-left-circle.svg"
        height={32}
        width={32}
        alt="back"
        onClick={() => router.push(`/${pages.dashboard}`)}
      />
    </div>
  );
};

export default Back;
