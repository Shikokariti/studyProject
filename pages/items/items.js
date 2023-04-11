import { Item } from "../../services/item_constructor.js";
import { Render } from "../../services/render.js";
import { Helper } from "../../services/helper_constructor.js";
let helper = new Helper();
let state = helper.getState();
let sites = helper.getSites();
let currentSite = helper.getActiveSite();
let render = new Render();
render.renderItems(currentSite.items);


document.getElementById('create-item-main-page-btn').addEventListener('click',()=>{
    document.getElementById('item-name').value = '';
    document.getElementById('item-description').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-image').value = '';
    document.getElementById('create-item-popup').style.display = "block";
});
document.getElementById('create-item-popup-btn').addEventListener('click',async()=>{
    let itemInput = render.getItemValues();
    let item = await helper.createItem(itemInput.name, itemInput.description, itemInput.price, currentSite, itemInput.image);
    currentSite = helper.getActiveSite();
    render.renderItems(currentSite.items);
    render.renderEditItemSection(item);
    document.getElementById('create-item-popup').style.display = "none";
});
document.getElementById('editItem').addEventListener('click',()=>{
    state = helper.getState();
    if(state.item == null) {
        document.getElementById('no-item-selected-error-section').style.display = 'block';
    } else {
    sites = helper.getSites();
    currentSite = helper.getActiveSite();
    let itemToEdit = currentSite.items.find(item => item.id === state.item);
    render.renderEditItemModal(itemToEdit);
    }
});
document.getElementById('save-item-changes-btn').addEventListener('click',()=>{
   render.saveItemChanges();
   state = helper.getState();
   sites = helper.getSites();
   currentSite = helper.getActiveSite();
   render.renderItems(currentSite.items);
});
document.getElementById('close-item-edit-popup-btn').addEventListener('click',()=>{
    document.getElementById('edit-item-section').style.display = "none";
});
document.getElementById('close-create-item-popup-btn').addEventListener('click',()=>{
    document.getElementById('create-item-popup').style.display = "none";
});

document.getElementById('delete-item').addEventListener('click',()=>{
    state = helper.getState();
    if(state.item == null) {
        document.getElementById('no-item-selected-error-section').style.display = 'block';
    } else {
        sites = helper.getSites();
        currentSite = helper.getActiveSite();
        let itemToDelete = currentSite.items.find(item => item.id === state.item);
        render.displayDeleteItemDialog(itemToDelete);
    }
});
document.getElementById('close-delete-item-dialog-btn').addEventListener('click',()=>{
    document.getElementById('delete-item-section').style.display = "none";
});
document.getElementById('delete-item-dialog-btn').addEventListener('click',()=>{
    state = helper.getState();
    helper.deleteItem(state.site,state.item);
    state.item = null;
    helper.updateState(state);
    sites = helper.getSites();
    currentSite = helper.getActiveSite();
    render.resetEditItemSection();
    render.renderItems(currentSite.items);
    document.getElementById('delete-item-section').style.display = "none";
});
document.getElementById('error-section-ok-btn').addEventListener('click',()=>{
    document.getElementById('no-item-selected-error-section').style.display = 'none';
});

