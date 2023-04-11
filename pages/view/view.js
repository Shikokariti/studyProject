import { SiteDB } from '../../services/site_db.js';
import { Render } from "../../services/render.js";
import { Order } from "../../services/order_constructor.js";
import { Helper } from "../../services/helper_constructor.js";

let helper = new Helper();


let currentSite = helper.getActiveSite();

let render = new Render();
let order = new Order(currentSite);
render.renderItemsViewPage(order);






