import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountLoader.getAccountList';

export default class AccountList extends LightningElement {
    @wire(getAccountList) accs;
}