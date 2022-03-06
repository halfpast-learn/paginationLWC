import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import findAccounts from '@salesforce/apex/accountLoader.findAccounts';

export default class AccountTableView extends LightningElement {
    pageNumber;
    recordAmount;
    prevPageNumber;
    nextPageNumber;
    totalPages;
    isFiltered;
    filterString;
    @track accs;
    @wire(getAccountList) wiredData({ error, data }) {
        if (data) {
            this.accs = data;
            this.totalPages = this.accs.length / this.recordAmount;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.accs = undefined;
        }
    }
    handleSearch(event) {
        this.filterString = event.target.value;
        if (this.filterString != '') {
            this.isFiltered = true;
        }
    }
    //todo: 
    //sosl to table?
    //split the code. accpage should only return page
    get accPage() {
        if (!this.isFiltered) {
            return this.accs.slice((this.pageNumber - 1) * this.recordAmount, this.pageNumber * this.recordAmount);
        }
    }

    handlePageChange(event) {
        let dif = 0;
        switch (event.target.label) {
            case "Next":
                dif = 1;
                break;
            case "Previous":
                dif = -1;
                break;
            case ">>":
                dif = this.totalPages - this.pageNumber;
                break;
            case "<<":
                dif = -(this.pageNumber - 1);
                break;
        }
        if (this.pageNumber + dif >= 1 && this.pageNumber + dif <= this.totalPages)
            this.pageNumber += dif;
    }

    connectedCallback() {
        this.pageNumber = 1;
        this.recordAmount = 5;
    }
}