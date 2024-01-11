import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from "@angular/common/http/testing";
import { ItemService } from './item.service';
import { Item } from '../model/item';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ItemService]
    });
    service = TestBed.inject(ItemService);
    httpMock=TestBed.inject(HttpTestingController);

    
  });
  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch item',()=>{
    const dummyItems:Item[]=
    [
      {productId:1,productName:'item1',productDesc:'item 1 desc', productPrice:2500},
      {productId:2,productName:'item2',productDesc:'item 2 desc', productPrice:2543}
    ];
    service.getItem().subscribe(items=>{
      expect(items.length).toBe(2);
      expect(items).toEqual(dummyItems);
    })
    const req=httpMock.expectOne(`${service.baseURL}/api/item`)
    expect(req.request.method).toBe('GET');
    req.flush(dummyItems);
  });
  it('should add an item', () => {
    const dummyItem: Item = { productId:3, productName:'Item 3',productDesc:'Item 3 desc', productPrice:2311 };

    service.addItem(dummyItem).subscribe(response => {
      expect(response).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(`${service.baseURL}/api/item/save`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyItem);
  });
  it('should fetch item by id', () => {
    const dummyItem: Item = {productId:1,productName:'item1',productDesc:'item 1 desc', productPrice:2500};
    const id = 1;

    service.getItemById(id).subscribe(item => {
      expect(item).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(`${service.baseURL}/api/item/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyItem);
  });
  it('should update an item', () => {
    const dummyItem: Item = { productId:1,productName:'item1',productDesc:'item 1 desc', productPrice:2500 };
    const productId = 1;

    service.updateItem(productId, dummyItem).subscribe(response => {
      expect(response).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(`${service.baseURL}/api/item/${productId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyItem);
  });
  it('should delete an item', () => {
    const productId = 1;
    service.deleteItem(productId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.baseURL}/api/item/delete/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

