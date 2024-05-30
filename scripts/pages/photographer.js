//Mettre le code JavaScript lié à la page photographer.html
import { MediaApi } from "../Api/MediaApi.js"
import { PhotographerApi } from "../Api/PhotographerApi.js"
import { MediaFactory } from "../Factory/MediaFactory.js"
import { PhotographerModel } from "../Models/PhotographerModel.js"
import { MediaTemplate } from "../Templates/MediaTemplate.js"
import { PhotographerTemplate } from "../Templates/PhotographerTemplate.js"
import { AsideTemplate } from "../Templates/AsideTemplate.js"
import { ContactForm } from "../utils/contactForm.js";
import { LightBox } from "../utils/LightBox.js"
import { Likes } from "../utils/Likes.js"
import { Filter } from "../utils/Filter.js"
import { LightboxTemplate } from "../Templates/LightboxTemplate.js"
class App {
    constructor() {
        //Le constructeur initialise la classe en créant une instance de PhotographerApi et MediaApi
        this.photographerApi = new PhotographerApi("data/photographers.json");
        this.MediaApi = new MediaApi("data/photographers.json");

    }

    //La méthode init() initialise les données du photographe et des médias en appelant les méthodes appropriées
    async init() {
        // this.filteredData renvoie le profil photographe correspondant à l'Id passé dans l'url de la page
        this.filteredData = await this.photographerApi.getOne(this.getId());
        // this.filteredDataMediaJson renvoie les medias correspondants à l'Id passé dans l'url de la page
        this.filteredDatasMediaJson = await this.MediaApi.getAllForOnePhotographer(this.getId());
        // console.log("filteredData", this.filteredData);
        // console.log("filteredDataMedia", this.filteredDatasMediaJson);
        // this.datasMedia renvoie tous les medias
        // On appelle la méthode render
        this.render();
    }


    //La méthode getId() récupère l'ID du photographe à partir de l'URL
    getId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    render() {
        // On sélectionne l'élément "photograph-header"
        let html = document.querySelector(".photograph-header");

        // On crée une instance de PhotographerModel à partir des données du photographe (this.filteredData)
        let photographerModel = new PhotographerModel(this.filteredData);
        console.log("photographe", photographerModel)
        //Et utilise PhotographerTemplate pour générer le contenu grâce à photographerModel
        let photographerTemplate = new PhotographerTemplate(photographerModel);
        html.appendChild(photographerTemplate.render());


        // On filtre les données des médias en fonction de l'ID du photographe
        let main = document.querySelector("main");
        const sectionMedia = document.createElement('section');
        sectionMedia.classList.add("sectionPhotographer")

        let mediaModelArray=[];
        // On fait une boucle des medias
        this.filteredDatasMediaJson.forEach((data) => {
            // console.log("Contenu de mediaModelArray pho.js : ", mediaModelArray);
            
            // on crée des instances pour chaque média avec les datas des medias et le photographerModel et on appel create qui verifie si le medias contient une image ou une video
            let MediaModel = new MediaFactory(data, photographerModel).create();
            mediaModelArray.push(MediaModel)
            // console.log('Manu : MediaModel',mediaModelArray.length);
            //On utilise MediaTemplate pour générer le contenu grâce à MediaModel
            let mediaTemplate = new MediaTemplate(MediaModel);
            // On appelle la méthode render de mediaTemplate et on la lie a sectionMedia
            sectionMedia.appendChild(mediaTemplate.render());

            // console.log("array avant", mediaModelArray)            
            sectionMedia.innerHTML = ""; // Effacer le contenu actuel
            
            new Filter(mediaModelArray).optionsFilter();
            mediaModelArray.forEach((mediaModel) => {
                let mediaTemplate = new MediaTemplate(mediaModel);
                sectionMedia.appendChild(mediaTemplate.render());
                 
            });
        })
        
        console.log("array apres", mediaModelArray)

        main.appendChild(sectionMedia);
        console.log("Data filtrer Id", this.filteredDatasMediaJson);
        
        // On crée une instance de AsideTemplate en passant les données du photographe et ses médias filtrés
        let asideTemplate = new AsideTemplate(photographerModel );
        main.appendChild(asideTemplate.render())

        // Ouverture et fermeture du form
        const contactForm = new ContactForm(this.filteredData);
        contactForm.displayModal();
        contactForm.closeModal();
        contactForm.render();

        const lightboxTemplate = new LightboxTemplate();
        main.appendChild(lightboxTemplate.render())

        const lightBox = new LightBox(mediaModelArray);
        // main.appendChild(lightBox.render())
        lightBox.render();
        lightBox.closeLightboxBtn();

        const like = new Likes (mediaModelArray);
        like.render()

        const filter = new Filter(mediaModelArray);
        filter.openCloseFilterMenu();
        filter.setupDropdown();

    }

}

// Crée une instance de la classe App et appelle la méthode init() pour démarrer le processus.
let myApp = new App();

await myApp.init();