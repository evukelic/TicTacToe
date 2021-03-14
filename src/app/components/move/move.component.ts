import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css'],
})
export class MoveComponent implements OnInit {
  @Input() public move: string;

  public constructor() {}

  public ngOnInit(): void {}
}
