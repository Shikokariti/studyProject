import {Helper} from "../../services/helper_constructor.js";
import { Render } from "../../services/render.js";

let helper = new Helper();
let state = helper.getState();
state.page = 'sign_up';
helper.updateState(state);

document.getElementById('loginScreenBtn').addEventListener('click',()=>{
    window.location.href = "../login/login.html";
});
document.getElementById('signUpSuccess').addEventListener('click',()=>{
    window.location.href = "../login/login.html";
});
document.getElementById('signUpBtn').addEventListener('click',async ()=>{
    let user = helper.createUser();
    let validUser = await user.validateUser();
    if (validUser) {
        let userExist = helper.checkIfExistUserByEmail(user.email);
        if (!userExist) {
            helper.addUserToDb(user);
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