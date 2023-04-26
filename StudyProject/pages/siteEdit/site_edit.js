import { Render } from "../../services/render.js";
import { Helper } from "../../services/helper_constructor.js";

let helper = new Helper();
let render = new Render();
let state = helper.getState();
state.page = 'site_edit';
state.iframe = null;
state.item = null;
state.promotion = null;
helper.updateState(state);
let currentSite = helper.getActiveSite();
document.getElementById('siteName').innerText = `${currentSite.name}`;
document.getElementById('items').addEventListener('click',()=>{
    state = helper.getState();
    state.item = null;
    state.promotion = null;
    if(state.iframe == 'promotions' ) {
        render.renderIframe('remove','promotions-iframe',"../promotions/promotions.html");
    } else if (state.iframe == 'preview') {
        render.renderIframe('remove','preview-iframe',"../view/view.html");
    }
    state.iframe = 'items';
    helper.updateState(state);
    render.renderIframe('add','items-iframe',"../items/items.html");
    render.shadowEditSiteMenuButtons();
});
document.getElementById('preview').addEventListener('click',()=>{
    state = helper.getState();
    state.item = null;
    state.promotion = null;
    if(state.iframe == 'promotions' ) {
        render.renderIframe('remove','promotions-iframe',"../promotions/promotions.html");
    } else if (state.iframe == 'items') {
        render.renderIframe('remove','items-iframe',"../view/view.html");
    }
    state.iframe = 'preview';
    helper.updateState(state);
    render.renderIframe('add','preview-iframe',"../view/view.html");
    render.shadowEditSiteMenuButtons();
});
document.getElementById('back-to-mySites').addEventListener('click',()=>{
   window.location.href = '../mySites/my_sites.html';
});
document.getElementById('link-to-site').addEventListener('click',()=>{
   window.open('../view/view.html', '_blank');
});
document.getElementById('promotions').addEventListener('click',()=>{
    state = helper.getState();
    state.item = null;
    state.promotion = null;
    if(state.iframe == 'preview' ) {
        render.renderIframe('remove','preview-iframe',"../view/view.html");
    } else if (state.iframe == 'items') {
        render.renderIframe('remove','items-iframe',"../items/items.html");
    }
    state.iframe = 'promotions';
    helper.updateState(state);
    render.renderIframe('add','promotions-iframe',"../promotions/promotions.html");
    render.shadowEditSiteMenuButtons();
});

