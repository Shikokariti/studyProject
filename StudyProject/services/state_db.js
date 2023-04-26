export class StateDB {
    stateDBName;
    constructor() {
        this.stateDBName = 'stateDB';
        this.initDB();
    }

    getState() {
        let state = localStorage.getItem(this.stateDBName);
        state = JSON.parse(state);
        return state;
    }

    initDB() {
        if (localStorage.getItem('stateDB') == null) {
            localStorage.setItem(this.stateDBName, []);
        }
    }

    updateState(newState) {
        localStorage.setItem(this.stateDBName, JSON.stringify(newState));
    }
}