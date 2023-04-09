// import { UsersDB } from '../services/user_db.js';
// import { Site } from '../services/site_constructor.js';
// import { SiteDB } from '../services/site_db.js';
// let usersDB = new UsersDB();
// let users = usersDB.getUsers();
// let siteDB = new SiteDB();
// let loggedInUser = users.find(user => user.isLoggedIn = true);
// document.getElementById('createSiteButton').addEventListener('click',()=>{
//     document.getElementById('createSiteSection').style.display = "absolute";
// })
// document.getElementById('createSiteFormHeader').innerText = `Hi ${loggedInUser.firstName} ${loggedInUser.lastName}`;
//
// document.getElementById('createSiteBtn').addEventListener('click',()=>{
//     let siteInput = document.getElementById('siteName');
//     let site = new Site(siteInput.value);
//     let validName = site.isValidName(siteInput);
//     if (validName) {
//         siteDB.saveSite(site);
//         loggedInUser.sites.push({id:site.id,name:site.name});
//         usersDB.updateUsers(users);
//         window.location.href = "../../pages/siteEdit/site_edit.pages";
//     }
// });