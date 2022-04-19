import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { blue } from 'utils/colors';
import { useEffect, useState } from 'react';
import Flex from '@/components/Flex';

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
        <FontAwesomeIcon
          key={`heart-${index}`}
          style={{
            marginLeft: 8,
            opacity: opacityItem ? 0.15 : 1,
            transition: '500ms',
          }}
          size="2x"
          color={blue}
          icon={faHeart as IconProp}
        />
      ))}
    </Flex>
  );
};

export default Heart;
