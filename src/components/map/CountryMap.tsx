import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerMap from '@/components/map/MarkerMap';

import { LatLngExpression } from 'leaflet';
import '@/components/map/CountryMap.scss';

interface CountryMapProps {
  coords: number[];
}

const ZOOM_LEVEL = 7;

export default function CountryMap({ coords }: CountryMapProps) {
  const position: LatLngExpression = [coords[0], coords[1]];

  return (
    <>
      <MapContainer center={position} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
        />
        <MarkerMap position={position} />
      </MapContainer>
    </>
  );
}
