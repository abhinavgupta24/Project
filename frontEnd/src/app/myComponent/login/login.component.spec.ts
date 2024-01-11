import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.login).toBeDefined();
    expect(component.login.get('userGmail').value).toBeNull();
    expect(component.login.get('userPass').value).toBeNull();
  });

  it('should make an HTTP GET request and navigate to greeting on successful login', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockLoginData = {
      userGmail: 'test@example.com',
      userPass: 'testPassword'
    };

    component.login.setValue(mockLoginData);
    component.logindata(component.login);

    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toEqual('GET');
    req.flush([{ userGmail: 'test@example.com', userPass: 'testPassword', token: '1234' }]); // Mock a successful response

    tick(); // simulate the passage of time until all pending asynchronous activities complete

    expect(navigateSpy).toHaveBeenCalledWith(['greeting']);
  }));

  it('should show an alert for incorrect credentials on unsuccessful login', fakeAsync(() => {
    const alertSpy = spyOn(window, 'alert');
    const mockLoginData = {
      userGmail: 'invalid@example.com',
      userPass: 'invalidPassword'
    };

    component.login.setValue(mockLoginData);
    component.logindata(component.login);

    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toEqual('GET');
    req.flush([]); // Mock an empty response

    tick(); // simulate the passage of time until all pending asynchronous activities complete

    expect(alertSpy).toHaveBeenCalledWith('wrong username or password');
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
