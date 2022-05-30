import { useEffect, useState } from 'react';
import Flex from '@/components/Flex';
import Image from 'next/image';
import heartIcon from '../../../public/icons/heart.svg';

type Props = {
  size: number;
  opacity: number;
};

const Heart: React.FC<Props> = ({ size, opacity }) => {
  const [hearts, setHearts] = useState(
    new Array(size).fill({ opacityItem: false })
  );

  useEffect(() => {
    const opacityData = hearts
      .map((_, index) => {
        return index < opacity ? { opacityItem: false } : { opacityItem: true };
      })
      .reverse();
    setHearts(opacityData);
  }, [opacity]);

  return (
    <Flex justifyContent="center">
      {hearts.map(({ opacityItem }, index) => (
        <span
          key={`heart-${index}`}
          style={{
            marginLeft: 8,
            opacity: opacityItem ? 0.15 : 1,
            transition: '500ms',
          }}
        >
          <Image
            src={heartIcon}
            height={28}
            width={28}
            alt={`heart-${index}`}
          />
        </span>
      ))}
    </Flex>
  );
};

export default Heart;
