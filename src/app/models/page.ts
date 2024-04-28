export default class Page {
    
    constructor(private page: number, private size: number){}

    toQueryString(initQueryString: boolean = false): string{
        return initQueryString? '?': '' + `page=${this.page}&size=${this.size}`; 
    }
}