import { Component, Input, OnInit } from "@angular/core";
import { VaccinationCenter } from "../../../models/vaccination-center";
import { VaccinationCenterService } from "../../../services/vaccination-center.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-vaccination-center",
  templateUrl: "./vaccination-center.component.html",
  styleUrls: ["./vaccination-center.component.scss"],
})
export class VaccinationCenterComponent implements OnInit {
  center?: VaccinationCenter;
  @Input() centerId: number;

  constructor(
    private centerService: VaccinationCenterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.centerId) {
      this.centerId = Number(this.route.snapshot.paramMap.get("id"));
    }
    this.getCenter(this.centerId);
  }

  getCenter(id: number) {
    this.centerService.getVaccinationCenterById(id)
      .subscribe((center: { data: VaccinationCenter }) => {
        this.center = center.data;
      });
  }
}
