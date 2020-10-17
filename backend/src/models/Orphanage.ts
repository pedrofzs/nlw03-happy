import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  whatsappNumber: string;

  @Column()
  instructions: string;

  @Column()
  openingHours: string;

  @Column()
  openOnWeekend: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  
  @JoinColumn({ name: 'orphanageId' })
  images: Image[];
}