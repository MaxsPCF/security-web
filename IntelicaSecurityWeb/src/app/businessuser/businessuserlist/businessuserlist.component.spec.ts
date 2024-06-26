import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessuserlistComponent } from './businessuserlist.component';

describe('BusinessuserlistComponent', () => {
  let component: BusinessuserlistComponent;
  let fixture: ComponentFixture<BusinessuserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessuserlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
