import React from 'react';

type GeometryType = 'Point' | 'Line' | 'LineString' | 'Polygon';

interface Props {
   onCreate: (type: GeometryType) => void;
   onReset: () => void;
}

const GeometryControls = ({ onCreate, onReset }: Props) => {
   return (
      <div
         style={{
            position: 'absolute',
            top: 20,
            right: 100,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '6px 10px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
         }}
      >
         <button style={buttonStyle} onClick={() => onCreate('LineString')}>
            📏 LineString
         </button>
         <button style={buttonStyle} onClick={() => onCreate('Line')}>
            ➖ Line
         </button>
         <button style={buttonStyle} onClick={() => onCreate('Point')}>
            📍 Point
         </button>
         <button style={buttonStyle} onClick={() => onCreate('Polygon')}>
            🧩 Polygon
         </button>
         <button
            style={{ ...buttonStyle, background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}
            onClick={onReset}
         >
            🗑 전체 삭제
         </button>
      </div>
   );
};

const buttonStyle: React.CSSProperties = {
   padding: '8px 12px',
   borderRadius: '6px',
   border: 'none',
   background: 'linear-gradient(135deg, #10b981, #3b82f6)',
   color: '#fff',
   fontWeight: 600,
   fontSize: '13px',
   cursor: 'pointer',
   whiteSpace: 'nowrap',
   transition: 'transform 0.2s ease',
};

export default GeometryControls;
