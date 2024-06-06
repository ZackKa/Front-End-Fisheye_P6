export class LightboxTemplate {

    // On crée les éléments dans le DOM
    render(HtmlParent) {
        const modalLigthbox = document.createElement('div');
        modalLigthbox.classList.add('lightbox');
        modalLigthbox.setAttribute("aria-modal","false");
        modalLigthbox.setAttribute("aria-hidden","true");
        modalLigthbox.setAttribute("role","dialog")

        const contentLigthbox = document.createElement('div');
        contentLigthbox.classList.add('contentLigthbox');
        contentLigthbox.setAttribute("aria-label", "media closeup view")
        modalLigthbox.appendChild(contentLigthbox);

        const closeLightbox = document.createElement('button')
        closeLightbox.classList.add('closeLightbox', 'lightboxBtn');
        closeLightbox.setAttribute("type","button");
        closeLightbox.setAttribute("aria-label","Close dialog");
        contentLigthbox.appendChild(closeLightbox);
        const icon = document.createElement('i')
        icon.setAttribute("title","Close dialog")
        icon.classList.add('fa-solid', 'fa-xmark');
        closeLightbox.appendChild(icon);

        const previousBtn = document.createElement('button')
        previousBtn.classList.add('previousBtn', 'lightboxBtn');
        previousBtn.setAttribute("type","button");
        previousBtn.setAttribute("aria-label","Previous image");
        contentLigthbox.appendChild(previousBtn);
        const previousIcon = document.createElement('i');
        previousIcon.classList.add('fa-solid', 'fa-less-than');
        previousIcon.setAttribute("title","Previous image")
        previousBtn.appendChild(previousIcon);

        const nextBtn = document.createElement('button')
        nextBtn.classList.add('nextBtn', 'lightboxBtn');
        nextBtn.setAttribute("type","button");
        nextBtn.setAttribute("aria-label","Next image");
        contentLigthbox.appendChild(nextBtn);
        const nextIcon = document.createElement('i');
        nextIcon.classList.add('fa-solid', 'fa-greater-than');
        nextIcon.setAttribute("title","Next image")
        nextBtn.appendChild(nextIcon);

        const figure = document.createElement('figure')
        figure.id="mediaLightbox"
        contentLigthbox.appendChild(figure)
        
        const figcaption = document.createElement('figcaption')
        figcaption.id="titreLightbox"
        figure.appendChild(figcaption)

        const lightboxTitre = document.createElement('h2')
        lightboxTitre.id="titreContenue"
        lightboxTitre.setAttribute("aria-label","intitulé du média");
        figcaption.appendChild(lightboxTitre)

        HtmlParent.appendChild(modalLigthbox);
    }
}