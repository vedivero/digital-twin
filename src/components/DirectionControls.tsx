// Direction
import React from 'react';

interface Props {
   onMoveDirection: (heading: number, tilt: number, zoom?: number) => void;
}

const DirectionControls = ({ onMoveDirection }: Props) => {
   const handleClick = (dir: string) => {
      const sH = 0;
      const sT = -50;
      const directions: Record<string, [number, number, number?]> = {
         동쪽: [90, sT],
         서쪽: [-90, sT],
         북쪽: [0, sT],
         남쪽: [180, sT],
         지면: [sH, -90],
         정면: [sH, 0, 100],
      };

      const [h, t, z] = directions[dir];
      onMoveDirection(h, t, z);
   };

   return (
      <div
         style={{
            position: 'absolute',
            bottom: 50,
            left: 10,
            zIndex: 1000,
            display: 'flex',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '6px 10px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
         }}
      >
         우리집
         {['동쪽', '서쪽', '북쪽', '남쪽', '지면', '정면'].map((dir) => (
            <button key={dir} style={buttonStyle} onClick={() => handleClick(dir)}>
               {dir}
            </button>
         ))}
      </div>
   );
};

const buttonStyle: React.CSSProperties = {
   padding: '6px 10px',
   borderRadius: '6px',
   border: 'none',
   background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
   color: '#fff',
   fontWeight: 500,
   fontSize: '13px',
   cursor: 'pointer',
};

export default DirectionControls;
