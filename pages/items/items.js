import { StateDB } from "../../services/state_db.js";
import { Item } from "../../services/item_constructor.js";
import {UsersDB} from "../../services/user_db.js";
import {SiteDB} from "../../services/site_db.js";
import {Render} from "../../services/render.js";
let stateDB = new StateDB();
let state = stateDB.getState();
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
let render = new Render();
render.renderItems(currentSite.items);


document.getElementById('createItemMainPage').addEventListener('click',()=>{
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemImage').value = '';
    document.getElementById('createItemSection').style.display = "block";
});
document.getElementById('createItemPopupBtn').addEventListener('click',()=>{
    let itemName = document.getElementById('itemName').value;
    let itemDescription = document.getElementById('itemDescription').value;
    let itemPrice = document.getElementById('itemPrice').value;
    let itemImage = document.getElementById('itemImage').value;
    let item = new Item(itemName, itemDescription, itemPrice, currentSite, itemImage);
    currentSite.items.push(item);
    siteDB.updateSites(sites);
    state = stateDB.getState();
    state.item = item.id;
    stateDB.updateState(state);
    render.renderItems(currentSite.items);
    render.renderEditItemSection(item);
    document.getElementById('createItemSection').style.display = "none";
});
document.getElementById('editItem').addEventListener('click',()=>{
    state = stateDB.getState();
    if(state.item == null) {
        alert('Select item to edit');
    } else {
    sites = siteDB.getSites();
    currentSite = sites.find(site => site.id == state.site);
    let itemToEdit = currentSite.items.find(item  => item.id === state.item);
    console.log(itemToEdit);
    render.renderEditItemModal(itemToEdit);
    }
});
document.getElementById('saveItemChanges').addEventListener('click',()=>{
   render.saveItemChanges();
   state = stateDB.getState();
   sites = siteDB.getSites();
   currentSite = sites.find(site => site.id == state.site);
   render.renderItems(currentSite.items);
});
document.getElementById('closeItemEditPopup').addEventListener('click',()=>{
    document.getElementById('editItemSection').style.display = "none";
});
document.getElementById('closeItemCreatePopup').addEventListener('click',()=>{
    document.getElementById('createItemSection').style.display = "none";
});