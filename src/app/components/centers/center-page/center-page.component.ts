import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center-page',
  templateUrl: './center-page.component.html',
  styleUrls: ['./center-page.component.scss'],
})
export class CenterPageComponent implements OnInit {
  centerId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.centerId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
