import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ItemUpdateComponent } from './item-update.component';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';

describe('ItemUpdateComponent', () => {
  let component: ItemUpdateComponent;
  let fixture: ComponentFixture<ItemUpdateComponent>;
  let itemService: ItemService;
  let router: Router;

  beforeEach(() => {
    const itemServiceMock = {
      getItemById: jasmine.createSpy('getItemById').and.returnValue(of(new Item())),
      addItem: jasmine.createSpy('addItem').and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      declarations: [ItemUpdateComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { 'id': 1 } } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    fixture = TestBed.createComponent(ItemUpdateComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    router = TestBed.inject(Router);
  });


  it('should get item on init', () => {
    fixture.detectChanges();
    expect(itemService.getItemById).toHaveBeenCalledWith(1);
    expect(component.item).toBeTruthy();
  });

  it('should add item and navigate to items', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(itemService.addItem).toHaveBeenCalledWith(component.item);
    expect(router.navigate).toHaveBeenCalledWith(['items']);
  });
});
