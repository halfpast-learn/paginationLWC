import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import getTotalPages from '@salesforce/apex/accountLoader.getTotalPages';

export default class AccountList extends LightningElement {
    @track accs;
    allAccsSize;
    @track totalPages;
    handlePageRequest(event){
        let page = event.detail.page-1;
        let recordAmount = event.detail.limit;
        getAccountList({lim:recordAmount,offset:page*recordAmount})
            .then(result => {
                this.accs=result;
                this.totalPages=this.allAccsSize/recordAmount;
            });
    }
    connectedCallback()
    {
        getTotalPages()
            .then(result => {this.allAccsSize=result;});
    }
}