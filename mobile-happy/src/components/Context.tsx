import React, { createContext, useState } from 'react'

export interface OrphanageDataInterface {
  name: string,
  about: string,
  whatsappNumber: string,
  latitude: number,
  longitude: number,
  images: Array<string>,
  updateOrph: (nm: string, ab: string, whats: string, lat: number, long: number, imgs: string[]) => void
};

export const OrphanageContext = createContext<OrphanageDataInterface>({} as OrphanageDataInterface);

export const OrphanageContextProvider: React.FC = (props:any) => {
    const [orph, setOrph] = useState({name: '', about: '', whatsappNumber: '', latitude: 0, longitude: 0, images: Array(),});
    const updateOrph = (nm: string, ab: string, whats: string, lat: number, long: number, imgs: string[]) => (
        setOrph({name: nm, about: ab, whatsappNumber: whats, latitude: lat, longitude: long, images: imgs})
    )

    return (
        <OrphanageContext.Provider value={{name: orph.name, about: orph.about, whatsappNumber: orph.whatsappNumber, latitude: orph.latitude, longitude: orph.longitude, images: orph.images, updateOrph}}>
            {props.children}
        </OrphanageContext.Provider>
    )
 }