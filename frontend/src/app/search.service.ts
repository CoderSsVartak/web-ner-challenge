import { Injectable } from '@angular/core';
import { BACKEND_URL } from './backend_url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private BASE_URL = BACKEND_URL;
	constructor(private http: HttpClient) { }

	getData(params: any){
		return this.http.get(this.BASE_URL, { params: params })
	}	

}
