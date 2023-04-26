export class Promotion {
    id;
    name;
    type;
    value;
    active;
    unlimited;
    buy;
    get;
    constructor(currentSite,name,type,value,active,unlimited,buy,get) {
        this.id = this.idGenerator(currentSite)
        this.name = name;
        this.type = type;
        this.value = value;
        this.active = active;
        this.buy = buy;
        this.get = get;
        this.unlimited = unlimited;
    }

    idGenerator(currentSite) {
        let id;
        if (currentSite.promotions.length == 0) {
            id = 0;
        } else {
            currentSite.promotions.forEach((promotion, index) => {
                if (currentSite.promotions.length - 1 == index) {
                    id = promotion.id + 1;
                }
            });
        }
        return id;
    }
}