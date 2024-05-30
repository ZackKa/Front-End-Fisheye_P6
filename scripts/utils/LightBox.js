export class LightBox {
    constructor(mediaModelArray) {
        this.medias = mediaModelArray;
        this.currentIndex = 0;
    }

    render() {

        const articleClick = document.querySelectorAll(".artcile-photographer figure a")
        articleClick.forEach((data, index) => {
            data.addEventListener("click", (event) => {
                this.currentIndex = index; // je récupère l'index du média ouvert
                this.mediaContent(event)
                this.openLightbox();           

            });
            data.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    this.mediaContent(event)
                    this.openLightbox();
                }
            });
        })
        let previousBtn = document.querySelector(".previousBtn")
        previousBtn.addEventListener('click', this.showPrevious.bind(this));
        // bind(this) sert à lier correctement le contexte de this à l'objet actuel

        let nextBtn = document.querySelector(".nextBtn")
        nextBtn.addEventListener('click', this.showNext.bind(this));

        // Navigation aux touches clavier
        document.addEventListener("keydown", (event) => {
            const lightbox = document.querySelector(".lightbox");
            if (lightbox.style.display === "flex") {
                if (event.key === "ArrowRight") {
                    console.log("ok next")
                    this.showNext()
                } else if (event.key === "ArrowLeft") {
                    console.log("ok prev")
                    this.showPrevious()
                }
            }
        });

        // lecture video avec touche espace
        document.addEventListener("keydown", (event) => {
            const figure = document.getElementById("mediaLightbox");
            const mediaElement = figure.querySelector("img, video");
            const lightbox = document.querySelector(".lightbox");
            if (lightbox.style.display === "flex") {
                if (event.key === " " && mediaElement.tagName === "VIDEO") {
                    event.preventDefault(); // Empêcher le comportement par défaut de la touche "Espace"
                    this.videoPlay() // Appeler une fonction pour démarrer ou mettre en pause la vidéo
                }
            }
        });

    }

    videoPlay() {
        const figure = document.getElementById("mediaLightbox");
        const mediaElement = figure.querySelector("img, video");
        if (mediaElement.paused) {
            mediaElement.play(); // Démarrer la lecture de la vidéo si elle est en pause
        } else {
            mediaElement.pause(); // Mettre en pause la vidéo si elle est en lecture
        }
    }

    openLightbox(){
        const open = document.querySelector(".lightbox")
        open.style.display = "flex"
        open.setAttribute("aria-hidden","false");


    }

    closeLightboxBtn(){
        const close = document.querySelector('.closeLightbox')
        close.addEventListener("click", () => {
            const open = document.querySelector(".lightbox")
            open.style.display = "none"
            open.setAttribute("aria-hidden","true");
            
            const figure = document.getElementById("mediaLightbox");
            const mediaElement = figure.querySelector("img, video");

            if (mediaElement) {
                mediaElement.remove(); // supprime l'image ou la vidéo de la balise figure
            }
            const lightboxTitre = document.getElementById("titreContenue");
            lightboxTitre.textContent = ''; // vide le contenue du texte
        });
    }

    mediaContent(event){

        // On parcourt les parents jusqu'à trouver un noeud correspondant
        let articleElement = event.target.closest("article");
        let mediaClick = articleElement.getAttribute("data-id");

        for (let i = 0; i < this.medias.length; i++) {
            if (this.medias[i].id == mediaClick) {
                let mediaRender = this.medias[i].getMedia()
                if (mediaRender.tagName === 'VIDEO') {
                    mediaRender.setAttribute('controls', 'true');
                }

                let mediaAffiche = document.getElementById("mediaLightbox")
                mediaAffiche.appendChild(mediaRender);

                let lightboxTitre = document.getElementById("titreContenue")
                lightboxTitre.textContent= `${this.medias[i].title}`;

                break; // Sortir de la boucle une fois que l'ID est trouvé
            }
        }
    }

    showPrevious() {
        // je récupère l'index grâce à l'opération modulo qui me renvoie le reste de la division
        this.currentIndex = (this.currentIndex - 1 + this.medias.length) % this.medias.length;
        this.updateMediaDisplay();
    }
    
    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.medias.length;
        this.updateMediaDisplay();
    }
    
    updateMediaDisplay() {
        let mediaRender = this.medias[this.currentIndex].getMedia();
        
        // On met l'attribut controls dans le cas où le média est une vidéo
        if (mediaRender.tagName === 'VIDEO') {
            mediaRender.setAttribute('controls', 'true');
        }
    
        const figure = document.getElementById("mediaLightbox");
        const mediaElement = figure.querySelector("img, video");

        // On vide la lightbox pour pouvoir afficher un autre media
        if (mediaElement) {
            mediaElement.remove(); // Cela supprime uniquement l'image ou la vidéo de la balise figure
        }
        figure.appendChild(mediaRender);
    
        let lightboxTitre = document.getElementById("titreContenue");
        lightboxTitre.textContent = this.medias[this.currentIndex].title;
    }

}