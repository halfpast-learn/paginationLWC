import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/accountLoader.getAccounts';

export default class AccountList extends LightningElement {
    currentPage;
    accs;
    searchString;
    totalPages;

    _totalAccounts;
    set totalAccounts(value) {
        this._totalAccounts = value;
        this.updateTotalPages();
    }
    get totalAccounts() {
        return this._totalAccounts;
    }

    _pageSize;
    set pageSize(value) {
        this._pageSize = value;
        this.updateTotalPages();
    }
    get pageSize() {
        return this._pageSize;
    }

    updateTotalPages() {
        if (this.totalAccounts && this.pageSize) {
            this.totalPages = Math.ceil(this.totalAccounts / this.pageSize);
        }
    }

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
            default:
                break;
        }
        if (page > 0 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadAccounts(this.searchString, this.currentPage, this.pageSize);
        }
    }
    handleSearchRequest(event) {
        this.currentPage = 1;
        this.searchString = event.detail;
        this.loadAccounts(this.searchString, this.currentPage, this.pageSize);
    }
    handleRecordAmountChange(event) {
        this.currentPage = 1;
        this.pageSize = event.detail;
        this.loadAccounts(this.searchString, this.currentPage, this.pageSize);
    }
    connectedCallback() {
        this.pageSize = 5;
        this.currentPage = 1;
        this.loadAccounts(this.searchString, this.currentPage, this.pageSize);
    }

    async loadAccounts(searchString, pageNumber, pageSize) {
        const result = await getAccounts({ searchString, pageNumber, pageSize });
        this.accs = result.accounts;
        this.totalAccounts = result.totalAccounts;
    }
}
