
import { Api } from "./Api.js";
//PhotographerApi étend la classe Api
export class PhotographerApi extends Api {
    constructor(url) {
        super(url); // Appel constructor parent(url)
    }

    async getAll() {
        //La méthode getAll utilise getDatas pour récupérer toutes les données des photographes.
        let datas = await this.getDatas();
        //Elle retourne les données des photographes.
        return datas.photographers;
    }

    async getOne(id) {
        //La méthode getOne utilise getDatas pour récupérer toutes les données des photographes.
        let datas = await this.getDatas();
        datas = datas.photographers;
        // console.log("datas", datas)
        //getOne filtre les données pour trouver le photographe avec l'ID spécifié et le retourne.
        const filteredData = datas.filter(data => data.id === parseInt(id));
        // console.log("filteredData", filteredData)
        return filteredData[0];
    }
}