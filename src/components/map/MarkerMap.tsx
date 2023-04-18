import { useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';

interface IMarkerProps {
  position: [lat: number, lon: number];
}

export default function MarkerMap({ position }: IMarkerProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position);
  }, [position]);
  return <Marker position={position}></Marker>;
}
