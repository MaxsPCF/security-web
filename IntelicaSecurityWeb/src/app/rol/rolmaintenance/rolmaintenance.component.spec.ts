import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolmaintenanceComponent } from './rolmaintenance.component';

describe('RolmaintenanceComponent', () => {
  let component: RolmaintenanceComponent;
  let fixture: ComponentFixture<RolmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
