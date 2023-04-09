import { User } from '../../services/user_constructor.js';
import { UsersDB } from '../../services/user_db.js';
import { Render } from "../../services/render.js";
import { StateDB } from "../../services/state_db.js";
import {State} from "../../services/state_constructor.js";
let stateDB = new StateDB();
let state = new State();
state.page = 'sign_up';
stateDB.updateState(state);
let userDB = new UsersDB();
document.getElementById('loginScreenBtn').addEventListener('click',()=>{
    window.location.href = "../login/login.html";
});
document.getElementById('signUpSuccess').addEventListener('click',()=>{
    window.location.href = "../login/login.html";
});
document.getElementById('signUpBtn').addEventListener('click',async ()=>{
    let user = new User();
    let validUser = await user.validateUser();
    if (validUser) {
        let userExist = userDB.checkIfExistUserByEmail(user.email);
        if (!userExist) {
            userDB.createUser(user);
            successPopup(user);
        } else {
            let render = new Render();
            let userElements = render.getUserElements();
            render.errorViewer(userElements.email,'Email Already Exist');
        }
    }
});
function successPopup(user) {
        document.getElementById('welcome').innerText = `Welcome ${user.firstName} ${user.lastName}`;
        document.getElementById('signUpCard').style.display = "none";
        document.getElementById('signUpSuccess').style.display = "block";
}