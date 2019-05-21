export interface Paginator{
    totalPages: number;
    totalElements: number;
    currentPage: number;
    size: number;

    previousPrevPage: number;
    previousPage: number;
    nextPage: number;
    nextNextPage: number;
}