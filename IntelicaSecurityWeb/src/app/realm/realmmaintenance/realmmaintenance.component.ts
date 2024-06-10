import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Realm } from '../realm';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'security-realmmaintenance',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgSelectModule],
  templateUrl: './realmmaintenance.component.html'
})
export class RealmmaintenanceComponent {
  private readonly router = inject(Router);
  Realm:Realm = new Realm("","")
  GetRows(){}
  Home(){}
  Back(){
    this.router.navigate(["security/realm/list"]);
  }
  Submit(){
    Swal.fire("Information","Information successfully registered","info");
  }
}