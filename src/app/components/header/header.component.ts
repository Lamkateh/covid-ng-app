import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  id: number;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    this.id = 10; //TODO
  }
}
