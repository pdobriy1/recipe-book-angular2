import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {FormArray,FormGroup,FormControl,Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id:number;
	editMode = false;
  recipeForm:FormGroup;

  constructor(private router:Router,private recipeService:RecipeService,private route:ActivatedRoute) { }
//  get formData() {
//   return <FormArray>this.recipeForm.get('Data'); 
// }
  getTasks(recipeForm){
    return recipeForm.get('ingredients').controls;
}

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params:Params) =>{
  				this.id =+ params['id'];
  				this.editMode = params['id'] != null;
  				console.log(this.editMode);
          this.initForm();
  			}
  		);
  }

  onSubmit(){
    const newRecipe = new Recipe(this.recipeForm.value['name'],
                                 this.recipeForm.value['description'],
                                this.recipeForm.value['imagePath'],
                                this.recipeForm.value['ingredients']);
    console.log(this.recipeForm);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe/*or this.recipeForm.value*/);
    }else{
      this.recipeService.addRecipe(newRecipe/*or this.recipeForm.value*/);
    }
    this.onCancel();
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  ngAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
  }

  initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

    if(this.editMode){
      const recipe =  this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagepath;
      recipeDescription = recipe.description;

        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
              recipeIngredient.push(
                new FormGroup({
                    'name': new FormControl(ingredient.name,Validators.required),
                    'amount':new FormControl(ingredient.amount,[
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
                );
          }
        }
    }

    this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName,Validators.required),
        'imagePath' : new FormControl(recipeImagePath,Validators.required),
        'description' : new FormControl(recipeDescription,Validators.required),
        'ingredients' : recipeIngredient
  });
}

}
