import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-center-management-page",
  templateUrl: "./center-management-page.component.html",
  styleUrls: ["./center-management-page.component.scss"],
})
export class CenterManagementPageComponent implements OnInit {
  doctors?: User[] = [];
  centerId: number;
  nameSearchTerm: string = "";
  nameSearched: string = "";
  listLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.centerId = Number(this.route.snapshot.paramMap.get("id"));
    this.getDoctors();
  }

  getDoctors() {
    this.userService.getDoctors(this.centerId).subscribe({
      next: (data) => {
        this.doctors = data.data;
      },
      error: (err) => {},
    });
  }

  getResult() {
    return this.doctors.filter((doctor) => {
      return doctor.firstName
        .toLowerCase()
        .includes(this.nameSearchTerm.toLowerCase());
    });
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
