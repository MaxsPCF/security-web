import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientscopelistComponent } from './clientscopelist.component';

describe('ClientscopelistComponent', () => {
  let component: ClientscopelistComponent;
  let fixture: ComponentFixture<ClientscopelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientscopelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientscopelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
