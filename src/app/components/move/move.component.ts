import { Component, Input, OnInit } from '@angular/core';
import { PLAYER_SRC, COMP_SRC } from './move.consts';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css'],
})
export class MoveComponent implements OnInit {
  @Input() public set setMove(move: string) {
    if (move) {
      this.moveSrc = move === 'X' ? PLAYER_SRC : COMP_SRC;
    }
  }

  public moveSrc: string = '';

  public constructor() {}

  public ngOnInit(): void {}
}
