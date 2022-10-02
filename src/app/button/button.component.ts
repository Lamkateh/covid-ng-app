import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  onClick() {
    this.clickEvent.emit();
  }

  @Input() title: string;
  @Output() clickEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
