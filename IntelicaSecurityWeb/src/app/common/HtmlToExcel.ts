import * as XLSX from "xlsx";
export class HtmlToExcel {
	ExportTOExcel(idTabla: string, html: string, filename: string, tabname: string, extension: string) {
		var TABLE = document.getElementById(idTabla);
		if (TABLE == null) return;
		TABLE.innerHTML = "";
		TABLE.innerHTML += html;
		const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(TABLE, { raw: true });
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, tabname);
		XLSX.writeFile(wb, filename + "." + extension);
	}
}