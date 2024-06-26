import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TemplatemaintenanceComponent } from "./templatemaintenance.component";
describe("TemplatemaintenanceComponent", () => {
	let component: TemplatemaintenanceComponent;
	let fixture: ComponentFixture<TemplatemaintenanceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TemplatemaintenanceComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TemplatemaintenanceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});