import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { BankGroupService } from '../bankgroup/bankgroup.service';

@Component({
  selector: 'security-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbPaginationModule,
    NgxFileDropModule,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  private readonly bankGroupService = inject(BankGroupService);

  public dropped(files: NgxFileDropEntry[]) {
    if (files.length > 0) {
      const fileEntry = files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const base64String = btoa(
            new Uint8Array(event.target.result)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
  
          // Enviamos el base64 al backend
          this.bankGroupService.TestS3(base64String).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.error('Error al enviar al backend:', error);
            }
          );
        };
        reader.readAsArrayBuffer(file);
      });
    }
  }
  

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

}
