import {ImageMediaModel} from "../Models/ImageMediaModel.js"
import {VideoMediaModel} from "../Models/VideoMediaModel.js"

export class MediaFactory{
    // On prend les données des médias et le modèle de photographe en paramètre
    constructor(datas, photographerModel) {
        // On initialise les propriétés
        this.datas=datas;
        this.photographerModel=photographerModel
    }

    create() {
        // On verifie une image existe dans les données des medias
        if (this.datas.image) {
            // On crée une instance d'ImageMediaModel
            return new ImageMediaModel(this.datas, this.photographerModel)
        }
        // Sino, on crée une instance de VideoMediaModel
        return new VideoMediaModel(this.datas, this.photographerModel)
    }

}
