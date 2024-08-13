import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureflagmaintenanceComponent } from './featureflagmaintenance.component';

describe('FeatureflagmaintenanceComponent', () => {
  let component: FeatureflagmaintenanceComponent;
  let fixture: ComponentFixture<FeatureflagmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureflagmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureflagmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
