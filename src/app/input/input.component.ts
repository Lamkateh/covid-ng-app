import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() search: boolean = false;
  @Input() inputValue: string = '';
  @Output() inputValueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  change(newValue: string) {
    this.inputValue = newValue;
    this.inputValueChange.emit(newValue);
  }
}
