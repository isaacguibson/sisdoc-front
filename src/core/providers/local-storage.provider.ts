import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable()
export class LocalStorageProvider {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  clear() {
    localStorage.removeItem(TOKEN);
  }
}