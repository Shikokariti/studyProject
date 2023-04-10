import { SiteDB } from '../../services/site_db.js';
import { StateDB } from "../../services/state_db.js";
import { Render } from "../../services/render.js";
import { Order } from "../../services/order_constructor.js";


let stateDB = new StateDB();
let state = stateDB.getState();
let siteDB = new SiteDB();
let sites = siteDB.getSites();
let currentSite;
sites.forEach((site)=>{
    if(site.id == state.site) {
        currentSite = site;
    }
});
let render = new Render();
let order = new Order(currentSite);
render.renderItemsViewPage(order);

// function getItemById(itemID) {
//     let item = currentSite.items.find(item => item.id == itemID);
//     return item;
// }


// function addToCart(itemID) {
//     let item = getItemById(itemID)
//     order.items.push(item);
//     calcOrder();
// }




