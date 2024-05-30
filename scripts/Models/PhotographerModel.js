
export class PhotographerModel {
    // On initialise les données du photographe
    constructor(datas) {
        this.name=datas.name;
        this.id=datas.id;
        this.city=datas.city;
        this.country=datas.country;
        this.tagline=datas.tagline;
        this.price=datas.price;
        this.portrait=datas.portrait;
        this.picture=`assets/photographers/${this.portrait}`
    }
    getFirstName(){
        // On divise le nom du photographe
        let data=this.name.split(' ');
        // On retourne le premier élément en remplaçant les tirets par des espaces
        return  data[0].replace("-"," ");
    }
    
}