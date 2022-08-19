import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';
import { catchError, map } from 'rxjs';
import { SearchService } from '../search.service';
import {MatSelectModule} from '@angular/material/select'; 


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

	public data_loaded: Boolean = false;
	public searchForm: FormGroup = new FormGroup({
		searchBar: new FormControl(''),
	});
	public alert = { msg: '', type: '', dismissible: false, class: ''};
	public showAlert = false;
	public results: any;


	public language: string = 'english';
	public langs: any = ['English', 'Chinese', 'Japanese', 'German', 'French', 'Italian'];

	constructor(private search_data: SearchService) { 

	}
  

	ngOnInit(): void {}

	async errorFunction(){
		return {}
	}
	clear(): void{
		this.searchForm.controls['searchBar'].reset();
		this.data_loaded = false;
		this.showAlert = false;
	}

  	onSubmit(): void{
		// Hide all initial results
		this.data_loaded = false;
		this.showAlert = false;

		console.log(this.language, 'language print')

		let params = new HttpParams()
		// this.searchForm.controls['searchBar'].value
		.set('language', this.language)
		.set('document', this.searchForm.controls['searchBar'].value)
		
		let data_request = this.search_data.getData(params)
		data_request
		.pipe(map((res) => res), catchError(e => this.errorFunction()))
		.subscribe((results: any) => {
			if (!results.msg){
				this.data_loaded = true;
				this.results = results;
			}
			else{
				this.alert = {msg: results.msg, type: 'warning', dismissible: true, class: ''};
				this.showAlert = true;
			}
		})
	}

}
