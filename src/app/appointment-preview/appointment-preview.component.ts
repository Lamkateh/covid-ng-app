import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.scss'],
})
export class AppointmentPreviewComponent implements OnInit {
  @Input() time: string;
  @Input() height: string;
  @Input() top: string;

  constructor() {}

  ngOnInit(): void {
    this.time = this.time.slice(0, 5);
  }
}
