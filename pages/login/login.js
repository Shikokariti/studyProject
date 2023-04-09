import { UsersDB } from '../../services/user_db.js';
import { StateDB } from "../../services/state_db.js";
import { Render } from "../../services/render.js";
import { State } from "../../services/state_constructor.js";
let db = new UsersDB();
let stateDB = new StateDB();
let state = new State();
state.page = 'login';
stateDB.updateState(state);
document.getElementById('loginBtn').addEventListener('click',credentialsValidation);
document.getElementById('signUpBtn').addEventListener('click',()=>{
    window.location.href = "../signUp/sign_up.html";
});
function credentialsValidation() {
    let validUser = false;
    let render = new Render();
    let userElements = render.getUserElements();
    let user = db.getUserByEmail(userElements.email.value);
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
            stateDB.updateState(state);
            window.location.href = "../mySites/my_sites.html";
        } else {
            render.errorViewer(userElements.password,'Wrong password')
        }
    }
}
