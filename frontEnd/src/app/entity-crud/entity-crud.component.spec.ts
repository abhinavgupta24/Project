import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EntityCrudComponent } from './entity-crud.component';
import { ItemService } from '../service/item.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

class MockItemService {
  addItem(item: any) {
    return of({item});
  }
}

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
  navigate(commands:any[]){
    return commands;
  }
}

describe('EntityCrudComponent', () => {
  let component: EntityCrudComponent;
  let fixture: ComponentFixture<EntityCrudComponent>;
  let itemService: ItemService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityCrudComponent],
      providers: [
        { provide: ItemService, useClass: MockItemService },
        { provide: Router, useClass: MockRouter }
      ],
      imports: [FormsModule]
    })
      .compileComponents();

    itemService = TestBed.inject(ItemService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update item and navigate to items list on form submission', fakeAsync(() => {
    spyOn(itemService, 'addItem').and.returnValue(of({}));
    spyOn(router, 'navigateByUrl');

    component.saveItem();
    component.goToItemList();
    tick(); 

    expect(itemService.addItem).toHaveBeenCalledWith(component.item);
    expect(router.navigateByUrl).toHaveBeenCalledWith('items');
  }));

  it('should navigate to items list on goToItemList method call', fakeAsync(() => {
    spyOn(router, 'navigateByUrl');

    component.goToItemList();
    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('items');
  }));

  it('should call saveItem method on form submission', () => {
    spyOn(component, 'saveItem');
    
    component.onSubmit();

    expect(component.saveItem).toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
