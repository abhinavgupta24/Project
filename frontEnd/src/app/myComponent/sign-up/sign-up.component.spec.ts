import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.signUp).toBeDefined();
    expect(component.signUp.get('userName').value).toBeNull();
    expect(component.signUp.get('userGmail').value).toBeNull();
    expect(component.signUp.get('userPass').value).toBeNull();
    expect(component.signUp.get('userPhone').value).toBeNull();
  });

  it('should make an HTTP POST request and navigate to login on successful submission', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockUserData = {
      userName: 'testUser',
      userGmail: 'test@example.com',
      userPass: 'testPassword',
      userPhone: '1234567890'
    };

    component.signUp.setValue(mockUserData);
    component.signupdata(component.signUp);

    const req = httpTestingController.expectOne('http://localhost:8080/register');
    expect(req.request.method).toEqual('POST');
    req.flush({}); // Mock a successful response

    tick(); // simulate the passage of time until all pending asynchronous activities complete

    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
