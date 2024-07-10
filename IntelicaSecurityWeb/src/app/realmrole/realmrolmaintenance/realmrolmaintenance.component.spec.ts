import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmrolmaintenanceComponent } from './realmrolmaintenance.component';

describe('RealmrolmaintenanceComponent', () => {
  let component: RealmrolmaintenanceComponent;
  let fixture: ComponentFixture<RealmrolmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmrolmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmrolmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
