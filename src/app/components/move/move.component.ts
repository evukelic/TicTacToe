import { Component, Input, OnInit } from '@angular/core';
import { COMP_SRC, COMP_WIN_SRC, PLAYER_SRC, PLAYER_WIN_SRC } from './move.consts';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css'],
})
export class MoveComponent implements OnInit {
  @Input() public set setIsWin(isWin: boolean) {
    if (isWin) {
      this.moveSrc = this.move === 'X' ? PLAYER_WIN_SRC : COMP_WIN_SRC;
    }
  }

  @Input() public set setMove(move: string) {
    if (move) {
      this.move = move;
      this.moveSrc = move === 'X' ? PLAYER_SRC : COMP_SRC;
    }
  }

  public move: string;
  public moveSrc: string;

  public constructor() {}

  public ngOnInit(): void {}
}
