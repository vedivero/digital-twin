import React from 'react';

interface Props {
   onClear: () => void;
   onStop: () => void;
}

const MeasureControls = ({ onClear, onStop }: Props) => {
   const measure = (type: 'Height' | 'Line' | 'Area') => {
      if (!window.vw) return;

      const measureObj = window.vw[`Measure${type}`];

      // ✅ 먼저 인스턴스를 강제로 생성
      const forceInit = () => {
         try {
            // 1. map 연결 먼저!
            const instance = measureObj.get?.();
            if (instance && !instance.map) {
               instance.map = window.vw.Map.prototype.map;
            }

            // 2. start 다시 호출하여 UI 인터랙션 반영
            measureObj.start?.();

            // 3. 우클릭 종료 이벤트 등록
            const handler = () => measureObj?.stop?.();
            window.vw.EventProcess.add(
               window.vw.MapController.RIGHTUPDNCLICK,
               window.vw.Map.prototype.onMouseRightDown,
               handler,
            );
         } catch (e) {
            console.error('측정 기능 초기화 실패:', e);
         }
      };

      // 먼저 start 호출 (내부 인스턴스 생성 목적)
      measureObj.start?.();

      // 다음 프레임에서 다시 연결 및 start
      requestAnimationFrame(forceInit);
   };

   return (
      <div
         style={{
            position: 'absolute',
            bottom: 50,
            right: 10,
            zIndex: 1000,
            display: 'flex',
            gap: '8px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '6px 10px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
         }}
      >
         <button style={btn} onClick={() => measure('Height')}>
            📏 높이
         </button>
         <button style={btn} onClick={() => measure('Line')}>
            📐 거리
         </button>
         <button style={btn} onClick={() => measure('Area')}>
            🧩 면적
         </button>
         <button style={{ ...btn, background: '#f43f5e' }} onClick={onStop}>
            🛑 종료
         </button>
         <button style={{ ...btn, background: '#475569' }} onClick={onClear}>
            🗑 지우기
         </button>
      </div>
   );
};

const btn: React.CSSProperties = {
   padding: '6px 10px',
   borderRadius: '6px',
   border: 'none',
   background: '#3b82f6',
   color: 'white',
   fontWeight: 500,
   fontSize: '13px',
   cursor: 'pointer',
};

export default MeasureControls;
