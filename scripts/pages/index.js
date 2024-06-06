import {PhotographerApi} from "../Api/PhotographerApi.js"
import {PhotographerModel} from "../Models/PhotographerModel.js"
import {PhotographerTemplate} from "../Templates/PhotographerTemplate.js"

class App {
    //Le constructeur initialise la classe en créant une instance de PhotographerApi
    constructor() {
        this.photographerApi=new PhotographerApi("data/photographers.json");
    }

    //La méthode init() initialise les données du photographe en appelant les méthodes appropriées
    async init() {
        this.datas=await this.photographerApi.getAll();
        console.log("index", this.datas);
        this.render();
        this.renderPhotographer();
    }

    render() {

        let html=document.querySelector(".photographer_section");

        // On fait une boucle des photographe
        this.datas.forEach((data) => {
            let photographerModel=new PhotographerModel(data);
            let photographerTemplate=new PhotographerTemplate(photographerModel);
            html.appendChild(photographerTemplate.render());
        })

        if (window.location.href.includes("index.html")) {
            const liens = document.querySelectorAll(".lien");
            liens.forEach(lien => {
                lien.setAttribute("role","link");
                lien.setAttribute("tabindex","0");
            });
            const buttons = document.querySelectorAll(".contact_button");
            buttons.forEach(button => {
                button.remove();
            });

            const articles = document.querySelectorAll("article");
            // Parcourir chaque article et attacher le h2 au lien a
            articles.forEach(article => {
                const h2 = article.querySelector("h2");
                const lien = article.querySelector("a");
                lien.appendChild(h2);
            });
        }
    }
    // On écoute le click sur les articles et on redirige vers la page avec l'id du photographe dans l'url
    renderPhotographer() {
        let articles = document.querySelectorAll("article");
        articles.forEach(article => {
            article.addEventListener("click", (event) => {
                this.redirectionRender(event)
            });
        });
        articles.forEach(article => {
            article.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    this.redirectionRender(event)
                }
            });
        });
    }

    redirectionRender(event){
        let idArticle = event.currentTarget.getAttribute("data-id");
        console.log("ID de l'élément cliqué :", idArticle);
        window.location.href = "photographer.html?id=" + idArticle;
    }

}

let myApp = new App();

await myApp.init();

/*

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    let photographers = [
        {
            "name": "Ma data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ]
    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: [...photographers, ...photographers, ...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

*/