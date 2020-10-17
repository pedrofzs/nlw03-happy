import Orphanage from "../models/Orphanage";
import ImagesView from './ImagesView';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      whatsappNumber: orphanage.whatsappNumber,
      instructions: orphanage.instructions,
      openingHours: orphanage.openingHours,
      openOnWeekend: orphanage.openOnWeekend,
      images: ImagesView.renderMany(orphanage.images),
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  }
}