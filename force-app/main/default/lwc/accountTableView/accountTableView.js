import { LightningElement, api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';
import findAccounts from '@salesforce/apex/accountLoader.findAccounts';

export default class AccountTableView extends LightningElement {
    @api currentAccs;
    get accPage() {
        return this.currentAccs;
    }
}