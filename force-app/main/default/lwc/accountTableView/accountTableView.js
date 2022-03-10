import { LightningElement, api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import findAccounts from '@salesforce/apex/accountLoader.findAccounts';

export default class AccountTableView extends LightningElement {
    currentPage;
    recordAmount;
    @api totalPages;
    @api currentAccs;
    get accPage() {
        return this.currentAccs;
    }
    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '50', value: '50' },
            { label: '200', value: '200' },
        ];
    }

    handlePageChange(event) {
        let pageToRequest;
        switch (event.target.label) {
            case 'Next':
                pageToRequest = this.currentPage+1;
                break;
            case 'Previous':
                pageToRequest = this.currentPage-1;
                break;
            case '>>':
                pageToRequest=parseInt(this.totalPages);
                break;
            case '<<':
                pageToRequest=1;
                break;
        }
        
        if (pageToRequest>0 && pageToRequest<=this.totalPages && pageToRequest!=this.currentPage)
        {
            this.requestPage(pageToRequest, this.recordAmount);
            this.currentPage=pageToRequest;
        }
    }
    requestPage(pageToRequest, recordAmount)
    {
        const requestEvent = new CustomEvent('pagerequest', {detail:{page:pageToRequest,limit:recordAmount}});
        this.dispatchEvent(requestEvent);
    }
    updateRecordAmount(event)
    { 
        this.currentPage=1;
        this.recordAmount=event.detail.value;
        this.requestPage(this.currentPage, this.recordAmount)
    }
    connectedCallback() {
        this.currentPage = 1;
        this.recordAmount = 5;
        this.requestPage(this.currentPage,this.recordAmount);
    }
}