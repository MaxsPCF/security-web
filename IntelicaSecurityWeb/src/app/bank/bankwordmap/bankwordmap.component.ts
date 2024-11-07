import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';
import * as d3 from 'd3';
import { CommonModule } from '@angular/common';
import worldGeoJson from './world.geojson';
import { BankSimpleResponse } from '../dto/bankResponses';
import { BankService } from '../bank.service';

@Component({
  selector: 'security-bankwordmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bankwordmap.component.html',
  styleUrl: './bankwordmap.component.css'
})
export class BankwordmapComponent implements OnInit {
  private readonly bankService = inject(BankService);
  bankData: BankSimpleResponse[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.bankService.GetAll().subscribe((response) => {
      console.log('Banks:', response);
      this.bankData = response;
      console.log(this.bankData);
      this.createWorldMap();
    });
  }

  createWorldMap(): void {
    const width = 960;
    const height = 600;
    const svg = d3
      .select(this.el.nativeElement)
      .select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    const projection = d3
      .geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const data = worldGeoJson;

    if (!data || !data.features) {
      console.error('Invalid data format');
      return;
    }

    const g = svg.append('g');
    const countriesWithBanks = this.bankData.map((bank) => bank.countryName);
    g.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', (d: any) => path(d as GeoJSON.Feature) as string)
      .attr('fill', (d: any) => {
        const feature = d as GeoJSON.Feature;
        const name = feature.properties?.['name'];
        if (countriesWithBanks.includes(name)) {
          return '#ffa500'; // Orange for countries with banks
        } else {
          return '#00cfff';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d: any) => {
        const countryName = (d as GeoJSON.Feature).properties?.['name'];
        const centroid = path.centroid(d as GeoJSON.Feature);
        const [x, y] = centroid;
        svg
          .append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('fill', 'black')
          .attr('class', 'country-label')
          .text((d as GeoJSON.Feature).properties?.['name']);

        if (countriesWithBanks.includes(countryName)) {
          // Mostrar listview
          const listview = this.el.nativeElement.querySelector('#listview');
          const bankList = this.el.nativeElement.querySelector('#bank-list');
          if (listview && bankList) {
            this.renderer.setStyle(listview, 'display', 'block');
            this.renderer.setStyle(listview, 'left', `${event.pageX + 10}px`); // Ajustar la posición a un lado del cursor
            this.renderer.setStyle(listview, 'top', `${event.pageY + 10}px`); // Ajustar la posición a un lado del cursor
            bankList.innerHTML = '';
            const banks = this.bankData.filter(
              (bank) => bank.countryName === countryName
            );
            banks.forEach((bank) => {
              const li = document.createElement('li');
              li.textContent = bank.bankName;
              bankList.appendChild(li);
            });
          }
        }
      })
      .on('mouseout', () => {
        // Eliminar el texto del nombre del país al salir del área
        svg.selectAll('.country-label').remove();
        // Ocultar listview
        const listview = this.el.nativeElement.querySelector('#listview');
        if (listview) {
          this.renderer.setStyle(listview, 'display', 'none');
        }
      });
  }
}
