import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  id!:number
  item!: Item
  
  constructor(private route: ActivatedRoute,private itemService:ItemService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.item=new Item();
    this.itemService.getItemById(this.id).subscribe(data=>{
      this.item=data;
    })
  }
}