import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ItemListComponent } from './item-list.component';
import { ItemService } from 'src/app/service/item.service';
import { Router } from '@angular/router';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemService: ItemService;
  let router: Router;

  beforeEach(() => {
    const itemServiceMock = {
      getItem: jasmine.createSpy('getItem').and.returnValue(of([{productId: 1, productName: 'Item 1', productDesc:'item 1 desc',productPrice:2345}])),
      deleteItem: jasmine.createSpy('deleteItem').and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ItemListComponent],
      providers: [{ provide: ItemService, useValue: itemServiceMock }]
    });

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items on init', () => {
    fixture.detectChanges();
    expect(itemService.getItem).toHaveBeenCalled();
    expect(component.items.length).toBe(1);
  });

  it('should delete item', () => {
    const spy = spyOn(router, 'navigate');
    component.deleteItem(1);
    expect(itemService.deleteItem).toHaveBeenCalledWith(1);
    expect(spy).toHaveBeenCalledWith(['items']);
  });

  it('should update item', () => {
    const spy = spyOn(router, 'navigate');
    component.updateItem(1);
    expect(spy).toHaveBeenCalledWith(['updateItem', 1]);
  });

  it('should show item details', () => {
    const spy = spyOn(router, 'navigate');
    component.itemDetails(1);
    expect(spy).toHaveBeenCalledWith(['item-details', 1]);
  });
});
