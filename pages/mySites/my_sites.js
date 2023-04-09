import { UsersDB } from '../../services/user_db.js';
import { Site } from '../../services/site_constructor.js';
import { SiteDB } from '../../services/site_db.js';
import { StateDB } from "../../services/state_db.js";
import { Render } from "../../services/render.js";
let stateDB = new StateDB();
let state = stateDB.getState();
state.page = 'my_sites';
state.site = null;
stateDB.updateState(state);
let siteDB = new SiteDB();
let sites = siteDB.getSites();
let usersDB = new UsersDB();
let users = usersDB.getUsers();
let loggedInUser;
users.forEach((user)=>{
   if(user.id == state.user) {
      loggedInUser = user;
   }
});
let render = new Render();
render.renderMySitesPage(loggedInUser);
document.getElementById('close').addEventListener('click',()=>{
   document.getElementById('createSiteSection').style.display = "none";
});
document.getElementById('createSiteButton').addEventListener('click',()=>{
   document.getElementById('createSiteSection').style.display = "block";
   let siteElement = document.getElementById('siteName');
   siteElement.removeAttribute('placeholder');
   siteElement.style.removeProperty('border');
});
document.getElementById('createSitePopupBtn').addEventListener('click',()=>{
   let siteElement = document.getElementById('siteName');
   let site = new Site(siteElement.value);
   let validName = site.isValidName(siteElement);
   if (validName) {
      siteDB.saveSite(site);
      loggedInUser.sites.push(site.id);
      usersDB.updateUsers(users);
      render.renderMySitesPage(loggedInUser);
      document.getElementById('createSiteSection').style.display = "none";
   }
});