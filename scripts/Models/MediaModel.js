export class MediaModel {

    // On initialise les données du media et du photographe
    constructor(datas, photographerModel) {
        this.id=datas.id;
        this.photographerId=datas.photographerId;
        this.title=datas.title;
        this.likes=datas.likes;
        this.date=datas.date;
        this.price=datas.price;

        this.photographerModel=photographerModel
    }

}