import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoupmaintenanceComponent } from './goupmaintenance.component';

describe('GoupmaintenanceComponent', () => {
  let component: GoupmaintenanceComponent;
  let fixture: ComponentFixture<GoupmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoupmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoupmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
