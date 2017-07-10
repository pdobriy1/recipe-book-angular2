import { Component,OnInit } from '@angular/core';
import { HeaderComponent} from './header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeService}  from './recipes/recipe.service'
import { ShoppingListService } from './shopping-list/shopping-list.service';
import * as firebase from 'firebase';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  providers : [RecipeService,ShoppingListService]
})
export class AppComponent implements OnInit{
  testdata :string[]=[];
  
  ngOnInit(){
  	firebase.initializeApp({
  		apiKey: "AIzaSyBlgVwmaTnS5viHVx6Sor8tskgsfwiU9Gw",
    authDomain: "ng-recipe-book-89985.firebaseapp.com"
  	});
  }
}
