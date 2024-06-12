import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrymaintenanceComponent } from './countrymaintenance.component';

describe('CountrymaintenanceComponent', () => {
  let component: CountrymaintenanceComponent;
  let fixture: ComponentFixture<CountrymaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrymaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountrymaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
