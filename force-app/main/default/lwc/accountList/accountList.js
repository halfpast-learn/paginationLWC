import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import getTotalPages from '@salesforce/apex/accountLoader.getTotalPages';

export default class AccountList extends LightningElement {
    @track accs;
    @track totalPages;
    handlePageRequest(event){
        let page = event.detail.page-1;
        let recordAmount = event.detail.limit;
        console.log("page requested: ", page, recordAmount);
        getAccountList({lim:recordAmount,offset:page*recordAmount})
            .then(result => {
                this.accs=result;
                console.log(this.accs);
            });
    }
    connectedCallback()
    {
        getTotalPages()
            .then(result=> {
                this.totalPages=result/5;
                console.log(this.totalPages);
            });
    }
}