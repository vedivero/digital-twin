import { useEffect } from 'react';

declare global {
   interface Window {
      vw: any;
      mapController?: any;
   }
}

const Map = () => {
   useEffect(() => {
      if (!window.vw) {
         console.error('vw 객체를 찾을 수 없습니다.');
         return;
      }

      // 이미 초기화된 경우 중복 실행 방지
      if (window.mapController) {
         console.warn('mapController는 이미 초기화되어 있습니다.');
         return;
      }

      try {
         window.vw.MapControllerOption = {
            container: 'vmap',
            mapMode: 'ws3d-map', // WebGL 기반 3D 지도
            basemapType: window.vw.ol3.BasemapType.GRAPHIC,
            controlDensity: window.vw.ol3.DensityType.BASIC,
            interactionDensity: window.vw.ol3.DensityType.BASIC,
            controlsAutoArrange: true,
            homePosition: window.vw.ol3.CameraPosition,
            initPosition: window.vw.ol3.CameraPosition,
         };

         window.mapController = new window.vw.MapController(window.vw.MapControllerOption);
      } catch (err) {
         console.error('브이월드 지도 초기화 중 에러 발생:', err);
      }
   }, []);

   return (
      <div>
         <div id='vmap' style={{ width: '100vw', height: '100vh', position: 'relative' }}></div>
      </div>
   );
};

export default Map;
