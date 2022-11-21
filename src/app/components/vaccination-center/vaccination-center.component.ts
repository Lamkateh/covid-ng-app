import { Component, Input, OnInit } from '@angular/core';
import { VaccinationCenter } from '../../models/vaccination-center';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss'],
})
export class VaccinationCenterComponent implements OnInit {
  center?: VaccinationCenter;
  @Input() id: number;

  getCenter(id: number) {
    this.service.getVaccinationCenterById(id).subscribe((result) => {
      this.center = result;
    });
  }

  constructor(
    private service: VaccinationCenterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    this.getCenter(this.id);
  }
}
