import { Component, Input, OnInit } from "@angular/core";
import { Center } from "../../../models/center";
import { CenterService } from "../../../services/center.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-center-informations",
  templateUrl: "./center-informations.component.html",
  styleUrls: ["./center-informations.component.scss"],
})
export class CenterInformationsComponent implements OnInit {
  center?: Center;
  @Input() centerId: number;
  centerLoading: boolean = false;

  constructor(
    private centerService: CenterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.centerId) {
      this.centerId = Number(this.route.snapshot.paramMap.get("id"));
    }
    this.getCenter(this.centerId);
  }

  getCenter(id: number) {
    this.centerLoading = true;
    this.centerService.getCenterById(id)
      .subscribe((center: { data: Center }) => {
        this.center = center.data;
        this.centerLoading = false;
      });
  }
}
