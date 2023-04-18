import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerMap from '@/components/map/MarkerMap';

import { LatLngExpression } from 'leaflet';
import '@/components/map/CountryMap.scss';

interface CountryMapProps {
  coords: number[];
}

export default function CountryMap({ coords }: CountryMapProps) {
  const position: LatLngExpression = [coords[0], coords[1]]; // [latitude, longitude]
  const zoomLevel = 7;

  return (
    <>
      <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
        />
        <MarkerMap position={position} />
      </MapContainer>
    </>
  );
}
