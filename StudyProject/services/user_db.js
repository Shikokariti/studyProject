export class UsersDB {
    usersDBName;
    constructor() {
        this.usersDBName = 'usersDB';
        this.initDB();
    }

    getUsers() {
        let users = localStorage.getItem(this.usersDBName);
        users = JSON.parse(users);
        return users;
    }

    checkIfExistUserByEmail(userEmailToCheck) {
        let existingUsers = this.getUsers();
        let exist = false;
        existingUsers.forEach((user)=>{
            if (user.email == userEmailToCheck) {
                exist = true;
            }
        });
        if (exist) {
            return true;
        } else {
            return false;
        }
    }

    addUserToDb(newUser) {
        let existingUsers = this.getUsers();
        if (existingUsers.length == 0) {
            newUser.id = 0;
        } else {
            existingUsers.forEach((user, index)=>{
                if (existingUsers.length-1 == index) {
                    newUser.id = user.id+1;
                }
            });
        }
        existingUsers.push(newUser);
        localStorage.setItem(this.usersDBName, JSON.stringify(existingUsers));
    }

    initDB() {
        if (localStorage.getItem('usersDB') == null) {
            localStorage.setItem(this.usersDBName,'[]');
        }
    }

    getUserByEmail(email) {
        let existingUsers = this.getUsers();
        let user = null;
        existingUsers.forEach((object)=>{
            if (object.email == email) {
               user = object;
            }
        });
        return user;
    }

    updateUsers(users) {
        localStorage.setItem(this.usersDBName, JSON.stringify(users));
    }

    updateUser(userToUpdate) {
        let users = this.getUsers();
        let userIndex;
        users.forEach((user,index)=>{
            if (user.id == userToUpdate.id) {
                userIndex = index;
            }
        });
        users[userIndex] = userToUpdate;
        this.updateUsers(users);
    }
}