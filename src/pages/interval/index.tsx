import Title from '@/components/Title';
import { Row, Col } from 'react-grid-system';
import TableInterval from '@/components/TableInterval';

const IntervalPage: React.FC = () => {
  return (
    <Row>
      <Col md={12}>
        <Title level={2}>Tabela de intervalos</Title>
      </Col>
      <Col md={12}>
        <TableInterval />
      </Col>
    </Row>
  );
};

export default IntervalPage;
