import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, Subject } from "rxjs";
import { FormatDateConstants } from "../constants/format-date.constants";
import { Location } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
declare var require: any;
var moment = require("moment");
var _ = require("lodash");

@Injectable({
	providedIn: "root",
})
export class SharedService {
	public configObservable = new Subject<boolean>();
	isLoading = new BehaviorSubject(false);
	isLoadingHeader = new BehaviorSubject(true);
	isExpandedContent = new BehaviorSubject(false);
	isLoadingPageInfo = new BehaviorSubject(true);
	notifyProfileType = new Subject<string>();
	charges = 0;
	showHelper = new BehaviorSubject(false);
	headerPathName = new BehaviorSubject<string[]>([]);
	pageId: number | undefined = 0;
	openActionMenu$: Subject<boolean> = new Subject<boolean>();
	months = {
		en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	};
	SubtitleDescriptionNotification$!: Observable<string>;

	constructor(private httpClient: HttpClient, private location: Location, private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// this.menuService.currentPagesSubject.subscribe({
				// 	next: (pages) => {
				// 		const urlWithoutParams = this.removeParamsAndSegments(event.url);
				// 		const page = pages.find((d) => d.urlPage?.includes(urlWithoutParams));
				// 		this.pageId = page?.pageId;
				// 	}
				// });
			}
		});
		// this.SubtitleDescriptionNotification$ = this.sharedStateService.SubtitleDescriptionObservable;
	}

	///METODOS GLOBALS.
	isNumberRate(n: any) {
		return !isNaN(parseFloat(n)) && !isNaN(n - 0);
	}

	removePercentage(string: string) {
		if (string.length > 0) {
			if (string.startsWith("%")) string = string.substring(1);
			let last = string.length - 1;
			if (string.endsWith("%")) string = string.substring(0, last);
		}
		return string;
	}

	getTotalAmountByCrncy(col: string, listGeneral: any): number {
		return listGeneral.reduce((a: any, b: any) => a + (b[col] || 0), 0);
	}
	getTotalAverageByColumn(col: string, listGeneral: any): number {
		return listGeneral.reduce((a: any, b: any) => a + (b[col] || 0), 0) / (listGeneral.length || 1);
	}
	getTotalByGroup(col: string, listGeneral: any[], groupBy: string[] | undefined): any[] {
		if (!groupBy?.length) return [listGeneral.reduce((a: any, b: any) => a + (b[col] || 0), 0)];

		let result: { [key: string]: any } = listGeneral.reduce((acc: { [key: string]: any }, item: any) => {
			const groupKey = groupBy.map(prop => item[prop]).join("||");
			acc[groupKey] = (acc[groupKey] || 0) + item[col];
			return acc;
		}, {});

		const propiedades = Object.keys(result).sort();
		const indexGroup = groupBy.indexOf(col);
		if (indexGroup != -1) return propiedades.map(propiedad => propiedad.split("||")[indexGroup]);
		return propiedades.map(propiedad => result[propiedad]);
	}

	transformNegative(value: string): string {
		value = value?.toString() ?? "0.00";
		if (value?.indexOf("-") > -1) {
			return "(" + value.replace("-", "") + ")";
		} else {
			return value.toString();
		}
	}

	formatNumber(value: number, decimalMax: number, decimalMin: number) {
		return value.toLocaleString("en-US", { maximumFractionDigits: decimalMax, minimumFractionDigits: decimalMin });
	}

	// getTermTextByCode(code: string, mode: number = 1): string {
	// 	return this.termsPipe.transform(code, this.globals.languageTerms, mode);
	// }

	// checkUserPermission(code: string): boolean {
	// 	const permission = this.globals.permissions.find((item) => item.code == code);
	// 	return permission !== undefined;
	// }

	clickOutSideValidator(event: any): boolean {
		let res = false;
		if (event !== undefined) {
			const src = (event as Event).srcElement as Element;
			res = src.id !== "button-alignment" && !this.CheckParents(src, 0);
		}
		return res;
	}
	CheckParents(src: Element, c: number): boolean {
		var ids = [];
		ids.push("GenericModal");
		ids.push("FilterModal");
		ids.push("HamburgerMenu");
		ids.push("ContainerTransp");
		ids.push("filter_options");
		ids.push("filter_popup");

		var strings = [];
		strings.push("e-datepicker");
		strings.push("fa-times");
		strings.push("e-today");
		strings.push("e-icons");
		strings.push("e-input-group");
		strings.push("e-input-group");
		strings.push("e-filter-parent");
		strings.push("e-list-item");
		strings.push("e-day");
		strings.push("int-btn-acciones");
		strings.push("fa-bars");
		strings.push("marginStart_1");
		strings.push("validation-alert");
		strings.push("swal2-container");
		strings.push("e-selectall-parent");
		strings.push("e-content e-dropdownbase");
		strings.push("e-list-group-item");

		if (src.className.includes("mSStyle")) return true;
		if (src.className.includes("backTransp")) return false;
		if (src.className.includes("backBlue")) return false;
		if (src.className.includes("d-block modal fade")) return true;
		if (src.className.includes("d-block modal modal-900 fade")) return true;

		var res = ids.some(function (v) {
			return src.id === v;
		});
		if (!res && (src.tagName === "BODY" || src.parentElement === null) && c === 0) {
			res = true;
		}
		if (
			!res &&
			strings.some(function (v) {
				return src.classList.contains(v);
			})
		) {
			res = true;
		}
		if (src.parentElement && !res) {
			c++;
			res = this.CheckParents(src.parentElement, c);
		}
		return res;
	}

	getTitleByRegionOrCountry(CurrentGroup: any, Current: any, field: string) {
		return CurrentGroup ? CurrentGroup.groupName + " - " + Current[field] : Current[field];
	}

	getTitleByBank(ListGeneralCountryAll: any[], CurrentBank: any) {
		return ListGeneralCountryAll.length > 1 ? CurrentBank.groupName + " - " + CurrentBank.countryName + " - " + CurrentBank.bankNameCommercial : CurrentBank.bankNameCommercial;
	}

	roundgen(value: any, precision: any) {
		var multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}

	ReturnAmountPercen(amount: any): string {
		if (isNaN(amount)) {
			amount = 0;
		}

		let resultado: string = "";

		let AmountStr = amount === 0 ? "0" : amount.toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

		if (AmountStr.indexOf(".0") !== -1) AmountStr = amount.toLocaleString("en-US", { maximumFractionDigits: 0, minimumFractionDigits: 0 });

		if (amount < 0 && parseInt(amount.toString()) * -1 === 0) {
			resultado = amount.toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).replace("-", "(") + "%)";
		} else if (amount < 0) resultado = AmountStr.replace("-", "(") + "%)";
		else resultado = AmountStr + "%";

		if (Number.NEGATIVE_INFINITY === amount || Number.POSITIVE_INFINITY === amount) resultado = "";

		return resultado;
	}

	ReturAmountFormat(amount: any): string {
		if (isNaN(amount)) {
			amount = 0;
		}
		amount = this.roundgen(amount, 2);
		let resultado: string = "";
		if (amount < 0 && parseInt(amount.toString()) * -1 === 0) resultado = amount.toString().replace("-", "(") + ")";
		else if (amount < 0 && amount > -1000) {
			resultado = this.roundgen(amount, 0).toString().replace("-", "(") + ")";
		} else if (amount < 0 && -1000000000 >= amount) {
			resultado =
				this.roundgen(amount / 1000000000, 1)
					.toString()
					.replace("-", "(") + " B)";
		} else if (amount < 0 && -1000000 >= amount) {
			resultado =
				this.roundgen(amount / 1000000, 1)
					.toString()
					.replace("-", "(") + " M)";
		} else if (amount < 0) {
			resultado =
				this.roundgen(amount / 1000, 1)
					.toString()
					.replace("-", "(") + " K)";
		} else if (amount < 1000) {
			resultado = this.roundgen(amount, 1).toString();
		} else if (1000000000 < amount) {
			resultado = this.roundgen(amount / 1000000000, 1).toString() + " B";
		} else if (1000000 < amount) {
			resultado = this.roundgen(amount / 1000000, 1).toString() + " M";
		} else {
			resultado = this.roundgen(amount / 1000, 1).toString() + " K";
		}

		if (resultado.indexOf(".") === -1 && amount !== 0) {
			let a = resultado;
			let b = ".0";
			let output = a + b;

			if (resultado.indexOf(" ") !== -1) {
				let position = resultado.indexOf(" ");
				output = [a.slice(0, position), b, a.slice(position)].join("");
			} else if (resultado.indexOf(" ") === -1 && resultado.indexOf(")") !== -1) {
				let position = resultado.indexOf(")");
				output = [a.slice(0, position), b, a.slice(position)].join("");
			}

			resultado = output;
		}
		return resultado;
	}

	downloadFile(fileName: string, blob: any): void {
		const nav = window.navigator as any;
		if (nav.msSaveOrOpenBlob) {
			nav.msSaveOrOpenBlob(blob, fileName);
		} else {
			const link = document.createElement("a");
			link.setAttribute("type", "hidden");
			link.download = fileName;
			link.href = window.URL.createObjectURL(blob.body);
			document.body.appendChild(link);
			link.click();
		}
	}

	viewFile(response: any) {
		const a = document.createElement("a");
		a.setAttribute("style", "display:none;");
		document.body.appendChild(a);
		a.href = URL.createObjectURL(response.body);
		a.target = "_blank";
		a.click();
		document.body.removeChild(a);
	}

	// listStep(): Observable<StepModel[]> {
	// 	return this.httpClient
	// 		.get<StepModel[]>(this.baseUrl + 'ListStepsByUrl', { withCredentials: true })
	// 		.pipe(catchError(this.globals.handleError));
	// }

	GetNumberCurrency(amount: number): string {
		return amount === 0 ? "0" : amount.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
	}
	countDecimals(param: number) {
		if (Math.floor(param) === param) return 0;
		return param.toString().split(".")[1].length || 0;
	}
	isEmpty(value: any) {
		return value === null || value === "" || value === undefined;
	}
	groupByColumn(data: any[], columnGroup: string): any[] {
		let colUnique = [];
		if (columnGroup != "") {
			colUnique = [
				...new Set(
					data.map(item => {
						return item[columnGroup];
					})
				),
			].filter(unique => !this.isEmpty(unique));
		} else {
			colUnique = [
				...new Set(
					data.map(item => {
						return item;
					})
				),
			].filter(unique => !this.isEmpty(unique));
		}
		return colUnique;
	}
	getRoswpanbyData(column: string, index: number, data: Array<any>): number {
		let ValOfAgruppated = null;
		let rowspanI = 1;
		for (let i: number = index - 1; i < data.length; i++) {
			let val = data[i][column];
			if (ValOfAgruppated == null) {
				ValOfAgruppated = val;
			} else if (val !== null && ValOfAgruppated == val) {
				rowspanI++;
			} else if (val !== null && ValOfAgruppated != val) {
				ValOfAgruppated = null;
				return rowspanI;
			}
		}
		return rowspanI;
	}
	formatterStringJsonByKey(data: any[], key: string, separador: string): string {
		let result = "";
		let colUnique: string[] = [];
		data.forEach(element => {
			colUnique.push(element[key]);
		});
		result = colUnique.join(separador);
		return result;
	}
	groupByKey(xs: any, key: any) {
		return xs.reduce(function (rv: any, x: any) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	}
	loadProjectsCss(route: string) {
		const elements = this.CheckProjectsCss(route);
		if (elements.length === 0) {
			const node = document.createElement("link");
			node.href = "./assets/css/projects/" + route + ".css";
			node.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(node);
		}
	}
	removeProjectsCss(route: string) {
		const elements = this.CheckProjectsCss(route);
		elements.forEach(element => {
			document.getElementsByTagName("head")[0].removeChild(element);
		});
	}
	CheckProjectsCss(route: string): any[] {
		const parent = document.getElementsByTagName("head")[0];
		const elements: any[] = [];
		parent.childNodes.forEach((element: any) => {
			var a = element as object;

			if (element.nodeName === "LINK") {
				var elemethref = element["href"];
				if (elemethref && elemethref.indexOf(route) > 0) {
					elements.push(element);
				}
			}
		});
		return elements;
	}
	countDecimalsDigits(numero: any) {
		if (this.isEmpty(numero)) {
			return 0;
		}

		numero = parseFloat(numero);
		let arrayNumero = numero.toString().split(".");
		numero = arrayNumero.length > 1 ? arrayNumero[1] : "";

		return numero.length;
	}
	getMaxNumberDecimals(data: any[], key: string): number {
		let arrCountDecimals: number[] = [];
		data.forEach(element => {
			let decimals = this.countDecimalsDigits(element[key]);
			arrCountDecimals.push(decimals);
		});
		var maxDecimal = Math.max(...arrCountDecimals);
		return maxDecimal;
	}

	setHeaderPathName(name: string[]) {
		this.headerPathName.next(name);
	}

	formatDate(date: string, format: string): string {
		return moment(date).format(format);
	}

	// getDatePickerLocale(): string {
	// 	return this.userService.currentUser.LangSite === 327 ? 'es-PE' : 'en';
	// }

	copyTo(src: any, dest: any) {
		Object.keys(src).forEach(property => {
			dest[property] = src[property];
		});
	}

	isValidEmail(email: string): boolean {
		const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		return emailPattern.test(email);
	}

	isGuid(str: string): boolean {
		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		return guidRegex.test(str);
	}
	containsSpecialCharacters(str: string): boolean {
		const specialCharacter = /^[^\\/?%*:|"<>]+$/;
		return !specialCharacter.test(str);
	}

	isNumber(value: any): boolean {
		return /^-?\d+(\.\d+)?$/.test(value);
	}

	calculatePreviousDate(date: Date, monthsAgo: number) {
		date.setMonth(date.getMonth() - monthsAgo);
		const newDate = moment(date).format(FormatDateConstants.DMYY_MOMENT);

		return newDate;
	}

	getFilteredSearchKey(listTempAll: any[], key: string, value: any, operatorId: number) {
		let listFilter = [];
		switch (operatorId) {
			case 0: //'Contains'
				let word = value.split("&", 100);
				let count: number = 0;
				let listTemp: any;
				if (word.length > 1) {
					word.forEach((element: any) => {
						if (count === 0) {
							listTemp = listTempAll.filter(a => a[key]?.toString()?.toLowerCase().includes(element.toLowerCase()));
						} else {
							listTemp = listTemp.filter((a: any) => a[key]?.toString()?.toLowerCase().includes(element.toLowerCase()));
						}
						count++;
					});
					listFilter = listTemp;
				} else {
					listFilter = listTempAll.filter(a => a[key]?.toString()?.toLowerCase().includes(value));
				}
				break;
			case 1: //'Exact'
				listFilter = value ? listTempAll.filter(a => a[key]?.toString()?.toLowerCase() === value) : listTempAll;
				break;
			case 2: //'Begin'
				listFilter = listTempAll.filter(a => a[key]?.toString()?.toLowerCase().startsWith(value));
				break;
			case 3: //'Ends'
				listFilter = listTempAll.filter(a => a[key]?.toString()?.toLowerCase().endsWith(value));
				break;
			default:
				listFilter = listTempAll.filter(a => a[key]?.toString()?.toLowerCase().includes(value));
				break;
		}

		return listFilter;
	}

	getFilteredSearchKeyV2(listTempAll: any[], key: string, value: any, operatorId: number, subKey: any = null) {
		if (value.length == 0) return listTempAll;
		if (!listTempAll || !key || value == null) return [];

		let listFilter = listTempAll;
		value = value.toString().toLowerCase();
		const words = value.includes("&") ? value.split("&").filter(Boolean) : [value];

		const filterFunction = (item: any) => {
			const itemValue = item[key]?.toString()?.toLowerCase();
			switch (operatorId) {
				case 0: // 'Contains'
					return words.every((word: any) => itemValue?.includes(word));
				case 1: // 'Exact'
					return itemValue === value;
				case 2: // 'Begin'
					return itemValue?.startsWith(value);
				case 3: // 'Ends'
					return itemValue?.endsWith(value);
				default:
					return itemValue?.includes(value);
			}
		};

		if (subKey) {
			// Filtrar primero a nivel de sublista
			listFilter = listFilter.map(filter => {
				return {
					...filter,
					[subKey]: filter[subKey]?.filter((item: any) => filterFunction(item)),
				};
			});
			// Filtrar luego la lista principal basado en si la sublista contiene elementos
			listFilter = listFilter.filter(filter => filter[subKey].length > 0);
		} else {
			// Filtrar solo la lista principal
			listFilter = listFilter.filter(filterFunction);
		}

		return listFilter;
	}

	public transformArrayToHashTable<T, TypeKey extends string | number>(arr: T[], getKey: (p: T) => TypeKey): { [key in TypeKey]: T } {
		//example of Use:
		// this.transformArrayToHashTable<any,string>([{id:1,prop1:"prop1Value"}],(o)=>o.id.toString())
		const hashTable: { [key in TypeKey]: T } = {} as { [key in TypeKey]: T };
		arr.forEach((object: T) => (hashTable[getKey(object)] = object));
		return hashTable;
	}

	public transformArrayToMap<TypeKey, T>(arr: T[], getKey: (p: T) => TypeKey): Map<TypeKey, T> {
		//example of Use:
		// this.transformArrayToMap<string,any>([{id:1,prop1:"prop1Value"}],(o)=>o.id.toString())
		return new Map(arr.map(obj => [getKey(obj), obj]));
	}

	urlHasQaUatSubdomain() {
		const { hostname } = new URL(window.location.href);
		const [subdomain] = hostname.split(".");
		return ["qa", "uat"].includes(subdomain);
	}
	urlHasQaSubdomain() {
		const { hostname } = new URL(window.location.href);
		const [subdomain] = hostname.split(".");
		return ["qa"].includes(subdomain);
	}

	getLastSegmentUrl(): string {
		const segments = this.location.path().split("/");
		const lastSegment = segments[segments.length - 1];
		const match = lastSegment.match(/^(.*\/)([0-9]+)$/);

		const numberMappings: { [key: string]: string } = {
			"0": "intelica-allocated",
			"1": "penalty-summary",
		};

		// Verifica si lastSegment es un número y si tiene un mapeo correspondiente
		if (!isNaN(Number(lastSegment)) && numberMappings.hasOwnProperty(lastSegment)) {
			return numberMappings[lastSegment];
		} else {
			return lastSegment;
		}
	}

	// getLanguageId(): string {
	// 	const langId = this.userService.currentUser.LangSite === null ? Constants.DEFAULT_LANGUAGE : this.userService.currentUser.LangSite;
	// 	switch (langId) {
	// 		case LanguageEnum.English:
	// 			return 'en';
	// 		case LanguageEnum.Spanish:
	// 			return 'es-PE';
	// 		default:
	// 			return 'en';
	// 	}
	// }

	onChangeMultiple($event: any, selectDescription: string): void {
		let select = $event != null ? $event.element.ej2_instances[0] : null;
		if (select?.value.length > 0) {
			select.viewWrapper.innerHTML = `${select.value.length} ${selectDescription}`;
		}
	}
	removeParamsAndSegments(url: string): string {
		// Remover parámetros de consultanom
		const urlWithoutParams = url.split("?")[0];
		// Remover segmentos de ruta dinámicos
		const regex = /\/\d+(?=\/|$)(?!$)/g; // Encuentra segmentos de ruta que consisten en números
		return urlWithoutParams.replace(regex, "");
	}

	openActionMenu() {
		this.openActionMenu$.next(true);
	}
	abbreviateNumber(number: number, fixed: number = 2): string {
		if (number == 0.0 || number == 0 || number == 0.0) {
			return "0";
		}
		let formatCant = "";
		let numberOriginal = number;
		if (number < 0) {
			number = Math.abs(number);
		}
		if (number >= 1000 && number < 1000000) {
			number = parseFloat((number / 1000).toFixed(fixed));
			formatCant = " K";
		} else if (number >= 1000000 && number < 1000000000) {
			number = parseFloat((number / 1000000).toFixed(fixed));
			formatCant = " M";
		} else if (number >= 1000000000 && number <= 1000000000000) {
			number = parseFloat((number / 1000000000).toFixed(fixed));
			formatCant = " B";
		} else {
			number = this.numberFormatByNumberCriteria(number, fixed);
		}
		return numberOriginal < 0 ? `(${number}${formatCant})` : `${number}${formatCant}`;
	}
	numberFormatByNumberCriteria(number: number, fixed: number = 4): any {
		const rounded = (Math.round(number * Math.pow(10, fixed)) / Math.pow(10, fixed)).toFixed(fixed);
		return rounded;
	}
	formatPercentage(number: number, decimal: number = 2) {
		let numberInit = number;
		if (number < 0) {
			number = Math.abs(number);
		}

		number = parseFloat(number.toFixed(decimal));
		let finalNumber = `${number.toLocaleString("en-US")}%`;
		return numberInit < 0 ? `(${finalNumber})` : `${finalNumber}`;
	}

	getMonthName(monthIndex: number, lang: "en" | "es" = "en"): string {
		return this.months[lang][monthIndex];
	}
	formatNumberWithSuffix(number: number, decimalPlaces: number = 0): string {
		if (number === 0) {
			return "0";
		}

		const isNegative = number < 0;
		const absoluteValue = Math.abs(number);

		const scaledNumber = parseFloat((absoluteValue / 1000).toFixed(decimalPlaces)).toLocaleString("en-US");
		const suffix = " K";

		return isNegative ? `(${scaledNumber}${suffix})` : `${scaledNumber}${suffix}`;
	}
	//SYNFCUNTION
	generateGUID(): string {
		let uuid = "",
			i,
			random;
		for (i = 0; i < 32; i++) {
			random = (Math.random() * 16) | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += "-";
			}
			uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
		}
		return uuid;
	}
	attachDataLabelClickEvent(chartElementId: string, dataArray: any[], onClickCallback: (clickedData: any) => void): void {
		const chartElement = document.getElementById(chartElementId);
		if (!chartElement) {
			return;
		}

		const dataLabels = chartElement.querySelectorAll('[id*="_DataLabel_"]');
		const dataLabelsArray = Array.prototype.slice.call(dataLabels) as HTMLElement[];

		dataLabelsArray.forEach((label, index) => {
			// Calcula el índice ajustado para obtener el dato correcto
			const adjustedIndex = index % dataArray.length;

			label.addEventListener("click", () => {
				const clickedData = dataArray[adjustedIndex];
				if (clickedData) {
					onClickCallback(clickedData);
				}
			});
		});
	}
	///
	formatNumberAbsolute(number: number) {
		const isNegative = number < 0;
		if (number < 0) {
			number = Math.abs(number);
		}

		let finalNumber = `${number.toLocaleString("en-US")}`;
		return isNegative ? `(${finalNumber})` : `${finalNumber}`;
	}
}
