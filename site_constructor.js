import { Render } from "./render.js";
export class Site {
    id;
    name;
    items;
    view;
    accounts;
    promotions;
    constructor(inputName) {
        this.id = null;
        this.name = inputName;
        this.items = [];
        this.view = null;
        this.accounts = [];
        this.promotions = [];
    }
    isValidName(siteInput) {
        let render = new Render();
        let error;
        if (siteInput.value.length < 2) {
            error = 'At least 2 characters';
            render.errorViewer(siteInput,error);
        } else {
            render.removeProperty('border',siteInput);
            return true;
        }
    }
}