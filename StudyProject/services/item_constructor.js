import { Render } from "../../services/render.js";
export class Item {
    id;
    name;
    description;
    price;
    image;
    inventory;
    constructor(name, description, price, currentSite, image) {
        this.id = this.idGenerator(currentSite);
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.inventory = null;
    }

    idGenerator(currentSite) {
        let id;
        if (currentSite.items.length == 0) {
            id = 0;
        } else {
            currentSite.items.forEach((item, index) => {
                if (currentSite.items.length - 1 == index) {
                    id = item.id + 1;
                }
            });
        }
        return id;
    }

    async isValidItem() {
        let render = new Render();
        let error;
        if (this.name.length < 1) {
            error = 'Insert a name';
            render.errorViewer(document.getElementById('item-name'),error);
            return false;
        } else if (this.price == '') {
            render.removeProperty('border', document.getElementById('item-name'));
            error = 'Insert a price';
            render.errorViewer(document.getElementById('item-price'), error);
            return false;
        } else {
            return await this.isValidItemImage();
        }
    }

    async isValidItemImage() {
        let render = new Render();
        render.removeProperty('border', document.getElementById('item-name'));
        render.removeProperty('border', document.getElementById('item-price'));
        let error;
        console.log(this.image);
        let imageVerification = await fetch(this.image);
        console.log(imageVerification.status);
        if(imageVerification.status != 200) {
            error = 'URL is not valid';
            render.errorViewer(document.getElementById('item-image'),error);
            return false;
        } else {
            return true
        }
    }
}



