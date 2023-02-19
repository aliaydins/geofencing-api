export type Health = {
   name: string;
   status: 'UP' | 'DOWN';
};

export declare interface ResponseCustom {
   data: any;
   status_code: number;
}

type GeoTypes = 'Polygon';
type Position = number[];
export type Coordinates = Position[][];

export type Point = {
   type: 'Point';
   coordinates: number[];
};

export type Polygon = {
   type: GeoTypes;
   coordinates: Coordinates;
};

export type PointV = {
   latitude: string;
   longitude: string;
};
