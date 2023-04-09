import { UsersDB } from '../../services/user_db.js';
import { SiteDB } from '../../services/site_db.js';
import { StateDB } from "../../services/state_db.js";
import {State} from "../../services/state_constructor.js";
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

document.getElementById('view').addEventListener('click',()=>{
   let div = document.getElementById('check');
   div.innerHTML = '';
   let frame = document.createElement('iframe');
    frame.setAttribute('src','../../pages/siteEdit/try.pages');
    frame.setAttribute('name','hello');
    frame.setAttribute('id','iframe');
      (div).appendChild(frame);
});
document.getElementById('items').addEventListener('click',()=>{
    state = stateDB.getState();
    state.item = null;
    stateDB.updateState(state);
    let div = document.getElementById('check');
    div.innerHTML = '';
    let frame = document.createElement('iframe');
    frame.setAttribute('src','../items/items.html');
    frame.setAttribute('name','hello');
    frame.setAttribute('id','iframe');
    (div).appendChild(frame);
});




