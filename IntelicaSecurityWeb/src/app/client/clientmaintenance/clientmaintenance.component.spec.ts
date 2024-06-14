import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientmaintenanceComponent } from './clientmaintenance.component';

describe('ClientmaintenanceComponent', () => {
  let component: ClientmaintenanceComponent;
  let fixture: ComponentFixture<ClientmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientmaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
