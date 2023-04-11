import { Render } from "../../services/render.js";
import { Helper } from "../../services/helper_constructor.js";
let helper = new Helper();
let render = new Render();
let state = helper.getState();
state.page = 'site_edit';
state.iframe = null;
state.item = null;
helper.updateState(state);
let currentSite = helper.getActiveSite();
document.getElementById('siteName').innerText = `${currentSite.name}`;
document.getElementById('items').addEventListener('click',()=>{
    state = helper.getState();
    state.item = null;
    if(state.iframe == 'preview') {
        render.renderIframe('remove','view-iframe',"../view/view.html");
    }
    state.iframe = 'items';
    helper.updateState(state);
    render.renderIframe('add','items-iframe',"../items/items.html");
    render.shadowEditSiteMenuButtons();
});
document.getElementById('preview').addEventListener('click',()=>{
    state = helper.getState();
    state.item = null;
    if(state.iframe == 'items') {
        render.renderIframe('remove','items-iframe',"../items/items.html");
    }
    state.iframe = 'preview';
    helper.updateState(state);
    render.renderIframe('add','view-iframe',"../view/view.html");
    render.shadowEditSiteMenuButtons();
});
document.getElementById('back-to-mySites').addEventListener('click',()=>{
   window.location.href = '../mySites/my_sites.html';
});
document.getElementById('link-to-site').addEventListener('click',()=>{
   window.open('../view/view.html', '_blank');
});


