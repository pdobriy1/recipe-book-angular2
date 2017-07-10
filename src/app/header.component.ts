import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import {AppRoutingModule} from './app-routing.moudule';
import {DataStorageService} from './data-storage.service';
import {Response} from '@angular/http';
import {Recipe} from './recipes/recipe';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styles : [`
  #navbarheader{
     
  }
  

  `]
  
})
export class HeaderComponent implements OnInit {
 
  constructor(private datastoreService:DataStorageService) { }

  ngOnInit() {
  }

  onSaveData(){

  	this.datastoreService.storeRecipes()
  		.subscribe(
  			(response:Response) => (console.log(response)),
        (error) => console.log(error)
  			);
  }

  onFetchData(){
  	this.datastoreService.getRecipes()
    .subscribe(
      (recipes:Recipe[]) => console.log(recipes),
      (error) => console.log(error)
      );
  }

}
