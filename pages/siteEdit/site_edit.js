import { UsersDB } from '../../services/user_db.js';
import { SiteDB } from '../../services/site_db.js';
import { StateDB } from "../../services/state_db.js";
import {Render} from "../../services/render.js";
let render = new Render();
let stateDB = new StateDB();
let state = stateDB.getState();
state.page = 'site_edit';
state.item = null;
stateDB.updateState(state);
let usersDB = new UsersDB();
let users = usersDB.getUsers();
let siteDB = new SiteDB();
let sites = siteDB.getSites();

let currentSite;
sites.forEach((site)=>{
    if(site.id == state.site) {
        currentSite = site;
    }
});
let loggedInUser;
users.forEach((user)=>{
    if(user.id == state.user) {
        loggedInUser = user;
    }
});
document.getElementById('siteName').innerText = `${currentSite.name}`;
document.getElementById('items').addEventListener('click',()=>{
    state = stateDB.getState();
    state.item = null;
    stateDB.updateState(state);
    render.renderIframe('add','items-iframe',"../items/items.html");
    render.renderIframe('remove','view-iframe',"../view/view.html");
});
document.getElementById('preview').addEventListener('click',()=>{
    state = stateDB.getState();
    state.item = null;
    stateDB.updateState(state);
    render.renderIframe('add','view-iframe',"../view/view.html");
    render.renderIframe('remove','items-iframe',"../items/items.html");
});
document.getElementById('back-to-mySites').addEventListener('click',()=>{
   window.location.href = '../mySites/my_sites.html';
});
document.getElementById('link-to-site').addEventListener('click',()=>{
   window.open('../view/view.html', '_blank');
});


