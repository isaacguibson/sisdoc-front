import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Paginator } from 'src/models/paginator.model';

@Injectable()
export class PaginatorService {

    constructor() {

    }

    newPaginator(){
        let paginator : Paginator = {
            totalPages: 0,
            totalElements: 0,
            currentPage: 0,
            size: 5,
            previousPrevPage: null,
            previousPage: null,
            nextPage: null,
            nextNextPage: null,
        };

        return paginator;
    }

    fillPaginator(totalPages = 0, totalElements = 0, currentPage = 0, size = 0){
        let paginator : Paginator = {
            totalPages: totalPages,
            totalElements: totalElements,
            currentPage: currentPage,
            size: size,
            previousPrevPage: null,
            previousPage: null,
            nextPage: null,
            nextNextPage: null,
        };

        return this.fillOthersPages(paginator);
    }

    fillOthersPages(paginator){
        if(paginator.currentPage + 2 <= paginator.totalPages){
            paginator.nextPage = paginator.currentPage + 1;
        }

        if(paginator.currentPage + 3 <= paginator.totalPages){
            paginator.nextNextPage = paginator.currentPage + 2;
        }

        if(paginator.currentPage - 1 >= 0){
            paginator.previousPage = paginator.currentPage - 1;
        }

        if(paginator.currentPage - 2 >= 0){
            paginator.previousPrevPage = paginator.currentPage - 2;
        }
        return paginator;
    }

}