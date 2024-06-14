import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientlistComponent } from './clientlist.component';

describe('ClientlistComponent', () => {
  let component: ClientlistComponent;
  let fixture: ComponentFixture<ClientlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
