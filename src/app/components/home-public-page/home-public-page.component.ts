import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { CenterService } from "../../services/center.service";
import { Center } from "../../models/center";

@Component({
  selector: "app-home-public-page",
  templateUrl: "./home-public-page.component.html",
  styleUrls: ["./home-public-page.component.scss"],
})
export class HomePublicPageComponent implements OnInit {
  centers?: Center[] = [];
  citySearchTerm: string = "";
  citySearched: string = "";
  listLoading: boolean = false;
  page: number = 0;
  lastPage: boolean = false;

  constructor(
    private centerService: CenterService
  ) { }

  ngOnInit(): void {
    this.getResult();
  }

  onSearchCity() {
    this.citySearched = this.citySearchTerm;
    this.page = 0;
    this.getResult();
  }

  onMoreRequest() {
    this.page++;
    this.getResult();
  }

  getResult() {
    if (this.page === 0) {
      this.listLoading = true;
      this.centers = [];
    }
    if (this.citySearched === "") {
      this.centerService
        .getAllCenters(this.page)
        .subscribe(
          (centers: {
            data: { content: Center[]; last: boolean };
          }) => {
            this.centers.push(...centers.data.content);
            this.listLoading = false;
            this.lastPage = centers.data.last;
          }
        );
    } else {
      this.centerService
        .getCentersByCity(this.citySearched, this.page)
        .subscribe(
          (centers: {
            data: { content: Center[]; last: boolean };
          }) => {
            this.centers.push(...centers.data.content);
            this.listLoading = false;
            this.lastPage = centers.data.last;
          }
        );
    }
  }
}
