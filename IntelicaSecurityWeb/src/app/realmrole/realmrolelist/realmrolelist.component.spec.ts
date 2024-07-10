import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmrolelistComponent } from './realmrolelist.component';

describe('RealmrolelistComponent', () => {
  let component: RealmrolelistComponent;
  let fixture: ComponentFixture<RealmrolelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmrolelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmrolelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
