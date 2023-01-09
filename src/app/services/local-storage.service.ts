import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any) {
    if (this.storage) this.storage.setItem(key, value);
  }

  remove(key: string) {
    if (this.storage) this.storage.removeItem(key);
  }

  get(key: string): any {
    if (this.storage) return this.storage.getItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  getTotal(): number {
    return this.storage.length;
  }

}
