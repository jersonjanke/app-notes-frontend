import DashboardCard from '@/components/DashboardCard';
import Title from '@/components/Title';
import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { pages, playParams } from 'utils/pages';

const Dashboard: React.FC = () => {
  const router = useRouter();
  return (
    <Row>
      <Col md={12} style={{ marginBottom: 12 }}>
        <Title level={1}>Treinar ouvido:</Title>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() => router.push(`${pages.play}?type=${playParams.unison}`)}
        >
          Uníssono
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.minor2nd}`)
          }
        >
          2° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.major2nd}`)
          }
        >
          2° maior
        </DashboardCard>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.minor3nd}`)
          }
        >
          3° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.major3nd}`)
          }
        >
          3° maior
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.perfect4th}`)
          }
        >
          4° justa
        </DashboardCard>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() => router.push(`${pages.play}?type=${playParams.dim4th}`)}
        >
          4° aumentada
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.perfect5th}`)
          }
        >
          5° justa
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() => router.push(`${pages.play}?type=${playParams.dim5th}`)}
        >
          5° aumentada
        </DashboardCard>
      </Col>

      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.major6nd}`)
          }
        >
          6° maior
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.minor6nd}`)
          }
        >
          6° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.minor7nd}`)
          }
        >
          7° menor
        </DashboardCard>
      </Col>
      <Col md={4} sm={12} style={{ marginTop: 24, marginBottom: 24 }}>
        <DashboardCard
          onClick={() =>
            router.push(`${pages.play}?type=${playParams.major7nd}`)
          }
        >
          7° maior
        </DashboardCard>
      </Col>
    </Row>
  );
};

export default Dashboard;
