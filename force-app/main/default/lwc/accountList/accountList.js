import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import getTotalPages from '@salesforce/apex/accountLoader.getTotalPages';

export default class AccountList extends LightningElement {
    allAccsSize;

    @track accs;
    @track totalPages;
    @track currentPage;
    @track recordAmount;
    @track searchString;
    s
    handlePageRequest(event) {
        let page;
        switch (event.detail) {
            case 'Next':
                page = this.currentPage + 1;
                break;
            case 'Previous':
                page = this.currentPage - 1;
                break;
            case '>>':
                page = this.totalPages;
                break;
            case '<<':
                page = 1;
                break;
        }
        console.log(this.totalPages);
        if (page > 0 && page <= this.totalPages) {
            this.currentPage = parseInt(page);
            this.updateAccs();
        }
    }
    handleSearchRequest(event) {
        this.currentPage = 1;
        this.searchString = event.detail;
        this.getTotalPages({ searchString: this.searchString }).then(result => { this.allAccsSize = result; this.totalPages = result / this.recordAmount; this.updateAccs(); })
    }
    handleRecordAmountChange(event) {
        this.recordAmount = event.detail;
        this.totalPages = this.allAccsSize / this.recordAmount;
        this.updateAccs();
    }
    connectedCallback() {
        getTotalPages().then(result => {
            this.allAccsSize = result;
            this.recordAmount = 5;
            this.totalPages = this.allAccsSize / this.recordAmount;
            this.currentPage = 1;
            this.updateAccs();
        });
    }

    updateAccs() {
        getAccountList({ searchString: this.searchString, lim: this.recordAmount, offset: (this.currentPage - 1) * this.recordAmount })
            .then(result => {
                this.accs = result;
            });
    }
}