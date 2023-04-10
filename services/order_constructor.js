import {SiteDB} from "./site_db.js";
import {Render} from "./render.js";

export class Order {
    id;
    createDate;
    items;
    priceBeforeDiscount;
    discount;
    priceAfterDiscount;
    constructor(currentSite) {
        this.id = this.idGenerator(currentSite);
        this.createDate = new Date();
        this.items = [];
        this.priceBeforeDiscount = 0;
        this.discount = 0;
        this.priceAfterDiscount = 0;
    }
    idGenerator(currentSite) {
        let id;
        if (currentSite.ordersHistory.length == 0) {
            id = 0;
        } else {
            currentSite.ordersHistory.forEach((order, index) => {
                if (currentSite.ordersHistory.length - 1 == index) {
                    id = order.id + 1;
                }
            });
        }
        return id;
    }
    addItems(item) {
        this.items.push(item);
        this.calcOrder();
    }
    calcOrder() {
        let total = 0;
        this.items.forEach((item)=>{
            total = Number(total) + Number(item.price);
        });
        this.priceBeforeDiscount = total;
        let render = new Render();
        render.renderCart(this)
    }
}

