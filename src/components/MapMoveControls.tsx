import React from 'react';

interface MapMoveControlsProps {
   onMove: (x: number, y: number, z: number) => void;
}

const MapMoveControls = ({ onMove }: MapMoveControlsProps) => {
   return (
      <div
         style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 500,
            display: 'flex',
            gap: '12px',
         }}
      >
         <button style={buttonStyle} onClick={() => onMove(129.0883498, 35.1720375, 500)}>
            우리집
         </button>
         <button style={buttonStyle} onClick={() => onMove(126.9994077, 37.2664398, 500)}>
            수원역
         </button>
      </div>
   );
};

const buttonStyle: React.CSSProperties = {
   padding: '10px 16px',
   borderRadius: '8px',
   border: 'none',
   background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
   color: '#fff',
   fontWeight: 600,
   fontSize: '14px',
   cursor: 'pointer',
   boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
   whiteSpace: 'nowrap',
   userSelect: 'none',
};

export default MapMoveControls;
