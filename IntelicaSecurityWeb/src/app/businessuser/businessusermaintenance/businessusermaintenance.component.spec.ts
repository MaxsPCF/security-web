import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessusermaintenanceComponent } from './businessusermaintenance.component';

describe('BusinessusermaintenanceComponent', () => {
  let component: BusinessusermaintenanceComponent;
  let fixture: ComponentFixture<BusinessusermaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessusermaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessusermaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
