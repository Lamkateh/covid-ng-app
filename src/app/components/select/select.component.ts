import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() terms = [];
  @Input() selectValue: string = '';
  @Output() selectValueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  change(newValue: string) {
    this.selectValue = newValue;
    this.selectValueChange.emit(newValue);
  }

}
