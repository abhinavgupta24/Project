import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ItemService } from './service/item.service';
import { AuthService } from './auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let itemService: ItemService;
  let authService: AuthService;

  beforeEach(() => {
    const itemServiceMock = {
      getItem: jasmine.createSpy('getItem').and.returnValue(of([{productId: 1, productName: 'Item 1',prodcutDesc:'item 1 desc',productPrice:2345}]))
    };

    const authServiceMock = {
      logout: jasmine.createSpy('logout')
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get items on init', () => {
  //   spyOn(component,'getItem');
  //   fixture.detectChanges();
  //   expect(component.getItem).toHaveBeenCalled();
  //   expect(itemService.getItem).toHaveBeenCalled();
  // });

  it('should logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
