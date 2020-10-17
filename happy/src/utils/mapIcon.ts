import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [48, 50],
    iconAnchor: [24, 50],
    popupAnchor: [158, 21]
});

export default mapIcon;