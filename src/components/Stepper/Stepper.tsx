import { Wrapper, Item } from './style';

type Props = {
  items: number[];
  level: number;
};

const Stepper: React.FC<Props> = ({ items, level }) => {
  return (
    <Wrapper>
      {items.map((value, index) => (
        <Item key={index} current={value === level}>
          {value}
        </Item>
      ))}
    </Wrapper>
  );
};

export default Stepper;
