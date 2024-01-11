import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if token exists', () => {
    localStorage.setItem('token', '12345');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should return false and navigate to login if token does not exist', () => {
    const spy = spyOn(router, 'navigate');
    localStorage.removeItem('token');
    expect(guard.canActivate()).toBeFalse();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
});
