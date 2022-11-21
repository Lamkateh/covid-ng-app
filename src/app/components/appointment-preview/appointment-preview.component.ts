import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AppointmentDialogComponent } from "../appointment-dialog/appointment-dialog.component";

@Component({
  selector: "app-appointment-preview",
  templateUrl: "./appointment-preview.component.html",
  styleUrls: ["./appointment-preview.component.scss"],
})
export class AppointmentPreviewComponent implements OnInit {
  @Input() time: string;
  @Input() date: string;
  @Input() height: string;
  @Input() top: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.time = this.time.slice(0, 5);
  }

  openDialog(): void {
    this.dialog.open(AppointmentDialogComponent, {
      data: {
        time: this.time,
        date: this.date,
        center_id: Number(this.route.snapshot.paramMap.get("id")),
      },
    });
  }
}
