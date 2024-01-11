import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-entity-crud',
  templateUrl: './entity-crud.component.html',
  styleUrls: ['./entity-crud.component.scss']
})
export class EntityCrudComponent implements OnInit{

  item: Item = new Item();
  constructor(private itemService: ItemService,private router: Router){}
  ngOnInit(): void {    
  }
  
  saveItem(){
    this.itemService.addItem(this.item).subscribe(data=>{
      console.log(data)
      this.goToItemList();
    })
  }

  goToItemList(){
    this.router.navigate(['items']);
  }

  onSubmit(){
    console.log(this.item)
    this.saveItem();
  }
  
}
