import {Component, OnInit,Output,EventEmitter ,OnDestroy,ViewChild} from '@angular/core';
import {Ingredient} from '../ingredient';
import {ShoppingListService} from './shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
})
export class ShoppingListAddComponent implements OnInit,OnDestroy {
  @ViewChild ('f') slForm:NgForm;
  subscription:Subscription;
  editMode= false;
  editedItemIndex :number;
  editedItem :Ingredient;

  constructor(private slService:ShoppingListService) { }


  ngOnInit() {
    this.subscription = 
    this.slService.startEditing
      .subscribe(
          (index:number)=>{
              this.editedItemIndex = index;
              this.editMode = true;
              this.editedItem = this.slService.getIngredient(index);
              this.slForm.setValue({
                name:this.editedItem.name,
                amount:this.editedItem.amount
              });
          }
        );
  }

  onAddItem(form:NgForm){
    const value = form.value;
  		const Iningredient = new Ingredient(value.name,value.amount);
      if(this.editMode){
        this.slService.updateIngredient(this.editedItemIndex,Iningredient);
      }else{
        this.slService.addIngredient(Iningredient);
  
      }
      this.editMode=false;
      form.reset();
  	}

   onClearItem(){
     this.slForm.reset();
     this.editMode = false;
   } 

   onDeleteItem(){
     this.slService.deleteIngredient(this.editedItemIndex);
     this.onClearItem();
   }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
