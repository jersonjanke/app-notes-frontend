import DashboardCard from '@/components/DashboardCard';
import Title from '@/components/Title';
import { Row, Col } from 'react-grid-system';

const Dashboard: React.FC = () => {
  return (
    <Row>
      <Col md={12} style={{ marginBottom: 12 }}>
        <Title level={1}>Treinar ouvido:</Title>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('unison')}>
          Unison
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('2° menor')}>
          2° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('2° maior')}>
          2° maior
        </DashboardCard>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('3° menor')}>
          3° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('3° maior')}>
          3° maior
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('4° justa')}>
          4° justa
        </DashboardCard>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('4° aumentada')}>
          4° aumentada
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('5° justa')}>
          5° justa
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('5° aumentada')}>
          5° aumentada
        </DashboardCard>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('6° maior')}>
          6° maior
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard onClick={() => console.log('7° menor')}>
          7° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24, marginBottom: 24 }}>
        <DashboardCard onClick={() => console.log('7° maior')}>
          7° maior
        </DashboardCard>
      </Col>
    </Row>
  );
};

export default Dashboard;
