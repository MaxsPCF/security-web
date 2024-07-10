import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmgrouplistComponent } from './realmgrouplist.component';

describe('RealmgrouplistComponent', () => {
  let component: RealmgrouplistComponent;
  let fixture: ComponentFixture<RealmgrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmgrouplistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmgrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
