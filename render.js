import {StateDB} from "./state_db.js";
import {SiteDB} from "./site_db.js";

export class Render {
    constructor() {
    }
    getUserElements() {
        let getEmail = document.getElementById('email');
        let getFirstName = document.getElementById('firstName');
        let geLastName = document.getElementById('lastName');
        let getPassword = document.getElementById('password');
        let getRePassword = document.getElementById('rePassword');
        let user = {
            email: getEmail,
            firstName: getFirstName,
            lastName: geLastName,
            password: getPassword,
            rePassword: getRePassword
        }
        return user;
    }
    errorViewer(element, error) {
        element.value = '';
        element.style.border = "thick solid #cc1f26";
        element.setAttribute('placeholder', error);
    }
    removeProperty(property,element) {
        element.style.removeProperty(property);
    }
    renderMySitesPage(loggedInUser) {
        let sitesDB = new SiteDB();
        let stateDB = new StateDB();
        let state = stateDB.getState();
        document.getElementById('userName').innerText = `User: ${loggedInUser.firstName} ${loggedInUser.lastName}`;
        let div = document.getElementById('mySitesButtons');
        div.innerHTML = '';
        loggedInUser.sites.forEach((siteId) => {
            let site = sitesDB.getSiteById(siteId);
            let button = document.createElement('button');
            button.setAttribute('type','button');
            button.id = site.id;
            button.style.marginTop = "50px";
            button.innerText = site.name;
            button.classList.add("btn","btn-secondary");
            console.log(button.id + ' ' + button.textContent);
            div.appendChild(button);
            button.addEventListener('click', () => {
                state.site = site.id;
                stateDB.updateState(state);
                window.location.href = "../siteEdit/site_edit.html";
            });
        });
    }
    renderItems(items) {
        let stateDB = new StateDB();
        let state = stateDB.getState();
        let div = document.getElementById('items');
        div.innerHTML = '';
        items.forEach((item) => {
            let button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.id = item.id;
            button.innerText = item.name;
            button.classList.add("btn", "btn-secondary", "mt-1");
            div.appendChild(button);
            button.addEventListener('click', () => {
                this.renderEditItemSection(item);
                // document.getElementById('itemDetails_name').innerText = item.name;
                // document.getElementById('itemDetails_price').innerText = item.price;
                // document.getElementById('itemDetails_Description').innerText = item.description;
                // document.getElementById('itemDetails_Inventory').innerText = item.inventory;
                state.item = item.id;
                stateDB.updateState(state);
                this.shadowSelectedButton(items,state);
            });
        });
        this.shadowSelectedButton(items,state);
    }
    renderEditItemModal(item) {
        document.getElementById('editItemSection').style.display = "block";
        document.getElementById('editItemName').value = item.name;
        document.getElementById('editItemDescription').value = item.description;
        document.getElementById('editItemPrice').value = item.price;
        document.getElementById('editItemInventory').value = item.inventory;
    }
    saveItemChanges() {
        let stateDB = new StateDB();
        let state = stateDB.getState();
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        let site = sites.find(site => site.id == state.site);
        let item = site.items.find(item => item.id == state.item);
        item.name = document.getElementById('editItemName').value;
        item.description = document.getElementById('editItemDescription').value;
        item.price = document.getElementById('editItemPrice').value;
        item.inventory = document.getElementById('editItemInventory').value;
        siteDB.updateSites(sites);
        document.getElementById('itemDetails_name').innerText = item.name;
        document.getElementById('itemDetails_price').innerText = item.price;
        document.getElementById('itemDetails_Description').innerText = item.description;
        document.getElementById('itemDetails_Inventory').innerText = item.inventory;
        document.getElementById('editItemSection').style.display = "none";
    }
    shadowSelectedButton(items, state){
     items.forEach((item)=>{
         if(item.id == state.item) {
             document.getElementById(item.id).classList.add('shadowTest');
         } else {
             document.getElementById(item.id).classList.remove('shadowTest');
         }
     });
    }
    renderEditItemSection(item){
        document.getElementById('itemDetails_name').innerText = item.name;
        document.getElementById('itemDetails_price').innerText = item.price;
        document.getElementById('itemDetails_Description').innerText = item.description;
        document.getElementById('itemDetails_Inventory').innerText = item.inventory;
    }
}

