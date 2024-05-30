import {MediaModel} from "./MediaModel.js"
//On extends MediaModel pour hériter de ses propriétés
export class VideoMediaModel extends MediaModel {

    constructor(datas, photographerModel) {
        super(datas, photographerModel) // Appel constructor parent
        this.video=datas.video; // On initialise la video
    }
    // getUrlMedia définie l'url de l'image grâce a la methode getFirstName
    getUrlMedia() {
        return "assets/photographers/" + this.photographerModel.getFirstName() + "/" + this.video;
    }
    // On crée l'élément dans le DOM
    getMedia() {
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute("src", this.getUrlMedia());
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);
        return video;
    }
}