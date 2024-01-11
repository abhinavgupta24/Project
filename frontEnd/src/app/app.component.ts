// import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { title } from 'process';
import { AuthService } from './auth.service';
import { Item } from './model/item';
import { ItemService } from './service/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title="frontEnd";
  public items!: Item[];


  constructor(private itemService: ItemService,public authService: AuthService){}

  ngOnInit(): void {
      this.getItem();
  }
  public getItem(): void{
    this.itemService.getItem().subscribe(
      (response:Item[])=>{
        this.items =response;
      }
      );
  }
  public logout():void{
    this.authService.logout();
  }

}
