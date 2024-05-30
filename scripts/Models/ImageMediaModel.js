import {MediaModel} from "./MediaModel.js"
//On extends MediaModel pour hériter de ses propriétés
export class ImageMediaModel extends MediaModel {

    constructor(datas, photographerModel) {
        super(datas, photographerModel) // Appel constructor parent
        this.image=datas.image; 
        
        // On initialise l'image
    }

    //  les 3 fct a lettre dans like
    // getLike() {
    //     if (this.likes==null)
    //         return 0;
    //     return this.likes;
    // }

    // addLike() {
    //     this.likes++;
    // }

    // removeLike() {
    //     this.likes--;
    // }

    // getUrlMedia définie l'url de l'image grâce a la methode getFirstName
    getUrlMedia() {
        // console.log(this.photographerModel)
        return "assets/photographers/" + this.photographerModel.getFirstName() + "/" + this.image;
    }
    // On crée l'élément dans le DOM
    getMedia() {
        const img = document.createElement('img');
        img.setAttribute("src", this.getUrlMedia());
        img.setAttribute("alt", this.title);
        return img;
    }
}