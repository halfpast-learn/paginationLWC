import { LightningElement, api } from 'lwc';

export default class PageSwitch extends LightningElement {
    @api currentPage;
    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '50', value: '50' },
            { label: '200', value: '200' },
        ];
    }
    handlePageChange(event) {
        this.requestPage(event.target.label);
    }
    requestPage(page) {
        const requestEvent = new CustomEvent('pagerequest', { detail: page });
        this.dispatchEvent(requestEvent);
    }
    requestRecordAmountChange(event) {
        const requestEvent = new CustomEvent('recordamountchange', { detail: event.target.detail });
        this.dispatchEvent(requestEvent);
    }
}