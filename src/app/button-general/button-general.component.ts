import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-general',
  templateUrl: './button-general.component.html',
  styleUrls: ['./button-general.component.scss'],
})
export class ButtonGeneralComponent implements OnInit {
  @Input() title : string;

  constructor() {}

  ngOnInit(): void {}
}
