import { Injectable } from '@angular/core';
import { IBaseService } from './interface/Ibase.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService implements IBaseService {
  private baseUrl: string;
  private apiKey: string;
  private hash: string;
  private timestamp: string;
  private limitOfItems = '10';

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
    this.hash = environment.hash;
    this.timestamp = environment.timestamp;
  }

  private getEndPoint(url: string): string {
    return `${this.baseUrl}${url}&apikey=${this.apiKey}&hash=${this.hash}&ts=${this.timestamp}&offset=${this.limitOfItems}`;
  }

  get<TClass>(url: string): Observable<TClass> {
    return this.httpClient.get<TClass>(this.getEndPoint(url));
  }

}
