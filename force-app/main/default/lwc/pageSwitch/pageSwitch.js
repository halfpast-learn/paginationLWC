import { LightningElement, api } from 'lwc';

export default class PageSwitch extends LightningElement {
    @api currentPage;
    @api totalPages;
    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '50', value: '50' },
            { label: '200', value: '200' },
        ];
    }
    handlePageChange(event) {
        let page;
        switch (event.target.label) {
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
            this.requestPage(page);
        }
    }
    requestPage(page) {
        const requestEvent = new CustomEvent('pagerequest', { detail: page });
        this.dispatchEvent(requestEvent);
    }
    requestRecordAmountChange(event) {
        const requestEvent = new CustomEvent('recordamountchange', {
            detail: event.detail.value,
        });
        this.dispatchEvent(requestEvent);
    }
}
