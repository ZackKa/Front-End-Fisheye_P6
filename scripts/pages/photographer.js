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
        // On appelle la méthode render
        this.render();
    }


    //La méthode getId() récupère l'ID du photographe à partir de l'URL
    getId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    renderPhotographe() {
        // On sélectionne l'élément "photograph-header"
        let html = document.querySelector(".photograph-header");

        // On crée une instance de PhotographerModel à partir des données du photographe (this.filteredData)
        this.photographerModel = new PhotographerModel(this.filteredData);
        //Et utilise PhotographerTemplate pour générer le contenu grâce à photographerModel
        let photographerTemplate = new PhotographerTemplate(this.photographerModel);
        html.appendChild(photographerTemplate.render());

        this.removeH2()
    }

    render() {
        this.renderPhotographe();

        this.main = document.querySelector("main");

        const lightboxTemplate = new LightboxTemplate();
        lightboxTemplate.render(this.main)

        let asideTemplate = new AsideTemplate(this.photographerModel);
        asideTemplate.render(this.main)

        this.createMediaModelArray()
        this.renderMedias();

        // Ouverture et fermeture du form
        const contactForm = new ContactForm(this.filteredData);
        contactForm.render();

        let filter = new Filter(this);
        filter.render();

    }

    createMediaModelArray() {
        this.mediaModelArray = [];
        this.filteredDatasMediaJson.forEach((data) => {
            // on crée des instances pour chaque média avec les datas des medias et le photographerModel et on appel create qui verifie si le medias contient une image ou une video
            let MediaModel = new MediaFactory(data, this.photographerModel).create();
            this.mediaModelArray.push(MediaModel)
        })
    }

    renderMedias() {
        // On filtre les données des médias en fonction de l'ID du photographe

        let sectionMedia = null;
        if (document.getElementById('sectionMedia') != null) {
            sectionMedia = document.getElementById('sectionMedia');
        } else {
            sectionMedia = document.createElement('section');
            sectionMedia.id = 'sectionMedia';
            sectionMedia.classList.add("sectionPhotographer")
        }

        sectionMedia.innerHTML = ""; // Effacer le contenu actuel
        this.mediaModelArray.forEach((mediaModel) => {
            let mediaTemplate = new MediaTemplate(mediaModel);
            sectionMedia.appendChild(mediaTemplate.render())

        });

        const lightBox = new LightBox(this.mediaModelArray);
        lightBox.render();

        const like = new Likes(this.mediaModelArray);
        like.render()

        this.main.appendChild(sectionMedia);
        
    }

    removeH2() {
        // Suppression de la balise h2 dans la page du photographe
        if (window.location.href.includes("photographer.html")) {
            // Sélection de la balise h2 du header
            const h2Element = document.querySelector(".photograph-header h2");
            if (h2Element) {
                h2Element.remove();
            }
            const lien = document.querySelector(".photograph-header a")
            lien.setAttribute("tabindex","-1")
        }
    }

}

// Crée une instance de la classe App et appelle la méthode init() pour démarrer le processus.
let myApp = new App();

await myApp.init();