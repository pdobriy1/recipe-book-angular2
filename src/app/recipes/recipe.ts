import { Ingredient } from '../ingredient';


export class Recipe {

	constructor(public name,public description,public imagepath,public ingredients:Ingredient[]){
		// name:String;
		// description:String;
		// imagepath : String;
	}
}
