import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientscopemaintenanceComponent } from './clientscopemaintenance.component';

describe('ClientscopemaintenanceComponent', () => {
  let component: ClientscopemaintenanceComponent;
  let fixture: ComponentFixture<ClientscopemaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientscopemaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientscopemaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
