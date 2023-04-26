import { StateDB } from "../../services/state_db.js";
import { SiteDB } from "../../services/site_db.js";
import { Helper } from "../../services/helper_constructor.js";

export class Render {

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
                this.shadowSelectedItemsButton(items,state);
            });
        });
        this.shadowSelectedItemsButton(items,state);
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

    shadowSelectedItemsButton(items, state){
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
        let helper = new Helper();
        let state = helper.getState();
        // let stateDB = new StateDB();
        // let state = stateDB.getState();
        let siteDB = new SiteDB();
        let sites = helper.getSites();
        // let sites = siteDB.getSites();
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
           let removeBtn = document.createElement('button');
           removeBtn.id = item.id + '-remove';
           removeBtn.classList.add('btn','item-card-add-btn');
           removeBtn.innerText = 'Remove';
           removeBtn.addEventListener('click',()=>{
                order.removeItems(item);
           });
           cardBody.appendChild(title);
           cardBody.appendChild(description);
           cardBody.appendChild(price);
           cardBody.appendChild(addBtn);
           cardBody.appendChild(removeBtn);
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
        document.getElementById('cart-total-before-discount').innerText =`Total before discount: ₪${order.totalBeforeDiscount}`;
        let text = '';
        order.promotions.forEach((promotion)=>{
           text = text + `
           ₪${promotion.value} (${promotion.name})`
        });
        document.getElementById('cart-discount').innerText =`Discount: ${text}`;
        document.getElementById('cart-total-after-discount').innerText =`Total after discount: ₪${order.totalAfterDiscount}`;
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
        let elements = [document.getElementById('items'),document.getElementById('preview'),document.getElementById('promotions')];
        elements.forEach((element)=>{
            if (element.id == state.iframe) {
                element.classList.add("shadow-edit-sites-nav-buttons");
            } else {
                element.classList.remove("shadow-edit-sites-nav-buttons");
            }
        });
    }

    renderCreatePromotionPopup(site) {
        let select = document.getElementById('promotion-type-select-box');
        let promotionType = select.value;
        let get = document.getElementById('promotion-get-item-label-div');
        let buy = document.getElementById('promotion-buy-item-label-div');
        let unlimitedDiv = document.getElementById('promotion-limit-toggle-div');
        let value = document.getElementById('promotion-value-label');
        let valueDiv = document.getElementById('promotion-value-label-div');
        document.getElementById('promotion-name').value = '';
        document.getElementById('promotion-value').value = '';
        let createPromotionPopup = document.getElementById('create-promotion-popup');
        if (promotionType == 'discount-percentage') {
            promotionType = 'Percentage';
            get.style.display = 'none';
            buy.style.display = 'none';
            unlimitedDiv.style.display = 'none';
            valueDiv.style.display = 'block';
            value.innerText = 'Value %';
            createPromotionPopup.style.display = 'block';
        } else if (promotionType == 'discount-amount') {
            promotionType = 'Amount';
            get.style.display = 'none';
            buy.style.display = 'none';
            unlimitedDiv.style.display = 'none';
            valueDiv.style.display = 'block';
            value.innerText = 'Value $';
            createPromotionPopup.style.display = 'block';
        } else if (promotionType == '1-plus-1') {
            promotionType = '1+1';
            valueDiv.style.display = 'none';
            unlimitedDiv.style.display = 'block';
            createPromotionPopup.style.display = 'block';
            get.style.display = 'block';
            buy.style.display = 'block';
            let buySelectBox = document.getElementById('promotion-buy-item-select');
            let getSelectBox = document.getElementById('promotion-get-item-select');
            site.items.forEach((item)=>{
                let option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.name;
                buySelectBox.appendChild(option);
                option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.name;
                getSelectBox.appendChild(option);
            });
        }
        document.getElementById('create-promotion-type-dialog-section').style.display = 'none';
        return promotionType;
    }

    renderEditPromotionPopup(site,promotion) {
        document.getElementById('edit-promotion-name').value = promotion.name;
        let getDiv = document.getElementById('edit-promotion-get-item-label-div');
        let buyDiv = document.getElementById('edit-promotion-buy-item-label-div');
        let buySelectBox = document.getElementById('edit-promotion-buy-item-select');
        let getSelectBox = document.getElementById('edit-promotion-get-item-select');
        let unlimitedDiv = document.getElementById('edit-promotion-limit-toggle-div');
        let limitToggle = document.getElementById('edit-promotion-limit-toggle');
        let activeToggle = document.getElementById('edit-promotion-active-toggle');
        let value = document.getElementById('edit-promotion-value-label');
        let valueDiv = document.getElementById('edit-promotion-value-label-div');
        let editPromotionPopup = document.getElementById('edit-promotion-popup');
        if (promotion.type == '1+1') {
            valueDiv.style.display = 'none';
            unlimitedDiv.style.display = 'block';
            if (promotion.unlimited) {
                limitToggle.value = 'true';
                limitToggle.setAttribute('checked','checked');
            } else {
                limitToggle.value = 'false';
                limitToggle.removeAttribute('checked');
            }
            editPromotionPopup.style.display = 'block';
            getDiv.style.display = 'block';
            buyDiv.style.display = 'block';
            site.items.forEach((item)=>{
                let option = document.createElement('option');
                option.value = item.id;
                option.id = 'buy-' + item.id;
                option.innerText = item.name;
                buySelectBox.appendChild(option);
                option = document.createElement('option');
                option.value = item.id;
                option.id = 'get-' + item.id;
                option.innerText = item.name;
                getSelectBox.appendChild(option);
            });
           document.getElementById('buy-'+promotion.buy).setAttribute('selected','selected');
           document.getElementById('get-'+promotion.get).setAttribute('selected','selected');
        } else if (promotion.type == 'Percentage' || promotion.type == 'Amount') {
            getDiv.style.display = 'none';
            buyDiv.style.display = 'none';
            unlimitedDiv.style.display = 'none';
            valueDiv.style.display = 'block';
            editPromotionPopup.style.display = 'block';
            document.getElementById('promotion-name').value = promotion.name;
            document.getElementById('promotion-value').value = promotion.value;
            if (promotion.type == 'Percentage') {
                value.innerText = 'Value %';
            } else {
                value.innerText = 'Value $';
            }
        }
        if (promotion.active) {
            activeToggle.value = 'true';
            activeToggle.setAttribute('checked','checked');
        } else {
            activeToggle.value = 'false';
            activeToggle.removeAttribute('checked');
        }
    }

    getPromotionDetails(promotionType) {
        let promotion = {};
        console.log(document.getElementById('promotion-active-toggle').value);
        if (promotionType == 'Percentage' || promotionType == 'Amount') {
            promotion = {
                name: document.getElementById('promotion-name').value,
                value: document.getElementById('promotion-value').value,
                active: (document.getElementById('promotion-active-toggle').value === "true"),
                type: promotionType
            }
        }  else if (promotionType == '1+1') {
            promotion = {
                name: document.getElementById('promotion-name').value,
                buy: document.getElementById('promotion-buy-item-select').value,
                get: document.getElementById('promotion-get-item-select').value,
                active: (document.getElementById('promotion-active-toggle').value === "true"),
                unlimited: (document.getElementById('promotion-active-toggle').value === "true"),
                type: promotionType
            }
        }
        return promotion;
    }

    getEditPromotionDetails(promotionType) {
        let promotion = {};
        if (promotionType == 'Percentage' || promotionType == 'Amount') {
            promotion = {
                name: document.getElementById('edit-promotion-name').value,
                value: document.getElementById('edit-promotion-value').value,
                active: (document.getElementById('edit-promotion-active-toggle').value === "true"),
                type: promotionType
            }
        }  else if (promotionType == '1+1') {
            promotion = {
                name: document.getElementById('edit-promotion-name').value,
                buy: document.getElementById('edit-promotion-buy-item-select').value,
                get: document.getElementById('edit-promotion-get-item-select').value,
                active: (document.getElementById('edit-promotion-active-toggle').value === "true"),
                unlimited: (document.getElementById('edit-promotion-active-toggle').value === "true"),
                type: promotionType
            }
        }
        return promotion;
    }

    renderPromotions(promotions) {
        let stateDB = new StateDB();
        let state = stateDB.getState();
        let div = document.getElementById('promotions-list');
        div.innerHTML = '';
        promotions.forEach((promotion) => {
            let button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.id = promotion.id;
            button.innerText = promotion.name;
            button.classList.add("btn", "btn-secondary", "mt-1");
            div.appendChild(button);
            button.addEventListener('click', () => {
                this.renderEditPromotionsSection(promotion);
                state.promotion = promotion.id;
                stateDB.updateState(state);
                this.shadowSelectedPromotionsButton(promotions,state);
            });
        });
        this.shadowSelectedPromotionsButton(promotions,state);
    }

    renderEditPromotionsSection(promotion) {
        document.getElementById('promotion-details-name').innerText = promotion.name;
        document.getElementById('promotion-details-type').innerText = promotion.type;
        document.getElementById('promotion-details-active').innerText = promotion.active;
        document.getElementById('promotion-details-value-header').innerText = 'Value';
        if (promotion.type != '1+1') {
            document.getElementById('promotion-details-value').innerText = promotion.value;
            document.getElementById('promotion-details-buy').innerText = '';
            document.getElementById('promotion-details-get').innerText = '';
        } else {
            let helper = new Helper();
            let buyItem = helper.getItemByID(promotion.buy);
            let getItem = helper.getItemByID(promotion.get);
            document.getElementById('promotion-details-buy').innerText = buyItem.name;
            document.getElementById('promotion-details-get').innerText = getItem.name;
            document.getElementById('promotion-details-value-header').innerText = 'Unlimited';
            document.getElementById('promotion-details-value').innerText = promotion.unlimited;
        }
    }

    shadowSelectedPromotionsButton(promotions,state){
        promotions.forEach((promotion)=>{
            if(promotion.id == state.promotion) {
                document.getElementById(promotion.id).classList.add('shadowTest');
            } else {
                document.getElementById(promotion.id).classList.remove('shadowTest');
            }
        });
    }
}


