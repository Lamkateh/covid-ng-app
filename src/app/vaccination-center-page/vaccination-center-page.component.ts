import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaccination-center-page',
  templateUrl: './vaccination-center-page.component.html',
  styleUrls: ['./vaccination-center-page.component.scss'],
})
export class VaccinationCenterPageComponent implements OnInit {
  centerId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.centerId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
