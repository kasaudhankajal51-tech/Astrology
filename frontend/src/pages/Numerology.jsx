import NumerologyTool from '../components/tools/NumerologyTool';
import { useEffect } from 'react';

function Numerology() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <NumerologyTool />
    </div>
  );
}

export default Numerology;
