import {NgModule,OnInit} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeBookWelcomeComponent} from './recipe-book-welcome.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';

const AppRoutes:Routes = [
{path:'',redirectTo:'/recipes-book-main',pathMatch:'full'},
{path:'recipes-book-main',component:RecipeBookWelcomeComponent},
{path:'recipes',component:RecipesComponent,children:[
	{path:'',component:RecipeStartComponent},
	{path:'new',component:RecipeEditComponent},
	{path:':id',component:RecipeDetailComponent},
	{path:':id/edit',component:RecipeEditComponent}
]
},
{path:'shopping-list',component:ShoppingListComponent},
{path:'signup',component:SignupComponent},
{path:'signin',component:SigninComponent},
{path:'**',component:ShoppingListComponent},

];

@NgModule({
	imports: [RouterModule.forRoot(AppRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule{

	ngOnInit(){

	}
}