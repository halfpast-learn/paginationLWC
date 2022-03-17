import { LightningElement, api } from 'lwc';

export default class PageSwitch extends LightningElement {
    @api currentPage;
    @api totalPages;
    offset;
    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '50', value: '50' },
            { label: '200', value: '200' },
        ];
    }
    get buttons() {
        let buttonList = [];
        for (let i = -this.offset; i <= this.offset; i++) {
            if (this.currentPage + i > 0 && this.currentPage + i <= this.totalPages)
                buttonList.push({ label: this.currentPage + i, name: this.currentPage + i, disabled: i == 0 });
        }
        return buttonList;
    }
    handlePageChange(event) {
        let page;
        switch (event.target.name) {
            case '>>':
                page = this.totalPages;
                break;
            case '<<':
                page = 1;
                break;
            default:
                break;
        }
        if (!isNaN(event.target.name)) {
            page = event.target.name;
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
    connectedCallback() {
        this.offset = 2;
    }
}
