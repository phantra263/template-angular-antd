import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = environment.apiUrl;

  decodedToken: any;
  currentUser: any;

  constructor(private http: HttpClient) { }

  setAvatarUrl(url: any) {
    if (url)
      return url.includes('http://') ? url : (environment.fileUrl + url);
    else
      return null;
  }
}
