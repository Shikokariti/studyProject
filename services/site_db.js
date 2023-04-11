export class SiteDB {
    siteDBName;
    constructor() {
        this.siteDBName = 'siteDB';
        this.initDB();
    }
    getSites() {
        let sites = localStorage.getItem(this.siteDBName);
        sites = JSON.parse(sites);
        return sites;
    }
    saveSite(newSite) {
        let existingSites = this.getSites();
        if (existingSites.length == 0) {
            newSite.id = 0;
        } else {
            existingSites.forEach((site, index)=>{
                if (existingSites.length-1 == index) {
                    newSite.id = site.id+1;
                }
            });
        }
        existingSites.push(newSite);
        localStorage.setItem(this.siteDBName, JSON.stringify(existingSites));
    }
    initDB() {
        if (localStorage.getItem('siteDB') == null) {
            localStorage.setItem(this.siteDBName,'[]');
        }
    }
    updateSites(sites) {
        localStorage.setItem(this.siteDBName, JSON.stringify(sites));
    }
    getSiteById(id) {
        let existingSites = this.getSites();
        let site = null;
        existingSites.forEach((object)=>{
            if (object.id == id) {
                site = object;
            }
        });
        return site;
    }
    deleteItem(siteID,itemID) {
        let sites = this.getSites();
        let site = sites.find(site => site.id == siteID);
        site.items.forEach((item, index)=>{
            if(item.id == itemID) {
                site.items.splice(index,1);
            }
        });
        this.updateSites(sites);
    }
}

