export class PhotographerTemplate {
    // On initialise la propriété photographeModel
    constructor(photographerModel) {
        this.photographerModel = photographerModel;
    }

    render() {



        //Créer 1 card pour 1 photographe
        const article = document.createElement('article');
        article.setAttribute("data-id", this.photographerModel.id)

        const lien = document.createElement('a');
        lien.classList.add('lien')
        lien.setAttribute("href","#")
        article.appendChild(lien)


        const img = document.createElement('img');
        img.setAttribute("src", this.photographerModel.picture)
        img.setAttribute("alt", this.photographerModel.name)
        img.setAttribute("aria-label", this.photographerModel.name)
        lien.appendChild(img);

        const button = document.createElement('button');
        button.classList.add('contact_button');
        button.setAttribute("aria-label", "contact me")
        button.textContent = "Contactez-moi";
        article.appendChild(button);

        const divContenue = document.createElement('div');
        divContenue.classList.add('descriptionPhotographer')
        article.appendChild(divContenue)

        const h2 = document.createElement('h2');
        h2.textContent = this.photographerModel.name;
        divContenue.appendChild(h2);

        if (window.location.href.includes("photographer.html")) {
            // Créer une nouvelle balise h1
            const h1Element = document.createElement("h1");
            h1Element.textContent = this.photographerModel.name;
            divContenue.appendChild(h1Element);
        }

        const lieu = document.createElement('p');
        lieu.textContent = this.photographerModel.city + ", " + this.photographerModel.country;
        lieu.classList.add("lieu");
        divContenue.appendChild(lieu);

        const phrase = document.createElement('p');
        phrase.textContent = this.photographerModel.tagline;
        phrase.classList.add("phrase");
        divContenue.appendChild(phrase);

        const prix = document.createElement('p');
        prix.textContent = this.photographerModel.price + " €/jour";
        prix.classList.add("prix");
        divContenue.appendChild(prix);

        return (article);

    }

}