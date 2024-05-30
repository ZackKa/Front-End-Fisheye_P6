export class MediaTemplate {
    // On initialise la propriété MediaModel
    constructor (MediaModel) {
        this.MediaModel=MediaModel;
        
    }


    render() {

        //Créer 1 card pour 1 photographe
        const article = document.createElement( 'article' );
        article.classList.add('artcile-photographer');
        article.setAttribute("data-id", this.MediaModel.id);

        const figure = document.createElement( 'figure' );
        article.appendChild(figure);

        const lien = document.createElement ('a');
        lien.setAttribute("tabindex","0")
        lien.setAttribute("aria-label","lightbox, closeup view")
        figure.appendChild(lien)

        // On appelle getMedia pour afficher l'image ou la video dans figure
        lien.appendChild(this.MediaModel.getMedia());

        const contenueMedia = document.createElement('figcaption');
        contenueMedia.classList.add('contenu-fichier');
        figure.appendChild(contenueMedia);

        const h2 = document.createElement( 'h2' );
        h2.textContent = this.MediaModel.title;
        contenueMedia.appendChild(h2);

        const contenuelike = document.createElement('div');
        contenuelike.classList.add('contenu-like');
        contenuelike.setAttribute("aria-label", "likes")
        contenuelike.setAttribute("data-id", this.MediaModel.id);
        contenueMedia.appendChild(contenuelike);

        const like = document.createElement( 'p' );
        like.textContent = this.MediaModel.likes;
        like.classList.add('nb-like');
        contenuelike.appendChild(like);

        const heart = document.createElement('button');
        heart.classList.add('btn-like');
        heart.setAttribute("type","button");
        heart.setAttribute("aria-label","add or remove a like");
        contenuelike.appendChild(heart);

        const icon = document.createElement('i')
        icon.classList.add('fa-solid', 'fa-heart');
        heart.appendChild(icon)


        return (article);
    
    }
    
}