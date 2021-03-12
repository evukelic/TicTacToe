import { Component, Input, OnInit } from '@angular/core';
import { Move } from './position.model';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent implements OnInit {
  @Input() public move: Move;

  constructor() {}

  ngOnInit(): void {}
}
