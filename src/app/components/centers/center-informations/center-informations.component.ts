import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Center } from "../../../models/center";
import { CenterService } from "../../../services/center.service";

@Component({
  selector: "app-center-informations",
  templateUrl: "./center-informations.component.html",
  styleUrls: ["./center-informations.component.scss"],
})
export class CenterInformationsComponent implements OnInit, OnChanges {
  center?: Center;
  @Input() centerId: number;
  centerLoading: boolean = false;

  constructor(
    private centerService: CenterService
  ) { }

  ngOnInit(): void {
    if (this.centerId) {
      this.getCenter(this.centerId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.centerId) {
      this.getCenter(this.centerId);
    }
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
