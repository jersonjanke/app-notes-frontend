import { Wrapper, Item } from './style';

type Props = {
  items: number[];
  current: number;
};

const Stepper: React.FC<Props> = ({ items, current }) => {
  return (
    <Wrapper>
      {items.map((value, index) => (
        <Item key={index} current={value === current}>
          {value}
        </Item>
      ))}
    </Wrapper>
  );
};

export default Stepper;
