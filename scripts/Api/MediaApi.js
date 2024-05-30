
import { Api } from "./Api.js";
//PhotographerApi étend la classe Api
export class MediaApi extends Api {
    constructor(url) {
        super(url); // Appel constructor parent(url)
    }

    async getAll() {
        //La méthode getAll asynchrone utilise getDatas pour récupérer toutes les données des medias.
        let datas = await this.getDatas();
        //Elle retourne les données des medias.
        return datas.media;
    }

    async getAllForOnePhotographer(id) {
        //La méthode getAllForOnePhotographer utilise getDatas pour récupérer toutes les données des medias en fonction de l'ID.
        let datas = await this.getDatas();
        datas = datas.media;
        // On filtre les données des médias en fonction de l'ID du photographe passé en paramètre
        const filteredData = datas.filter(data => data.photographerId === parseInt(id));
        return filteredData;
    }
}