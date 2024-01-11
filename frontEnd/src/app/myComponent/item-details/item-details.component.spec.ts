import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ItemDetailsComponent } from './item-details.component';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/model/item';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let itemService: ItemService;

  beforeEach(() => {
    const itemServiceMock = {
      getItemById: jasmine.createSpy('getItemById').and.returnValue(of(new Item()))
    };

    TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { 'id': 1 } } } }
      ]
    });

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get item on init', () => {
    fixture.detectChanges();
    expect(itemService.getItemById).toHaveBeenCalledWith(1);
    expect(component.item).toBeTruthy();
  });
});
