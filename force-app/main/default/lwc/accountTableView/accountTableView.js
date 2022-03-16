import { LightningElement, api } from 'lwc';

export default class AccountTableView extends LightningElement {
    @api currentAccs;
    get accPage() {
        return this.currentAccs;
    }
}