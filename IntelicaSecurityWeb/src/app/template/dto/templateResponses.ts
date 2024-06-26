export interface TemplateSimpleResponse {
	templateCode: string;
	templateName: string;
}
export interface TemplateMaintenanceResponse {
	templateCode: string;
}
export interface TemplateMassive {
	id_ubigeo: string;
	ubigeo_reniec: string;
	ubigeo_inei: string;
	departamento_inei: string;
	departamento: string;
	provincia_inei: string;
	provincia: string;
	distrito: string;
	region: string;
	macroregion_inei: string;
	macroregion_minsa: string;
	iso_3166_2: string;
	fips: string;
	superficie: number;
	altitud: number;
	latitud: number;
	longitud: number;
}