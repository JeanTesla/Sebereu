export class Pageable<T> {
    content: T[];
    pageable: string;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    number: number;
    sort: { sorted: boolean, unsorted: boolean, empty: boolean }; 
    numberOfElements: number;
    size: number;
    empty: boolean;
}