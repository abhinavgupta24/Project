import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should add an Authorization header', () => {
    localStorage.setItem('token', '12345');

    httpClient.get('/api').subscribe();

    const httpRequest: TestRequest = httpMock.expectOne('/api');

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer 12345');
  });

  it('should not add an Authorization header', () => {
    localStorage.removeItem('token');

    httpClient.get('/api').subscribe();

    const httpRequest: TestRequest = httpMock.expectOne('/api');

    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });
});
