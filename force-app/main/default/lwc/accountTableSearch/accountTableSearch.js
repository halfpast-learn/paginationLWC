import { LightningElement } from 'lwc';

export default class AccountTableSearch extends LightningElement {
    handleSearch(event) {
        const requestSearch = new CustomEvent('searchrequest', { detail: event.target.value });
        this.dispatchEvent(requestSearch);
    }
}