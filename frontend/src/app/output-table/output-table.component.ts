import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css']
})
export class OutputTableComponent implements OnInit {

	@Input() data: any;

    constructor() { }
    

    ngOnInit(): void {
		
    }

}
