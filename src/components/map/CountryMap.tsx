import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';
import '@/components/map/CountryMap.scss';

interface CountryMapProps {
  coords: number[];
}

export default function CountryMap({ coords }: CountryMapProps) {
  const position: LatLngExpression = [coords[0], coords[1]]; // [latitude, longitude]
  const zoomLevel = 7;

  console.log(position);

  /*  useEffect(() => {
    map.setView(coords[0], coords[1]);
  }, [coords]); */

  return (
    <div id='map'>
      <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </div>
  );
}
