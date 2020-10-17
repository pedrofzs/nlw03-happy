import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapMarker from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanagesMap.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);
    
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy Map Marker"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>
            <Map center={[-22.9322157, -43.242477]} zoom={15} style={{ width: '100%', height: '100%' }}>
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
                {orphanages.map(orphanage => {
                    return (<Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={orphanage.id}>
                            <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240}>
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"></FiArrowRight>
                                </Link>
                            </Popup>
                            </Marker>
                            );
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"></FiPlus>
            </Link>
        </div>
    );
}

export default OrphanagesMap;