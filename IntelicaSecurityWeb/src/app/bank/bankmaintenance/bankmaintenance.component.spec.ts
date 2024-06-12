import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankmaintenanceComponent } from './bankmaintenance.component';

describe('BankmaintenanceComponent', () => {
  let component: BankmaintenanceComponent;
  let fixture: ComponentFixture<BankmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
