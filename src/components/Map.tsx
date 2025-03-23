import { useEffect, useRef } from 'react';
import MapMoveControls from './MapMoveControls';
import GeometryControls from './GeometryControls';
import DirectionControls from './DirectionControls';
import { makeGeometry } from '../utils/makeGeometry';
import MeasureControls from './MeasureControls';

const Map = () => {
   const mapRef = useRef<any>(null);

   const sX = 129.0883498;
   const sY = 35.1720375;
   let sZ = 1000;
   const sR = 0;

   useEffect(() => {
      const checkVWorldLoaded = setInterval(() => {
         if (window.vw?.Map) {
            clearInterval(checkVWorldLoaded);
            try {
               const options = {
                  mapId: 'vmap',
                  initPosition: new window.vw.CameraPosition(
                     new window.vw.CoordZ(sX, sY, sZ),
                     new window.vw.Direction(0, -90, 0),
                  ),
                  logo: true,
                  navigation: true,
               };

               const map = new window.vw.Map();
               map.setOption(options);
               map.start();

               window.vw._map = map;
               window.vw.MeasureHeight._map = map;
               window.vw.MeasureLine._map = map;
               window.vw.MeasureArea._map = map;
               window.vw.Map.prototype.map = map;

               mapRef.current = map;
            } catch (error) {
               console.error('❌ 지도 초기화 중 오류:', error);
            }
         }
      }, 300);

      return () => clearInterval(checkVWorldLoaded);
   }, []);

   const handleCreate = (type: string) => {
      makeGeometry(type, mapRef.current);
   };

   const resetMap = () => {
      mapRef.current?.clear();
   };

   const handleMove = (x: number, y: number, z: number) => {
      if (!window.vw || !mapRef.current) return;
      const moveTo = new window.vw.CoordZ(x, y, z);
      const camera = new window.vw.CameraPosition(moveTo, new window.vw.Direction(0, -80, 0));
      mapRef.current.moveTo(camera);
   };

   const handleDirection = (heading: number, tilt: number, zoom?: number) => {
      if (!mapRef.current || !window.vw) return;
      if (zoom !== undefined) sZ = zoom;

      const cam = new window.vw.CameraPosition(
         new window.vw.CoordZ(sX, sY, sZ),
         new window.vw.Direction(heading, tilt, sR),
      );

      mapRef.current.lookat.moveTo(cam);

      if (zoom !== undefined) sZ = 5000;
   };

   const handleClear = () => {
      mapRef.current?.clear();
   };

   const handleStop = () => {
      if (!window.vw) return;
      window.vw.MeasureHeight.stop();
      window.vw.MeasureLine.stop();
      window.vw.MeasureArea.stop();
   };

   return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
         <div id='vmap' style={{ width: '100%', height: '100%' }} />
         <GeometryControls onCreate={handleCreate} onReset={resetMap} />
         <MapMoveControls onMove={handleMove} />
         <DirectionControls onMoveDirection={handleDirection} />
         <MeasureControls onClear={handleClear} onStop={handleStop} />
      </div>
   );
};

export default Map;
