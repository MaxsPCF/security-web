import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmgroupmaintenanceComponent } from './realmgroupmaintenance.component';

describe('RealmgroupmaintenanceComponent', () => {
  let component: RealmgroupmaintenanceComponent;
  let fixture: ComponentFixture<RealmgroupmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmgroupmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmgroupmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
