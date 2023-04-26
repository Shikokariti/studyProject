import { Render } from "../../services/render.js";
export class User {
    id;
    firstName;
    lastName;
    email;
    password;
    sites;
    constructor() {
        this.createUser();
    }

    createUser() {
        let render = new Render();
        let userElements = render.getUserElements();
        this.email = userElements.email.value;
        this.firstName = userElements.firstName.value;
        this.lastName = userElements.lastName.value;
        this.password = userElements.password.value;
        this.sites = [];
        this.id = null;
    }

    async validateUser() {
        let render = new Render();
        let userElements = render.getUserElements();
        let emailValid = await this.emailValidator(userElements.email);
        let passwordValid = this.passwordValidator(userElements.password,userElements.rePassword);
        let firstNameValid = this.firstNameValidator(userElements.firstName);
        let lastNameValid = this.lastNameValidator(userElements.lastName);
        if (emailValid && passwordValid && firstNameValid && lastNameValid) {
            return true;
        }
    }

    firstNameValidator(firstName) {
        let render = new Render();
        let error;
        if (firstName.value.length < 2) {
            error = 'At Least 2 characters';
            render.errorViewer(firstName,error);
        } else {
            render.removeProperty('border',firstName);
            return true;
        }
    }

    lastNameValidator(lastName) {
        let render = new Render();
        let error;
        if (lastName.value.length < 2) {
            error = 'At least 2 characters';
            render.errorViewer(lastName,error);
        } else {
            render.removeProperty('border',lastName);
            return true;
        }
    }

    passwordValidator(password,rePassword) {
        let render = new Render();
        let error;
        if (password.value.length < 5) {
            error = 'At least 5 characters';
            render.errorViewer(password,error);
            render.errorViewer(rePassword,error);
        } else if (password.value != rePassword.value) {
            error = 'Password does not match';
            render.errorViewer(password,error);
            render.errorViewer(rePassword,error);
        } else {
            render.removeProperty('border',password);
            render.removeProperty('border',rePassword);
            return true;
        }
    }

    async emailValidator(email) {
        let render = new Render();
        let error;
        if (email.value.length < 1) {
            error = 'Insert an email address';
            render.errorViewer(email,error);
        } else if (email.value.length < 6) {
            error = 'Email is not valid';
            render.errorViewer(email, error);
        } else {
            let emailVerification = await fetch("https://api.mailcheck.ai/email/"+email.value).then((response)=>response.json());
            if (emailVerification.status != 200) {
                error = 'Email is not valid'
                render.errorViewer(email,error);
            } else {
                render.removeProperty('border',email);
                return true;
            }
        }
    }
}

