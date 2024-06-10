import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmlistComponent } from './realmlist.component';

describe('RealmlistComponent', () => {
  let component: RealmlistComponent;
  let fixture: ComponentFixture<RealmlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
