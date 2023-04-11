import { StateDB } from "../../services/state_db.js";
import { UsersDB } from "../../services/user_db.js";
import { SiteDB } from "../../services/site_db.js";
import { Item } from "../../services/item_constructor.js";
import { Render } from "../../services/render.js";


export class Helper {
    constructor() {
    }
    getState() {
        let stateDB = new StateDB();
        let state = stateDB.getState();
        return state;
    }
    updateState(state) {
        let stateDB = new StateDB();
        stateDB.updateState(state);
    }
    getActiveSite() {
        let state = this.getState();
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        let currentSite = sites.find(site => site.id == state.site);
        return currentSite;
    }
    geActiveUser() {
        let state = this.getState();
        let usersDB = new UsersDB();
        let users = usersDB.getUsers();
        let loggedInUser = users.find(user => user.id == state.user);
        return loggedInUser;
    }
    getSites() {
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        return sites;
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
            this.updateState(state)
            return item;
        }
    }
}