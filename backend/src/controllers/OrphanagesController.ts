import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import orphanagesView from '../views/OrphanagesView';
import Orphanage from "../models/Orphanage";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });
  
    return response.json(orphanagesView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params; 

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id,{
      relations: ['images']
    });
  
    return response.json(orphanagesView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      whatsappNumber,
      instructions,
      openingHours,
      openOnWeekend,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      whatsappNumber,
      instructions,
      openingHours,
      openOnWeekend: openOnWeekend === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      whatsappNumber: Yup.string().notRequired(),
      instructions: Yup.string().required(),
      openingHours: Yup.string().required(),
      openOnWeekend: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);
  
    return response.status(201).json(orphanagesView.render(orphanage));
  }
}