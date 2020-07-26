import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private http: HttpClient) { }

  public get(endpoint: string, params?: any, headers?: any): Observable<any> {
      headers = {};
      return this.http.get(endpoint, {
          headers,
          observe: 'body',
          responseType: 'json',
          params
      });
  }
}