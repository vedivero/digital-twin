import { useState } from 'react';

declare global {
   interface Window {
      vw: any;
      ws3d: any;
      RouteSimulation: any;
   }
}

const SimulationControl = () => {
   const [objType, setObjType] = useState<'DRONE' | 'VEHICLE'>('DRONE');
   const [speed, setSpeed] = useState(50);
   const [elevation, setElevation] = useState(120);
   const [geojson, setGeojson] = useState('');
   const [routeSimObject, setRouteSimObject] = useState<any>(null);

   // 지도에서 클릭하여 경로 그리기
   const createRouteByDrawing = () => {
      if (!window.RouteSimulation) return;

      let sim = routeSimObject;
      if (!sim) {
         sim = new window.RouteSimulation('routeSimObject1', 'routeSimObject1', objType);
         setRouteSimObject(sim);
      } else {
         sim.type = objType;
      }

      // 고도 정보 전달 객체
      const routeElevationElement = {
         value: elevation,
      };

      sim.startDrawingRoute(routeElevationElement);
   };

   const createRouteFromGeoJSON = () => {
      if (!window.RouteSimulation || !geojson) return;
      const parsed = JSON.parse(geojson);

      let sim = routeSimObject;
      if (!sim) {
         sim = new window.RouteSimulation('routeSimObject1', 'routeSimObject1', objType);
         setRouteSimObject(sim);
      } else {
         sim.type = objType;
      }
      sim.createRouteByGeoJSON(parsed);
   };

   const playSimulation = () => {
      if (!routeSimObject) {
         alert('경로를 먼저 생성해주세요.');
         return;
      }
      routeSimObject.playRouteSimulation(speed, 1, '#FFFFFF', 65);
   };

   return (
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 999, background: '#fff', padding: 10 }}>
         <div>
            <label>객체 타입</label>
            <select value={objType} onChange={(e) => setObjType(e.target.value as 'DRONE' | 'VEHICLE')}>
               <option value='DRONE'>드론</option>
               <option value='VEHICLE'>차량</option>
            </select>
         </div>
         <div>
            <label>속도 (km/h)</label>
            <input type='number' value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
         </div>
         <div>
            <label>고도 (m)</label>
            <input type='number' value={elevation} onChange={(e) => setElevation(Number(e.target.value))} />
         </div>
         <div>
            <label>GeoJSON 경로</label>
            <textarea rows={6} cols={40} value={geojson} onChange={(e) => setGeojson(e.target.value)} />
            <button onClick={createRouteFromGeoJSON}>GeoJSON 경로 생성</button>
         </div>
         <button onClick={createRouteByDrawing}>🖱 지도에서 경로 그리기</button>
         <button onClick={playSimulation}>▶️ 모의주행 시작</button>
      </div>
   );
};

export default SimulationControl;
