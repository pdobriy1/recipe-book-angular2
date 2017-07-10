import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {RecipeService} from './recipes/recipe.service';
 
import {Recipe} from './recipes/recipe';
import 'rxjs/Rx';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';


@Injectable()
export class DataStorageService  {
	recipe:Recipe[];
	constructor(private recipeService:RecipeService,private http:Http,private authService:AuthService) {
		
	}

	storeRecipes(){  
		return this.http.put('https://ng-recipe-book-89985.firebaseio.com/recipes-book.json',this.recipeService.getRecipes());
	}

	getRecipes() {
   return this.http.get('https://ng-recipe-book-89985.firebaseio.com/recipes-book.json')
     .map(
       (response:Response) =>{
         const recipes:Recipe[] = response.json();
         return recipes;
       }
       );
      
  }
  getToken(){
        return firebase.auth().currentUser.getToken();
      }

} 