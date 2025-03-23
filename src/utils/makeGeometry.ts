// utils/makeGeometry.ts

export const makeGeometry = (type: string, map: any) => {
   if (!window.vw || !map) return;

   switch (type) {
      case 'LineString': {
         const points = [
            new window.vw.Coord(126.921883, 37.52437),
            new window.vw.Coord(126.951883, 37.52437),
            new window.vw.Coord(126.981883, 37.55437),
         ];
         const line = new window.vw.geom.LineString(new window.vw.Collection(points));
         line.setId('linestring01');
         line.setFillColor(new window.vw.Color(255, 0, 255, 125));
         line.setWidth(2000);
         line.create();
         break;
      }
      case 'Line': {
         const start = new window.vw.Coord(126.968007, 37.3998313);
         const end = new window.vw.Coord(126.968007, 37.4398313);
         const line = new window.vw.geom.Line(start, end);
         line.setId('line01');
         line.setFillColor(window.vw.Color.RED);
         line.setWidth(1000);
         line.create();
         break;
      }
      case 'Point': {
         const pt1 = new window.vw.geom.Point(new window.vw.Coord(126.921883, 37.52437));
         pt1.setId('point1');
         pt1.setImage('https://map.vworld.kr/images/op02/map_point.png');
         pt1.setName('2차원 포인트 1');
         pt1.setFont('고딕');
         pt1.setFontSize(20);
         pt1.create();

         const pt2 = new window.vw.geom.Point(new window.vw.Coord(126.821883, 37.52437));
         pt2.setId('point2');
         pt2.setImage('https://map.vworld.kr/images/op02/map_point.png');
         pt2.setName('2차원 포인트 2');
         pt2.setFont('고딕');
         pt2.setFontSize(20);
         pt2.create();
         break;
      }
      case 'Polygon': {
         const points = [
            new window.vw.Coord(126.824883, 37.52437),
            new window.vw.Coord(126.854883, 37.51137),
            new window.vw.Coord(126.884883, 37.51137),
         ];
         const polygon = new window.vw.geom.Polygon(new window.vw.Collection(points));
         polygon.setId('polygon1');
         polygon.setFillColor(window.vw.Color.GOLD);
         polygon.create();
         break;
      }
   }
};
