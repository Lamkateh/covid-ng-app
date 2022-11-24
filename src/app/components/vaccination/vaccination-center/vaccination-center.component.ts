import { Component, Input, OnInit } from '@angular/core';
import { VaccinationCenter } from '../../../models/vaccination-center';
import { VaccinationCenterService } from '../../../services/vaccination-center.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss'],
})
export class VaccinationCenterComponent implements OnInit {
  center?: VaccinationCenter;
  @Input() id: number;

  constructor(
    private centerService: VaccinationCenterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.id) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    this.getCenter(this.id);
  }

  getCenter(id: number) {
    this.centerService.getVaccinationCenterById(10)
      .subscribe((center: { data: VaccinationCenter }) => {
        this.center = center.data;
      });
  }
}
