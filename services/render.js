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
            button.classList.add("btn","btn-secondary",'sites-button');
            let br = document.createElement('br');
            div.appendChild(button);
            div.appendChild(br);
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
        let div = document.getElementById('items-list');
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
                state.item = item.id;
                stateDB.updateState(state);
                this.shadowSelectedButton(items,state);
            });
        });
        this.shadowSelectedButton(items,state);
    }
    renderEditItemModal(item) {
        document.getElementById('edit-item-section').style.display = "block";
        document.getElementById('edit-item-name').value = item.name;
        document.getElementById('edit-item-description').value = item.description;
        document.getElementById('edit-item-image').value = item.image;
        document.getElementById('edit-item-price').value = item.price;
        document.getElementById('edit-item-inventory').value = item.inventory;
    }
    saveItemChanges() {
        let stateDB = new StateDB();
        let state = stateDB.getState();
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        let site = sites.find(site => site.id == state.site);
        let item = site.items.find(item => item.id == state.item);
        item.name = document.getElementById('edit-item-name').value;
        item.description = document.getElementById('edit-item-description').value;
        item.image =  document.getElementById('edit-item-image').value;
        item.price = document.getElementById('edit-item-price').value;
        item.inventory = document.getElementById('edit-item-inventory').value;
        siteDB.updateSites(sites);
        this.renderEditItemSection(item);
        document.getElementById('edit-item-section').style.display = "none";
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
        document.getElementById('item-details-name').innerText = item.name;
        document.getElementById('item-details-price').innerText = item.price;
        document.getElementById('item-details-description').innerText = item.description;
        document.getElementById('item-details-inventory').innerText = item.inventory;
        let div = document.getElementById('item-details-image');
        div.innerText = '';
        let img = document.createElement('img');
        img.classList.add('edit-item-section-image');
        if(item.image == '') {
            img.setAttribute('src','https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg');
        } else {
            img.setAttribute('src',item.image);
        }
        div.appendChild(img);
    }
    resetEditItemSection() {
        document.getElementById('item-details-name').innerText = '';
        document.getElementById('item-details-price').innerText = '';
        document.getElementById('item-details-description').innerText = '';
        document.getElementById('item-details-inventory').innerText = '';
        document.getElementById('item-details-image').innerText = '';
    }
    renderItemsViewPage(order) {
        let stateDB = new StateDB();
        let state = stateDB.getState();
        let siteDB = new SiteDB();
        let sites = siteDB.getSites();
        let site = sites.find(site => site.id == state.site);
        document.getElementById('site-name-header').innerText = site.name;
        let itemCount = 1;
        let rowNumber = 1;
        site.items.forEach((item)=>{
            let itemRow;
            if(itemCount < 6) {
                itemRow = document.getElementById('items-row-1');
                rowNumber = 1;
            } else if (itemCount > 5 && itemCount < 10) {
                itemRow = document.getElementById('items-row-2');
                rowNumber = 2;
            } else if (itemCount > 9 && itemCount < 14) {
                itemRow = document.getElementById('items-row-3');
                rowNumber = 3;
            } else {
                itemRow = null;
                rowNumber = null;
            }
           let card = document.createElement('div');
           card.id = "row-"+rowNumber+"-item-"+itemCount+"-card";
           card.classList.add('col-3', 'card', 'item-card');
           let img = document.createElement('img');
           img.id = "row-"+rowNumber+"-item-"+itemCount+"-img";
           img.classList.add('card-img', 'card-img-top', 'cards-image');
           if(item.image == '') {
               img.setAttribute('src','https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg');
           } else {
               img.setAttribute('src',item.image);
           }
           let cardBody = document.createElement('div');
           cardBody.id = "row-"+rowNumber+"-item-"+itemCount+"-card-body";
           cardBody.classList.add('card-body');
           let title = document.createElement('h5');
           title.id = "row-"+rowNumber+"-item-"+itemCount+"-title";
           title.classList.add('card-title');
           title.innerText = item.name;
           let description = document.createElement('p');
           description.id = "row-"+rowNumber+"-item-"+itemCount+"-description";
           description.classList.add('card-text','item-card-description');
           description.innerText = item.description;
           let price = document.createElement('h8');
           price.id = "row-"+rowNumber+"-item-"+itemCount+"-price";
           price.innerText = `  ₪${item.price}`;
           price.classList.add('item-card-price');
           let addBtn = document.createElement('button');
           addBtn.id = item.id;
           addBtn.setAttribute('type','button');
           addBtn.classList.add('btn','item-card-add-btn');
           addBtn.innerText = 'Add To Cart';
           addBtn.addEventListener('click',()=>{
               order.addItems(item);
           });
           cardBody.appendChild(title);
           cardBody.appendChild(description);
           cardBody.appendChild(price);
           cardBody.appendChild(addBtn);
           card.appendChild(img);
           card.appendChild(cardBody);
           itemRow.appendChild(card);
           itemCount++;
        });
    }
    renderIframe(action,elementID,src) {
        if (action == 'add') {
            if (document.getElementById(elementID) == undefined) {
                let iframe = document.createElement('iframe');
                iframe.id = elementID;
                iframe.classList.add('col-sm','container-fluid');
                iframe.setAttribute('src',src);
                document.getElementById('test2').appendChild(iframe);
            }
        } else if (action == 'remove') {
            let iframe = document.getElementById(elementID);
            iframe.remove();
        }
    }
    renderCart(order) {
        document.getElementById('cart-items').innerText = ``;
        order.items.forEach((item)=>{
            document.getElementById('cart-items').innerText += ` ${item.name}, `;
        });
        document.getElementById('cart-total-before-discount');
        document.getElementById('cart-discount');
        document.getElementById('cart-total-after-discount').innerText =`Total: ${order.priceBeforeDiscount}`;
    }
    displayDeleteItemDialog(itemToDelete) {
        document.getElementById('delete-item-dialog-header').innerText = `Delete Item "${itemToDelete.name}"`;
        document.getElementById('delete-item-section').style.display = 'block';
    }
    getItemValues() {
        let item = {
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-description').value,
            price: document.getElementById('item-price').value,
            image: document.getElementById('item-image').value
        }
        return item;
    }
    shadowEditSiteMenuButtons() {
        let stateDB = new StateDB();
        let state = stateDB.getState()
        let elements = [document.getElementById('items'),document.getElementById('preview')];
        elements.forEach((element)=>{
            if (element.id == state.iframe) {
                element.classList.add("shadow-edit-sites-nav-buttons");
            } else {
                element.classList.remove("shadow-edit-sites-nav-buttons");
            }
        });

    }
}


