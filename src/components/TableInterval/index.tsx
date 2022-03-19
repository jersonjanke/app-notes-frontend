import { Table } from './style';
import { white, orange } from 'utils/colors';

const TableInterval: React.FC = () => {
  return (
    <Table>
      <tr>
        <th
          style={{
            backgroundColor: orange,
            color: white,
            width: 160,
          }}
        >
          1° maior
        </th>
        <th>C</th>
        <th>C#</th>
        <th>D</th>
        <th>D#</th>
        <th>E</th>
        <th>F</th>
        <th>F#</th>
        <th>G</th>
        <th>G#</th>
        <th>A</th>
        <th>A#</th>
        <th>B</th>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          2° menor
        </th>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          2° maior
        </th>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          3° menor
        </th>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          3° maior
        </th>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          4° justa
        </th>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          4° aumentada
        </th>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          5° justa
        </th>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          5° aumentada
        </th>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          6° maior
        </th>
        <td>A</td>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          7° menor
        </th>
        <td>A#</td>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
      </tr>
      <tr>
        <th style={{ backgroundColor: orange, color: white, width: 160 }}>
          7° maior
        </th>
        <td>B</td>
        <td>C</td>
        <td>C#</td>
        <td>D</td>
        <td>D#</td>
        <td>E</td>
        <td>F</td>
        <td>F#</td>
        <td>G</td>
        <td>G#</td>
        <td>A</td>
        <td>A#</td>
      </tr>
    </Table>
  );
};

export default TableInterval;
