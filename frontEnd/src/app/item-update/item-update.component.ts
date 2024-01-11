import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit {

  id!: number;
  item: Item = new Item();
  constructor(private itemService: ItemService, private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.itemService.getItemById(this.id).subscribe(data=>{
      this.item= data;
    })
  }

  onSubmit(){
    this.itemService.addItem(this.item).subscribe(data=>{
      this.goToList();
    })
  }
  goToList(){
    this.router.navigate(['items'])
  }

}
