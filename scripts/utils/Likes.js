
export class Likes {

    constructor(mediaModelArray) {
        this.filteredDataMedia = mediaModelArray;
        this.allLikes=0;
    }

    render() {
        const allBtnLike = document.querySelectorAll(".btn-like");
       
        allBtnLike.forEach((data) => {
            data.addEventListener("click", (event) => {
                this.addEvent(event);
            })
        })

        this.calculAllLikes();
        this.showAllLikes();
    }

    addEvent(event) {
        let idButton = event.currentTarget.parentNode.getAttribute("data-id");
        let nbLike = document.querySelector(`.contenu-like[data-id="${idButton}"] .nb-like`);
        let btnLike = document.querySelector(`.contenu-like[data-id="${idButton}"] .btn-like`);
        // Ajout like élément cible
        if (btnLike.classList.contains("liked")) {
            btnLike.classList.remove("liked")
            let currentLikesBtn = parseInt(nbLike.textContent) || 0; // Nombre de likes actuel
            nbLike.textContent = currentLikesBtn - 1;

            // suppression d'un like compteur général
            this.removeLike();
        } else {
            btnLike.classList.add("liked")
            let currentLikesBtn = parseInt(nbLike.textContent) || 0; // Nombre de likes actuel
            nbLike.textContent = currentLikesBtn + 1;

            // Ajout de like compteur général
            this.addLike();
        }
        // Je trouve l'index du media cliqué
        const index = this.filteredDataMedia.findIndex(media => media.id == idButton);
        if (index !== -1) {
            // Je remplace l'ancienne valeur de this.filteredDataMedia[index].likes par la nouvelle
            this.filteredDataMedia[index].likes = parseInt(nbLike.textContent);
        }
        console.log("mediaFilter", this.filteredDataMedia)

    }

    calculAllLikes()  {
        // Reduce calcule chaque like de data en le stockant dans total (l'accumulateur) qui est défini à 0
        this.allLikes = this.filteredDataMedia.reduce((total, data) => total + data.likes, 0);
    }

    showAllLikes() {
        let likesCount=document.getElementById('allLikes');
        likesCount.textContent = this.allLikes;
    }

    addLike() {
        this.allLikes++;
        this.showAllLikes();
    }

    removeLike() {
        this.allLikes--;
        this.showAllLikes();
    }
}