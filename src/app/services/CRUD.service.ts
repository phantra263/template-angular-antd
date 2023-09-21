import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../common/httpOptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  private baseUrl = environment.apiUrl;
  private apiController = '/api/example';

  constructor(private http: HttpClient) { }

  getAll(listParams?): Observable<any> {
    let params = new HttpParams();
    params = params.append('Keyword', listParams.Keyword ? listParams.Keyword : '');
    params = params.append('PageNumber', listParams.PageNumber ? listParams.PageNumber : 1);
    params = params.append('PageSize', listParams.PageSize ? listParams.PageSize : 10);

    const url = this.baseUrl + this.apiController;
    return this.http.get(url, { params });
  }

  create(data: any) {
    let url = this.baseUrl + this.apiController;
    const body = JSON.stringify(data);
    return this.http.post(url, body, httpOptions).toPromise();
  }

  update(data: any) {
    let url = this.baseUrl + this.apiController + "/" + data.id;
    const body = JSON.stringify(data);
    return this.http.put(url, body, httpOptions).toPromise();
  }

  delete(data: any) {
    let url = this.baseUrl + this.apiController + "/" + data.id;
    return this.http.delete(url, httpOptions).toPromise();
  } 
}
