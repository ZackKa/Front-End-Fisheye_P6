export class LightBox {
    constructor(mediaModelArray) {
        this.medias = mediaModelArray;
        this.currentIndex = 0;
    }

    render() {
        const articleClick = document.querySelectorAll(".article-photographer figure a")
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
                    this.showNext()
                } else if (event.key === "ArrowLeft") {
                    this.showPrevious()
                }
            }
        });

        this.closeLightboxBtn()
        this.trapFocusIn()
        this.esc()
        

    }

    openLightbox() {
        const open = document.querySelector(".lightbox")
        open.style.display = "flex"
        open.setAttribute("aria-hidden", "false");
        open.setAttribute("tabindex", "0")
        open.focus()
    }

    closeLightboxBtn() {
        const close = document.querySelector('.closeLightbox')
        close.addEventListener("click", () => {
            this.eventCloseLightbox();
        });
    }

    eventCloseLightbox() {
        const open = document.querySelector(".lightbox")
        open.style.display = "none"
        open.setAttribute("aria-hidden", "true");
        open.setAttribute("tabindex", "-1")

        const figure = document.getElementById("mediaLightbox");
        const mediaElement = figure.querySelector("img, video");

        if (mediaElement) {
            mediaElement.remove(); // supprime l'image ou la vidéo de la balise figure
        }
        const lightboxTitre = document.getElementById("titreContenue");
        lightboxTitre.textContent = ''; // vide le contenue du texte
    }

    mediaContent(event) {

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
                const mediaElement = mediaAffiche.querySelector("img, video");
                mediaElement.setAttribute("aria-label", "lilac breasted roller")

                let lightboxTitre = document.getElementById("titreContenue")
                lightboxTitre.textContent = `${this.medias[i].title}`;

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

    trapFocusIn() {
        const modal = document.querySelector(".lightbox");
        modal.addEventListener("keydown", (event) => {
            let isTabPressed = event.key === "Tab";

            if (!isTabPressed) {
                return;
            }

            let focusableElement = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            let firstFocusableElement = focusableElement[0];
            let lastFocusableElement = focusableElement[focusableElement.length - 1];

            if (event.shiftKey) {
                // si shift est pressed pour shift + tab
                if (document.activeElement === firstFocusableElement) {
                    // revoyer le focus sur le dernier élément focus
                    lastFocusableElement.focus();
                    event.preventDefault();
                }
            } else {
                // si tab est pressed
                if (document.activeElement === lastFocusableElement) {
                    // revoyer le focus sur le premier élément
                    firstFocusableElement.focus();
                    event.preventDefault();
                }
            }

        });
    }

    esc() {
        document.addEventListener("keydown", (event) => {
            const lightbox = document.querySelector(".lightbox");
            if (lightbox.style.display === "flex") {
                if (event.key === "Escape") {
                    this.eventCloseLightbox();

                }
            }
        });
    }
}