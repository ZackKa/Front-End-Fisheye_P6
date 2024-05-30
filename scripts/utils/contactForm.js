export class ContactForm {

    constructor(filteredData) {
        this.filteredData = filteredData
    }

    render() {
        const nomForm = document.querySelector(".modal-header-h2")
        const nom = document.createElement("span")
        nom.textContent = `${this.filteredData.name}`
        nomForm.appendChild(nom)

        this.initEvents()
    }

    displayModal() {
        const modalBtn = document.querySelector(".contact_button");
        modalBtn.addEventListener("click", function () {
            const modal = document.getElementById("contact_modal");
            modal.style.display = "flex"
            modal.setAttribute("aria-hidden","false");
        });
    }

    closeModal() {
        const modalBtn = document.querySelector(".modal_close");
        modalBtn.addEventListener("click", () => {
            this.eventCloseModal()
        });
        modalBtn.addEventListener("keypress", (event) => {
            console.log("holla")
            if (event.key === "Enter" && document.activeElement === modalBtn) {
                event.preventDefault();
                this.eventCloseModal()
            }
        });
    }

    eventCloseModal(event){
        const modal = document.getElementById("contact_modal");
            modal.style.display = "none"
            modal.setAttribute("aria-hidden","true");
    }

    initEvents() {
        let prenom = document.getElementById("firstname")
        let nom = document.getElementById("lastname")
        let email = document.getElementById("email")
        let message = document.getElementById("message")
        let form = document.querySelector("form")
        // J'Init mes évènements qui vérifient les champs grâce aux fonctions appelées
        prenom.addEventListener("change", () => { this.checkPrenom() })
        nom.addEventListener("change", () => { this.checkNom() })
        email.addEventListener("change", () => { this.checkEmail() })
        message.addEventListener("change", () => { this.checkMessage() })

        form.addEventListener("submit", (event) => {
            event.preventDefault()
            if (!this.checkForm()) { // Je vérifie le boolean de la fonction
                event.preventDefault() // Empêcher le rechargement de la page si les champs ne sont pas valides
                console.log("Un soucis avec les champs")
            } else {
                event.preventDefault()
                console.log("champ prenom :", prenom.value)
                console.log("champ nom :", nom.value)
                console.log("champ email :", email.value)
                console.log("champ message :", message.value)
                this.sendForm() // Je vérifie le boolean de la fonction et j'appelle showMessageConfirmation
            }
        })
    }

    sendForm() {
        let form = document.querySelector("form")
        if (this.checkForm()) {
            form.reset() // Je vide le form
            const modal = document.getElementById("contact_modal");
            modal.style.display = "none"
            return true

        }
        return false
    }

    checkForm() {
        // si tout les champs sont remplis
        if (this.checkPrenom() && this.checkNom() && this.checkEmail() && this.checkMessage()) {

            return true
        }

        return false
    }

    checkInputText(id) {
        let input = document.getElementById(id)
        this.hideErrorMessage(input)

        if (input.value === "" || input.value === null || input.value.length < 2) {
            this.showError(input)

            return false
        }

        return true
    }

    checkPrenom() {
        return this.checkInputText("firstname")
    }
    checkNom() {
        return this.checkInputText("lastname")
    }

    checkEmail() {
        let email = document.getElementById("email")
        this.hideErrorMessage(email)
        // Je définis l'expression régulière que doit avoir mon champ email
        let emailRegExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-_.]+\.[a-zA-Z0-9-_.]+$/)
        // Je test la valeur de l'email
        if (!emailRegExp.test(email.value)) {
            this.showError(email)

            return false
        }

        return true
    }

    checkMessage() {
        let input = document.getElementById("message")

        this.hideErrorMessage(input)

        if (input.value === "" || input.value === null || input.value.length < 2 || input.value.length > 300) {
            this.showError(input)

            return false
        }

        return true
    }

    showError(input) {
        const errorMessages = {
            firstname: "Entrer 2 caractères ou plus",
            lastname: "Entrer 2 caractères ou plus",
            email: "Entrer une adresse mail valide",
            message: "Minimum 2 caractères et maximum 300 caractères",

        }

        const formControl = input.parentElement
        // J'ajoute un attribut en fonction du champ du formulaire qui est en erreur
        formControl.setAttribute('data-error', errorMessages[input.name])
        formControl.setAttribute('data-error-visible', 'true')
    }

    hideErrorMessage(input) {
        const formControl = input.parentElement
        // Je retire l'attribut correspondant à l'erreur
        formControl.removeAttribute('data-error')
        formControl.removeAttribute('data-error-visible')
    }

}