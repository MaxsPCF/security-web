import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatelistComponent } from './templatelist.component';

describe('TemplatelistComponent', () => {
  let component: TemplatelistComponent;
  let fixture: ComponentFixture<TemplatelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
