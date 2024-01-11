import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items!:Item[];
  constructor(private itemService:ItemService ,private router:Router){}
  
  ngOnInit(): void {
    this.getItems();
  }

  private getItems(){
    this.itemService.getItem().subscribe(data=>{
      this.items=data;
    });
  }
  updateItem(id: number){
    this.router.navigate(['updateItem',id]);
  }
  deleteItem(id:number){
    this.itemService.deleteItem(id).subscribe(data=>{
      this.router.navigate(['items'])
      console.log(data)
    })  
  }
  itemDetails(id: number){
    this.router.navigate(['item-details',id]);
  }
}
