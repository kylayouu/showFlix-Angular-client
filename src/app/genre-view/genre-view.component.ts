import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  genre : any = {};

  constructor( 
    @Inject(MAT_DIALOG_DATA)
    public data: { 
      name: string,
      description: string
    }
   ) { }

  ngOnInit(): void {
  }
}
