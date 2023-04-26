import { Helper } from "../../services/helper_constructor.js";
import { Render } from "../../services/render.js";

let helper = new Helper();
let state = helper.getState();

state.page = 'my_sites';
state.site = null;
helper.updateState(state);

let loggedInUser = helper.geActiveUser();

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
   let siteNameElement = document.getElementById('siteName');
   let site = helper.createSite(siteNameElement.value);
   let validName = site.isValidName(siteNameElement);
   if (validName) {
      helper.addSiteToDb(site);
      loggedInUser.sites.push(site.id);
      helper.updateUser(loggedInUser);
      render.renderMySitesPage(loggedInUser);
      document.getElementById('createSiteSection').style.display = "none";
   }
});