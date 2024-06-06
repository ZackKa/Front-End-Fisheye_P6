export class AsideTemplate {

    constructor(photographerModel) {
        this.photographerModel = photographerModel;


    }

    // On crée les éléments dans le DOM
    render(HtmlParent) {
        const aside = document.createElement('aside')
        aside.setAttribute("aria-label", "total de like et tarif")


        const photographerLikes = document.createElement('div');
        photographerLikes.classList.add('photographer_likes');
        photographerLikes.setAttribute("aria-label", "likes")
        aside.appendChild(photographerLikes);

        const likesCount = document.createElement('p');
        likesCount.id="allLikes"
        likesCount.classList.add('photographer_likes_count');
        likesCount.setAttribute("aria-label", "total like")
        photographerLikes.appendChild(likesCount);

        const countHeart = document.createElement('p');
        photographerLikes.appendChild(countHeart);
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-heart');
        countHeart.appendChild(icon);

        // je récupere le prix du photographe
        const priceElement = document.createElement('p');
        priceElement.textContent = `${this.photographerModel.price} € / jour`;
        aside.appendChild(priceElement);

        HtmlParent.appendChild(aside)
    }
}