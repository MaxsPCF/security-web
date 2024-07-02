import Swal from 'sweetalert2';
import readXlsxFile from 'read-excel-file';
import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneComponent, NgxDropzoneLabelDirective, NgxDropzonePreviewComponent } from 'ngx-dropzone-next';
import { TemplateService } from '../template.service';
import { TemplateMassive } from '../dto/templateResponses';
import { SpinnerService } from '../../common/spinner/spinner.service';
@Component({
	selector: 'security-templatemassive',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgxDropzoneComponent, NgxDropzoneLabelDirective, NgxDropzonePreviewComponent],
	templateUrl: './templatemassive.component.html'
})
export class TemplatemassiveComponent {
	NumberRecords: number = 0;
	FileName: string = '';
	File?: File;
	TemplateMassive: TemplateMassive[] = [];
	private readonly TemplateService = inject(TemplateService);
	private readonly spinner = inject(SpinnerService);
	readonly files = signal<File[]>([]);
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		if (this.TemplateMassive.length == 0) {
			Swal.fire('Information', 'There are no records', 'warning');
			return;
		}
		this.TemplateService.Distribution(this.TemplateMassive).subscribe((r) => {
			Swal.fire('Information', 'Distribution done successfully', 'success');
		});
	}
	Clean() {}
	Back() {}
	onSelect(event: any) {
		this.spinner.show();
		this.files.set([...this.files(), ...event.addedFiles]);
		this.files().forEach((file) => {
			if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
				Swal.fire('Information', 'Invalid File', 'warning');
				return;
			}
			this.File = file;
			this.FileName = file.name;
			readXlsxFile(file).then((rows) => {
				rows = rows.filter((x) => x[0] != null);
				rows.splice(0, 1);
				rows = rows.sort();
				this.NumberRecords = rows.length;
				this.TemplateMassive = [];
				rows.forEach((row) => {
					if (row[0] != undefined) {
						this.TemplateMassive.push({
							id_ubigeo: row[0].toString() ?? '',
							ubigeo_reniec: row[1].toString() ?? '',
							ubigeo_inei: row[2].toString() ?? '',
							departamento_inei: row[3].toString() ?? '',
							departamento: row[4].toString() ?? '',
							provincia_inei: row[5].toString() ?? '',
							provincia: row[6].toString() ?? '',
							distrito: row[7].toString() ?? '',
							region: row[8].toString() ?? '',
							macroregion_inei: row[9].toString() ?? '',
							macroregion_minsa: row[10].toString() ?? '',
							iso_3166_2: row[11].toString() ?? '',
							fips: row[12].toString() ?? '',
							superficie: Number.parseFloat((row[13] ?? '0').toString()),
							altitud: Number.parseFloat((row[14] ?? '0').toString()),
							latitud: Number.parseFloat((row[15] ?? '0').toString()),
							longitud: Number.parseFloat((row[16] ?? '0').toString())
						});
					}
				});
				setTimeout(() => {
					this.spinner.hide();
				}, 500);
			});
		});
	}
	onRemove(event: any) {
		console.log(event);
		const files = this.files();
		files.splice(files.indexOf(event), 1);
		this.files.set([...files]);
	}
}
