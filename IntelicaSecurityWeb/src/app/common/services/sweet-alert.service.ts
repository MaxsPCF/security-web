import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import { assetUrl } from "../../../single-spa/asset-url";
@Injectable({
	providedIn: "root",
})
export class SweetAlertService {
	options: SweetAlertOptions = {
		text: "",
		customClass: {
			image: "image-class-custom",
			container: "container-class-custom",
			confirmButton: "confirm-class-custom",
			cancelButton: "cancel-class-custom",
		},
		showCloseButton: true,
		closeButtonHtml: '<i class="fa fa-times"></i>',
		imageUrl: assetUrl("images/intelica-2021.svg"),
		showCancelButton: false,
		confirmButtonText: "Ok",
		cancelButtonText: "",
		html: "",
	};

	messageBox(message: string): Promise<SweetAlertResult<any>> {
		let options = { ...this.options };
		options.showCancelButton = false;
		options.text = message;
		return Swal.fire(options);
	}

	messageTextBox(message: string = "", swHtml: boolean = false) {
		let options = this.options;
		options.showCancelButton = false;
		if (!swHtml) options.text = message.length === 0 ? "Something went wrong!" : message;
		else options.html = message;
		Swal.fire(options);
	}

	confirmBox(message: string, confirmButtonText: string, cancelButtonText: string, title?: string, html?: string, popupClass?: string): Promise<SweetAlertResult<any>> {
		let options = { ...this.options };
		options.title = title ?? "";
		options.showCancelButton = cancelButtonText == "" ? false : true;
		options.text = message;
		options.confirmButtonText = confirmButtonText;
		options.cancelButtonText = cancelButtonText;
		options.html = html;
		if (popupClass) {
			options.customClass = {
				popup: popupClass,
			};
		}
		return Swal.fire(options);
	}

	messageHTMLBox(title: string, html: string, confirmButtonText: string): Promise<SweetAlertResult<any>> {
		let options = { ...this.options };
		options.showCancelButton = false;
		options.title = title;
		options.html = html;
		options.confirmButtonText = confirmButtonText;
		return Swal.fire(options);
	}
}
