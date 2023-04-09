export class Item {
    id;
    name;
    description;
    price;
    image;
    inventory;
    constructor(name, description, price, currentSite) {
        this.id = this.idGenerator(currentSite);
        this.name = name;
        this.description = description;
        this.price = price;
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
}

