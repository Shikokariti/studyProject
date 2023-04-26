import { StateDB } from "../../services/state_db.js";
import { UsersDB } from "../../services/user_db.js";
import { User } from "../../services/user_constructor.js";
import { Site } from "../../services/site_constructor.js";
import { SiteDB } from "../../services/site_db.js";
import { Item } from "../../services/item_constructor.js";
import { Promotion } from "../../services/promotion_constructor.js";
import { Render } from "../../services/render.js";


export class Helper {
    stateDB;
    usersDB;
    siteDB;
    render;
    constructor() {
        this.stateDB = new StateDB();
        this.usersDB = new UsersDB();
        this.siteDB = new SiteDB();
        this.render = new Render();
    }

    createUser() {
        return new User();
    }

    updateUser(userToUpdate) {
        this.usersDB.updateUser(userToUpdate);
    }

    checkIfExistUserByEmail(userEmail) {
        return this.usersDB.checkIfExistUserByEmail(userEmail);
    }

    addUserToDb(user) {
        this.usersDB.addUserToDb(user);
    }

    getState() {
        return this.stateDB.getState();
    }

    getActivePromotions() {
        let state = this.stateDB.getState();
        let sitePromotions = this.siteDB.getPromotions(state.site);
        let activePromotions = [];
        sitePromotions.forEach((promotion)=>{
           if (promotion.active == true) {
               activePromotions.push(promotion);
           }
        });
        return activePromotions;
    }

    updateState(state) {
        this.stateDB.updateState(state);
    }

    getActiveSite() {
        let state = this.getState();
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        return sites.find(site => site.id == state.site);
    }

    getUsers(){
        return this.usersDB.getUsers();
    }

    geActiveUser() {
        let state = this.getState();
        let usersDB = new UsersDB();
        let users = usersDB.getUsers();
        let loggedInUser = users.find(user => user.id == state.user);
        return loggedInUser;
    }

    getUserByEmail(userEmail){
        return this.usersDB.getUserByEmail(userEmail);
    }

    getSites() {
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        return sites;
    }

    createSite(siteName) {
        return new Site(siteName)
    }

    addSiteToDb(site) {
        this.siteDB.addSiteToDb(site);
    }

    updateSite(siteToUpdate) {
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        let siteIndex;
        sites.forEach((site,index)=>{
            if(site.id === siteToUpdate.id) {
                siteIndex = index;
            }
        });
        sites[siteIndex] = siteToUpdate;
        siteDB.updateSites(sites);
    }

    deleteItem(site,item) {
        let siteDB = new SiteDB();
        siteDB.deleteItem(site,item);
    }

    async createItem(itemName, itemDescription, itemPrice, currentSite, itemImage) {
        let item = new Item(itemName, itemDescription, itemPrice, currentSite, itemImage);
        let isValid = await item.isValidItem();
        if (isValid) {
            let site = this.getActiveSite();
            site.items.push(item);
            this.updateSite(site);
            let state = this.getState();
            state.item = item.id;
            this.updateState(state);
            return item;
        }
    }

    createPromotion(site,promotionInput) {
        let promotion;
        let valid;
        if (promotionInput.type == '1+1') {
            promotion = new Promotion(site,promotionInput.name,promotionInput.type,'',promotionInput.active,promotionInput.unlimited,promotionInput.buy,promotionInput.get);
            valid = this.siteDB.promotionValidation(promotion);
        } else {
            promotion = new Promotion(site,promotionInput.name,promotionInput.type,promotionInput.value,promotionInput.active,'','','');
            valid = this.siteDB.promotionValidation(promotion);
        }
        if (valid) {
            site.promotions.push(promotion);
            let state = this.getState();
            state.promotion = promotion.id;
            this.updateState(state);
            this.updateSite(site);
            return true;
        }
        return false;
    }

    updatePromotion(promotionInput) {
        let promotionToUpdate = this.getPromotionToEdit();
        let valid;
        if (promotionInput.type == '1+1') {
            promotionToUpdate.name = promotionInput.name;
            promotionToUpdate.active = promotionInput.active;
            promotionToUpdate.unlimited = promotionInput.unlimited;
            promotionToUpdate.buy = promotionInput.buy;
            promotionToUpdate.get = promotionInput.get;
        } else {
            promotionToUpdate.name = promotionInput.name;
            promotionToUpdate.value = promotionInput.value;
            promotionToUpdate.active = promotionInput.active;
        }
        valid = this.siteDB.promotionValidation(promotionToUpdate);
        if (valid) {
            let site = this.getActiveSite();
            let updatedSite = this.siteDB.updatePromotion(site,promotionToUpdate);
            this.updateSite(updatedSite);
            return true;
        }
        return false;
    }

    getItemByID(itemID) {
        let site = this.getActiveSite();
        let siteDB = new SiteDB();
        let item = siteDB.getItemByID(site,itemID)
        return item;
    }

    openEditPromotionPopup() {
        let state = this.getState();
        if (state.promotion == null) {
            document.getElementById('no-promotion-selected-error-section').style.display = 'block';
        } else {
            let site = this.getActiveSite();
            let promotionID = state.promotion;
            let promotion = site.promotions.find(promotion => promotion.id === promotionID);
            this.render.renderEditPromotionPopup(site,promotion);
        }
    }

    deletePromotion() {
        let site = this.getActiveSite();
        let state = this.getState();
        let siteAfterDeletePromotion = this.siteDB.deletePromotion(site,state.promotion);
        this.updateSite(siteAfterDeletePromotion);
        this.render.renderPromotions(siteAfterDeletePromotion.promotions)
    }

    getPromotionToEdit() {
        let site = this.getActiveSite();
        let state = this.getState();
        let promotion = site.promotions.find(promotion => promotion.id == state.promotion);
        return promotion;
    }
}