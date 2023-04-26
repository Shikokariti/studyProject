import { Render } from "../../services/render.js";
import { Helper } from "../../services/helper_constructor.js";

let render = new Render();
let helper = new Helper();
let currentSite = helper.getActiveSite();
let promotionType;
let state = helper.getState();
// state.promotion = null;
// helper.updateState(state);
render.renderPromotions(currentSite.promotions);


document.getElementById('create-promotion-main-page-btn').addEventListener('click',()=>{
   document.getElementById('create-promotion-type-dialog-section').style.display = 'block';
});
document.getElementById('continue-create-promotion-dialog-btn').addEventListener('click',()=>{
   promotionType = render.renderCreatePromotionPopup(currentSite);
});
document.getElementById('close-create-promotion-popup-btn').addEventListener('click',()=>{
   document.getElementById('create-promotion-popup').style.display = 'none';
});
document.getElementById('edit-promotion-popup-close-btn').addEventListener('click',()=>{
   document.getElementById('edit-promotion-popup').style.display = 'none';
});
document.getElementById('close-create-promotion-dialog-btn').addEventListener('click',()=>{
   document.getElementById('create-promotion-type-dialog-section').style.display = 'none';
});
document.getElementById('create-promotion-popup-btn').addEventListener('click',()=>{
   let promotion = render.getPromotionDetails(promotionType);
   let valid = helper.createPromotion(currentSite,promotion);
   if (valid) {
      currentSite = helper.getActiveSite();
      render.renderPromotions(currentSite.promotions);
      render.renderEditPromotionsSection(promotion);
      document.getElementById('create-promotion-popup').style.display = 'none';
   }
});
document.getElementById('edit-promotion-popup-save-btn').addEventListener('click',()=>{
   let editPromotion = helper.getPromotionToEdit();
   let promotion = render.getEditPromotionDetails(editPromotion.type);
   let valid = helper.updatePromotion(promotion);
   if (valid) {
      currentSite = helper.getActiveSite();
      render.renderPromotions(currentSite.promotions);
      render.renderEditPromotionsSection(promotion);
      document.getElementById('edit-promotion-popup').style.display = 'none';
   }
});
document.getElementById('promotion-active-toggle').addEventListener('change',()=>{
   let toggle = document.getElementById('promotion-active-toggle');
   if (toggle.value == 'true') {
      toggle.value = 'false';
      toggle.removeAttribute('checked');
   } else {
      toggle.setAttribute('checked','checked');
      toggle.value = 'true';
   }
});
document.getElementById('edit-promotion-active-toggle').addEventListener('change',()=>{
   let toggle = document.getElementById('edit-promotion-active-toggle');
   if (toggle.value == 'true') {
      toggle.value = 'false';
      toggle.removeAttribute('checked');
   } else {
      toggle.setAttribute('checked','checked');
      toggle.value = 'true';
   }
});
document.getElementById('promotion-limit-toggle').addEventListener('change',()=>{
   let toggle = document.getElementById('promotion-limit-toggle');
   if (toggle.checked) {
      toggle.value = 'false';
      toggle.removeAttribute('checked');
   } else {
      toggle.setAttribute('checked','checked');
      toggle.value = 'true';
   }
});
document.getElementById('edit-promotion-limit-toggle').addEventListener('change',()=>{
   let toggle = document.getElementById('edit-promotion-limit-toggle');
   if (toggle.checked) {
      toggle.value = 'false';
      toggle.removeAttribute('checked');
   } else {
      toggle.setAttribute('checked','checked');
      toggle.value = 'true';
   }
});
document.getElementById('edit-promotion').addEventListener('click',()=>{
   helper.openEditPromotionPopup();
});
document.getElementById('delete-promotion').addEventListener('click',()=>{
   state = helper.getState();
   if (state.promotion == null) {
      document.getElementById('no-promotion-selected-error-section').style.display = 'block';
   } else {
      document.getElementById('delete-promotion-dialog-section').style.display = 'block';
   }
});
document.getElementById('close-promotion-item-dialog-btn').addEventListener('click',()=>{
   document.getElementById('delete-promotion-dialog-section').style.display = 'none';
});
document.getElementById('delete-promotion-dialog-btn').addEventListener('click',()=>{
   helper.deletePromotion();
   document.getElementById('delete-promotion-dialog-section').style.display = 'none';
});
document.getElementById('error-section-ok-btn').addEventListener('click',()=>{
   document.getElementById('no-promotion-selected-error-section').style.display = 'none';
});

// TO DO //
//Fix bug toggle does not reset when creating promotion after promotion with toggle switch//
//Add promotion creation validations//