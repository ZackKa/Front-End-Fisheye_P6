export class Filter {
    constructor(photographerPage) {
        // Initialisation
        this.photographerPage = photographerPage
        // console.log("Contenu de mediaModelArray avant le filtrage : ", this.photographerPage.renderMedias);

    }

    render() {
        this.optionsFilter();
        this.openCloseFilterMenu();
        this.setupDropdown();
    }

    setupDropdown() {
        // let btnDrop = document.querySelector(".btn_drop");

        let dropdownItems = document.querySelectorAll(".dropdown_content li");
        // const current_filter = document.getElementById("current_filter")
        // // Par défaut j'ordonne le tableau par titre
        // if (current_filter.textContent === "Titre") {
        //     // Trier this.mediaModelArray par titre dans l'ordre alphabétique
        //     this.mediaModelArray.sort((a, b) => a.title.localeCompare(b.title));
        // }

        dropdownItems.forEach((item, index) => {
            if (index === 0) {
                // item.classList.add("hidden");// Masquer le premier <li> au chargement
                item.style.display = "none";
            }

            item.addEventListener("click", () => {

                // Réinitialiser la visibilité de tous les éléments <li>
                dropdownItems.forEach(li => {
                    li.style.display = "block";
                    li.classList.remove("hidden");
                });
                let texteBtn = document.getElementById("current_filter")
                texteBtn.textContent = item.textContent;
                item.style.display = "none";
                // test //
                // let sectionMedia = document.querySelector('section');
                // sectionMedia.innerHTML = "";
                // test //
                this.optionsFilter();
            });
        });
    }

    optionsFilter(){
        const current_filter = document.getElementById("current_filter")
        // console.log("Contenu de current_filter.textContent : ", current_filter.textContent);
        // Vérifier si le texte de current_filter est "Popularité" avec trim qui supprime les espaces blancs
        if (current_filter.textContent.trim() === "Popularité") {
            this.mediaModelArray = this.photographerPage.mediaModelArray.sort((a, b) => b.likes - a.likes);
        } else if (current_filter.textContent.trim() === "Date"){
            this.mediaModelArray = this.photographerPage.mediaModelArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            // console.log("La condition Popularité est fausse");
        }else if(current_filter.textContent.trim() === "Titre"){
            this.mediaModelArray =this.photographerPage.mediaModelArray.sort((a, b) => a.title.localeCompare(b.title));
        }
        // test //
        // console.log("consol filter",this.photographerPage.renderMedias())
        // let sectionMedia = document.querySelector('section');
        // sectionMedia.innerHTML = "";
        this.photographerPage.renderMedias();
        // test //
        // this.photographerPage.renderMedias();





        
        // console.log("ediaModelArray Popularité : ", this.mediaModelArray);

        // // Vérifier si le texte de current_filter est "Date"
        // if (current_filter.textContent.trim() === "Date") {
        //     // Trier this.mediaModelArray par dates croissantes
        //     this.mediaModelArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        // } else {
        //     console.log("La condition Date est fausse");
        // }
        // // console.log("mediaModelArray Date : ", this.mediaModelArray);

        // // Vérifier si le texte de current_filter est "Titre"
        // if (current_filter.textContent.trim() === "Titre") {
        //     // Trier this.mediaModelArray par titre dans l'ordre alphabétique
        //     this.mediaModelArray.sort((a, b) => a.title.localeCompare(b.title));
        //     // this.mediaModelArray.sort(function (a, b) {
        //     //     return a.title.localeCompare(b.title);
        //     //   });
        // }else{
        //     console.log("La condition Titre est fausse")
        // }


        // console.log("mediaModelArray titre : ", this.mediaModelArray);




    }

    openCloseFilterMenu() {
        let boutonFiltre = document.querySelector(".btn_drop")
        boutonFiltre.addEventListener("click", () => {
            this.filterStyle()
        })
    }

    filterStyle() {

        const filterMenu = document.querySelector(".dropdown_content");
        const filterMenuButton = document.querySelector(".btn_drop");
        const filterButtons = document.querySelectorAll(".dropdown_content button");

        // Aria-expanded sert a indiqué si un élément est déployéi
        if (filterMenu.classList.contains("curtain_effect")) {
            filterMenuButton.setAttribute("aria-expanded", "false");
        } else {
            filterMenuButton.setAttribute("aria-expanded", "true");
        }


        // On ajoute ou supprime la class grâce a toggle
        filterMenu.classList.toggle("curtain_effect");
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        // On verifie si l'élément à la class ou non
        const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        // On met à jour l'attibut avec la valeur de newAriaHiddenValue
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        // Tabindex permet de gerer le focus du clavier
        const newTabIndexValue = filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        // On met à jour l'attribut tabindex avec la valeur de newTabIndexValue
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));

        if (filterMenu.classList.contains("curtain_effect")) {
            filterMenuButton.style.borderRadius = "5px 5px 0 0"
        } else { // On applique le style borderRadius avec un delai
            setTimeout(function () {
                filterMenuButton.style.borderRadius = "5px"
            }, 300);
        }
    }
}
