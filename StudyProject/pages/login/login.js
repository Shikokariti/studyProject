import { Helper } from "../../services/helper_constructor.js";
import { Render } from "../../services/render.js";

let helper = new Helper();
// let state = helper.getState();
let state = {
    user: null,
    page: 'login'
}
state.user = null;
state.page = 'login';
helper.updateState(state);
document.getElementById('loginBtn').addEventListener('click',credentialsValidation);
document.getElementById('signUpBtn').addEventListener('click',()=>{
    window.location.href = "../signUp/sign_up.html";
});
function credentialsValidation() {
    let validUser = false;
    let render = new Render();
    let userElements = render.getUserElements();
    let user = helper.getUserByEmail(userElements.email.value);
    if (user == null) {
        render.errorViewer(userElements.email,'User is not exist')
    } else {
        render.removeProperty('border',userElements.email);
        if (user.password == userElements.password.value) {
            validUser = true;
        }
        if (validUser) {
            render.removeProperty('border',userElements.password);
            state.user = user.id;
            helper.updateState(state);
            window.location.href = "../mySites/my_sites.html";
        } else {
            render.errorViewer(userElements.password,'Wrong password')
        }
    }
}
