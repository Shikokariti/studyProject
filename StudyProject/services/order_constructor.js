import { Helper } from "../../services/helper_constructor.js";
import { Render } from "../../services/render.js";

export class Order {
    id;
    createDate;
    items;
    promotions;
    totalBeforeDiscount;
    discount;
    totalAfterDiscount;
    constructor(currentSite) {
        this.id = this.idGenerator(currentSite);
        this.createDate = new Date();
        this.items = [];
        this.promotions = [];
        this.totalBeforeDiscount = 0;
        this.discount = 0;
        this.totalAfterDiscount = 0;
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

    removeItems(itemToRemove) {
        let itemIndex;
        this.items.forEach((item,index)=>{
            if (item == itemToRemove) {
                itemIndex = index;
            }
        });
        this.items.splice(itemIndex,1);
        this.calcOrder();
    }

    calcOrder() {
        let helper = new Helper();
        if(this.items.length == 0) {
            this.totalBeforeDiscount = 0;
            this.totalAfterDiscount = 0;
            this.promotions = [];
        } else {
            this.items.forEach((item)=>{
                this.totalBeforeDiscount = Number(this.totalBeforeDiscount) + Number(item.price);
            });
            let sitePromotions = helper.getActivePromotions();
            this.promotions = this.promotionEngine(sitePromotions);
            this.totalAfterDiscount = this.totalBeforeDiscount;
            this.promotions.forEach((promotion)=>{
                this.totalAfterDiscount = this.totalAfterDiscount - promotion.value;
            });
        }
        let render = new Render();
        render.renderCart(this)
    }

    promotionEngine(promotions) {
        let orderPromotions = [];
        promotions.forEach((promotion)=>{
           if (promotion.type == "Percentage") {
               let discountValue = (promotion.value / 100) * this.totalBeforeDiscount;
               discountValue = discountValue.toFixed(2);
               orderPromotions.push({promotionID: promotion.id, name: promotion.name, value: discountValue});
           } else if (promotion.type == "Amount") {
               orderPromotions.push({promotionID: promotion.id, name: promotion.name, value: promotion.value});
           } else if (promotion.type == "1+1") {

           }
        });
        return orderPromotions;
    }
}

