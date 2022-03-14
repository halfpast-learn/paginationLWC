import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import getTotalPages from '@salesforce/apex/accountLoader.getTotalPages';

export default class AccountList extends LightningElement {
    allAccsSize;

    @track accs;
    @track totalPages;
    @track currentPage;
    @track recordAmount;

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
        console.log(event.detail);
        if (page > 0 && page <= this.totalPages) {
            getAccountList({ lim: this.recordAmount, offset: (page - 1) * this.recordAmount })
                .then(result => {
                    this.accs = result;
                    this.totalPages = this.allAccsSize / this.recordAmount;
                    this.currentPage = parseInt(page);
                });
        }
    }
    handleSearchRequest(event) {

    }
    handleRecordAmountChange(event) {

    }
    connectedCallback() {
        getTotalPages()
            .then(result => { this.allAccsSize = result; });
        this.currentPage = 1;
        this.recordAmount = 5;
        getAccountList({ lim: this.recordAmount, offset: (this.currentPage - 1) * this.recordAmount })
            .then(result => {
                this.accs = result;
                this.totalPages = this.allAccsSize / this.recordAmount;
            });
    }
}