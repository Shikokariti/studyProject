import { Render } from "../../services/render.js";
export class SiteDB {
    siteDBName;
    constructor() {
        this.siteDBName = 'siteDB';
        this.initDB();
    }

    getSites() {
        let sites = localStorage.getItem(this.siteDBName);
        sites = JSON.parse(sites);
        return sites;
    }

    addSiteToDb(newSite) {
        let existingSites = this.getSites();
        if (existingSites.length == 0) {
            newSite.id = 0;
        } else {
            existingSites.forEach((site, index)=>{
                if (existingSites.length-1 == index) {
                    newSite.id = site.id+1;
                }
            });
        }
        existingSites.push(newSite);
        localStorage.setItem(this.siteDBName, JSON.stringify(existingSites));
    }

    initDB() {
        if (localStorage.getItem('siteDB') == null) {
            localStorage.setItem(this.siteDBName,'[]');
        }
    }

    updateSites(sites) {
        localStorage.setItem(this.siteDBName, JSON.stringify(sites));
    }

    getSiteById(id) {
        let existingSites = this.getSites();
        let site = null;
        existingSites.forEach((object)=>{
            if (object.id == id) {
                site = object;
            }
        });
        return site;
    }

    deleteItem(siteID,itemID) {
        let sites = this.getSites();
        let site = sites.find(site => site.id == siteID);
        site.items.forEach((item, index)=>{
            if(item.id == itemID) {
                site.items.splice(index,1);
            }
        });
        this.updateSites(sites);
    }

    getItemByID(site,itemID) {
        let item;
        site.items.forEach((itemObj)=>{
            if(itemObj.id == itemID) {
                item = itemObj;
            }
        });
        return item;
    }

    getPromotions(siteID) {
        let site = this.getSiteById(siteID);
        return site.promotions;
    }

    deletePromotion(site,promotionID) {
        site.promotions.forEach((promotion, index)=>{
            if(promotion.id == promotionID) {
                site.promotions.splice(index,1);
            }
        });
        return site;
    }

    updatePromotion(site,promotionInput) {
        let index;
        site.promotions.forEach((promotion, indexToUpdate)=>{
            if(promotion.id == promotionInput.id) {
                index = indexToUpdate;
            }
        });
        site.promotions[index] = promotionInput;
        return site;
    }

    promotionValidation(promotion) {
        let render = new Render();
        let error;
        let valid = true;
        if (promotion.name.length < 2) {
            error = 'At least 2 characters';
            render.errorViewer(document.getElementById('promotion-name'),error);
            valid = false;
        }
        if(promotion.type != '1+1') {
            if (promotion.value.length <= 0) {
                error = 'Insert a value';
                render.errorViewer(document.getElementById('promotion-value'),error);
                valid = false;
            }
        }
        return valid;
    }
}

