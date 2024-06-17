import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouplistComponent } from './gouplist.component';

describe('GouplistComponent', () => {
  let component: GouplistComponent;
  let fixture: ComponentFixture<GouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GouplistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
