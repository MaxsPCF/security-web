import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureflaglistComponent } from './featureflaglist.component';

describe('FeatureflaglistComponent', () => {
  let component: FeatureflaglistComponent;
  let fixture: ComponentFixture<FeatureflaglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureflaglistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureflaglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
