import { Wrapper } from './style';

const Table: React.FC<any> = ({ children }) => {
  return <Wrapper data-testid="table">{children}</Wrapper>;
};

export default Table;
