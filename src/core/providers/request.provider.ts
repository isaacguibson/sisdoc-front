import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpVerb } from "../../enum/http-verb.enum";

import { LocalStorageProvider } from "./local-storage.provider";

import { cloneDeep } from "lodash";
import { Message } from "../class/message.class";

@Injectable()
export class RequestProvider {

    message = new Message();
    url: string = null;
    method: HttpVerb = null;
    endpoint: string = null;
    params: object = {};
    headers: object = {};

    _showSuccessDialog = true;

    hasToken: boolean = false;

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageProvider
    ) { }

    setUrl(url: string) {
        this.url = url;
        return this;
    }
    
    hideSuccessDialog() {
        this._showSuccessDialog = false;
        return this;
    }

    getUrl(): string {
        let url = "";
        if (this.url === null) {
          url = environment.apiUrl;
        } else {
          url = this.url;
        }
    
        if (this.endpoint !== null) url += this.endpoint;
    
        if (parent.location.hostname === "localhost") {
          let endpoint = this.endpoint.replace("/api/v1/", "").split("/");
          let module = endpoint[0];
          endpoint.splice(0, 1);
          let method = "";
          switch (this.method) {
            case HttpVerb.GET:
              method = "get";
              break;
            case HttpVerb.POST:
              method = "post";
              break;
            case HttpVerb.PUT:
              method = "put";
              break;
            case HttpVerb.DELETE:
              method = "delete";
              break;
          }
    
          let json = `${method}/${endpoint.join("_")}`;
          url = `assets/json/${module}/${json}.json`;
        }
    
        if (Object.keys(this.params).length > 0 && this.method === HttpVerb.GET)
          url += this.getStringParams();
    
        return url;
      }
    
      setParams(data: object): RequestProvider {
        this.params = data;
        return this;
      }
    
      getParams() {
        return JSON.stringify(this.params);
      }
    
      sendToken(): RequestProvider {
        this.hasToken = true;
        return this;
      }
    
    getOptions() {
        let headers = {};
        if (!Object.keys(this.headers).length) {
            headers = {
                "Content-Type": "application/json"
            };

        } else {
            headers = this.headers;
        }
        headers["Host-Origin"] = window.location.host;

        let options = {
            headers: new HttpHeaders(headers)
        };

        if (this.method === HttpVerb.DELETE) {
            options["body"] = this.getParams();
        }

        return options;
    }
    
    getStringParams(): string {
        let params: string = "";
        Object.keys(this.params).forEach((value, index)=> {
            params += value + "=" + this.params[value];

            if (index < Object.keys(this.params).length - 1) params += "&";
        });
        return "?" + params;
    }
    
    setEndPoit(endPoint: string) {
        this.endpoint = endPoint;
        return this;
    }
    
    // HTTP METHODS
    post(): RequestProvider {
        this.method = HttpVerb.POST;
        return this;
    }
    
    get(): RequestProvider {
        this.method = HttpVerb.GET;
        return this;
    }
    
    delete(): RequestProvider {
        this.method = HttpVerb.DELETE;
        return this;
    }
    
    put(): RequestProvider {
        this.method = HttpVerb.PUT;
        return this;
    }
    
    return(request) {
        return request
            .toPromise()
            .then(data => {
            return this.success(data);
        })
        .catch(e => {
            return this.error(e);
        });
    }
    
    
    async sendAsync() {
        try {
            return await this.send()
        } catch (e) {
            return false;
        }
    }
    
    send(): Promise<any> {
        let method = cloneDeep(this.method);

        switch (method) {
            case HttpVerb.POST:
            return this.return(
                this.http.post(this.getUrl(), this.getParams(), this.getOptions())
            );
            case HttpVerb.GET:
            return this.return(this.http.get(this.getUrl(), this.getOptions()));
            case HttpVerb.PUT:
            return this.return(
                this.http.put(this.getUrl(), this.getParams(), this.getOptions())
            );
            case HttpVerb.DELETE:
            return this.return(this.http.delete(this.getUrl(), this.getOptions()));
        }
    }
    
    // CALLBACK METHODS
    success(data): Promise<any> {
        this.clearRequest();

        if (data.headers !== undefined) {
            let token = data.headers.get("token");
            if (token !== null && token !== this.localStorage.getToken()) {
            this.localStorage.setToken(token);
            }
        }
        return Promise.resolve(data);
    }
    
    error(data): Promise<any> {
        this.clearRequest();

        if (typeof data.error !== "undefined") {
            this.message
            .setType("error")
            .setTitle(data.error.title)
            .setMessage(data.error.message)
            .setConfirmButton('Ok', '#d32f2f')
            .alert();
        }

        try {
            if (data.headers !== undefined) {
            let token = data.headers.get("token");
            if (token !== null && token !== this.localStorage.getToken()) {
                this.localStorage.setToken(token);
            }
            }

            if (data.status === 401) {
            this.localStorage.clear();
            this.clearRequest();

            return Promise.reject(data);
            }


            return Promise.reject(data);
        } catch (e) {
            this.clearRequest();
            return Promise.reject(data);
        }
    }
    
    clearRequest() {
    this.params = {};
    this.url = null;
    this.hasToken = false;
    this._showSuccessDialog = true;
    }
}