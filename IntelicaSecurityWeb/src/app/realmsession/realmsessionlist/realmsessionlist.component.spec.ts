import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmsessionlistComponent } from './realmsessionlist.component';

describe('RealmsessionlistComponent', () => {
  let component: RealmsessionlistComponent;
  let fixture: ComponentFixture<RealmsessionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmsessionlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmsessionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
