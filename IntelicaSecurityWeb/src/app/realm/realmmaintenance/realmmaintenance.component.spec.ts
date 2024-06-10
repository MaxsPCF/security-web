import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmmaintenanceComponent } from './realmmaintenance.component';

describe('RealmmaintenanceComponent', () => {
  let component: RealmmaintenanceComponent;
  let fixture: ComponentFixture<RealmmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
