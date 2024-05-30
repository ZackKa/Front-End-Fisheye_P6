export class AsideTemplate {

    constructor(photographerModel) {
        this.photographerModel = photographerModel;


    }

    // On crée les éléments dans le DOM
    render() {
        const aside = document.createElement('aside')

        const photographerLikes = document.createElement('div');
        photographerLikes.classList.add('photographer_likes');
        photographerLikes.setAttribute("aria-label", "likes")
        aside.appendChild(photographerLikes);

        const likesCount = document.createElement('p');
        likesCount.id="allLikes"
        likesCount.classList.add('photographer_likes_count');
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

        return (aside);
    }
}