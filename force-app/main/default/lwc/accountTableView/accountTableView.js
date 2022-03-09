import { LightningElement, api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import findAccounts from '@salesforce/apex/accountLoader.findAccounts';

export default class AccountTableView extends LightningElement {
    currentPage;
    recordAmount;
    totalPages;
    @api currentAccs;
    get accPage() {
        return this.currentAccs;
    }

    handlePageChange(event) {
        let pageToRequest;
        switch (event.target.label) {
            case "Next":
                pageToRequest = this.currentPage+1;
                break;
            case "Previous":
                pageToRequest = this.currentPage-1;
                break;
            case ">>":
                pageToRequest=this.totalPages;
                break;
            case "<<":
                pageToRequest=1;
                break;
        }
        //add totalpages comparison
        if (pageToRequest>0 && pageToRequest!=this.currentPage)
        {
            this.requestPage(pageToRequest, this.recordAmount);
            this.currentPage=pageToRequest;
        }
    }
    requestPage(pageToRequest, recordAmount)
    {
        const requestEvent = new CustomEvent("pagerequest", {detail:{page:pageToRequest,limit:recordAmount}});
        this.dispatchEvent(requestEvent);
    }
    connectedCallback() {
        this.currentPage = 1;
        this.recordAmount = 5;
        this.requestPage(this.currentPage,this.recordAmount);
    }
}