import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from "react-icons/fi";
import ReactInputMask from "react-input-mask";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.css';
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekend, setOpenOnWeekend] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng});
  }
  
  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsappNumber', whatsappNumber);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('openingHours', openingHours);
    data.append('openOnWeekend', String(openOnWeekend));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post("/orphanages", data)

    alert ("Cadastro realizado com sucesso!");

    history.push("/app");
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }

    const selectedImages = [...images, ...Array.from(event.target.files)];

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  };

  function handleRemoveImage(selectedImage: string){
    const imagesAfterRemoved = images.filter((img, imgId) => imgId !== previewImages.indexOf(selectedImage));
    const previewImagesAfterRemoved = previewImages.filter(img => img !== selectedImage);

    setPreviewImages(previewImagesAfterRemoved);
    setImages(imagesAfterRemoved);
  };

  return (
    <div id="page-create-orphanage">
      <Sidebar></Sidebar>
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>
            <Map center={[-22.9322157, -43.242477]} style={{ width: '100%', height: 280 }} zoom={15} onClick={handleMapClick}>
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
                { position.latitude !== 0 ? <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]}></Marker> : null}                
            </Map>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="whatsappNumber">Número de Whatsapp</label>
              <ReactInputMask mask="+55 (99) 99999-9999" value={whatsappNumber} onChange={event => setWhatsappNumber(event.target.value)}></ReactInputMask>
            </div>
            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages.map(image => {
                  return (
                          <div key={image} className="image-group">
                            <div className="images-remove" onClick={() => handleRemoveImage(image)}>
                                <FiX size={24} color="#FF669D"></FiX>
                            </div>
                            <img key={image} src={image} alt={name}></img>
                          </div>
                  );
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6"></FiPlus>
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"></input>
            </div>
          </fieldset>
          <fieldset>
            <legend>Visitação</legend>
            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}></textarea>
            </div>
            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Visitação</label>
              <input id="opening_hours" value={openingHours} onChange={event => setOpeningHours(event.target.value)}></input>
            </div>
            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende final de semana</label>
              <div className="button-select">
                <button type="button" className={openOnWeekend ? 'active' : ''} onClick={() => setOpenOnWeekend(true)}>Sim</button>
                <button type="button" className={!openOnWeekend ? 'active' : ''} onClick={() => setOpenOnWeekend(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
