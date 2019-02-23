import { Injectable } from "@angular/core";
import { RequestProvider } from "./request.provider";

Injectable()
export class CrudProvider {

    constructor(public requestProvider: RequestProvider) {}

    success(data): Promise<any> {
        return Promise.resolve(data);
    }

    error(data): Promise<any> {
        return Promise.reject(data);
    }

    create(params: object, endpoint: string) {
        return this.requestProvider
            .setEndPoit(endpoint)
            .setParams(params)
            .post()
            .send()
            .then(data => {
                return this.success(data);
            })
            .catch(error => {
                return this.error(error);
            });
    }

    update(params: object, endpoint: string) {
        return this.requestProvider
            .setEndPoit(endpoint)
            .setParams(params)
            .put()
            .send()
            .then(data => {
                return this.success(data);
            })
            .catch(error => {
                return this.error(error);
            }
        );
    }

    delete(id: number, endpoint: string) {
        return this.requestProvider
            .setEndPoit(endpoint)
            .setParams({ id: id })
            .delete()
            .send()
            .then(data => {
                return this.success(data);
            })
            .catch(error => {
                return this.error(error);
            }
        );
    }

    findAll(params: object, endpoint: string) {
        for (let i in params)
            if (['', 'null', null].indexOf(params[i]) !== -1) delete params[i];



    return this.requestProvider
        .setParams(params)
        .hideSuccessDialog()
        .setEndPoit(endpoint)
        .get()
        .send()
        .then(data => {
            return this.success(data);
        })
        .catch(error => {
            return this.error(error);
        });
    }

    findById(id: number, endpoint: string, params = {}) {
        return this.requestProvider
            .setEndPoit(`${endpoint}/edit/${id}`)
            .hideSuccessDialog()
            .setParams(params)
            .get()
            .send()
            .then(data => {
                return this.success(data);
            })
            .catch(error => {
                return this.error(error);
            }
        );
    }
}