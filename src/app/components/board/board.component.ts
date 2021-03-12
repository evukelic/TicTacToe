import { Component, OnInit } from '@angular/core';
import { Move } from '../position/position.model';
import { NUMBER_OF_POSITIONS } from './board.consts';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public moves: string[] = [...Array(NUMBER_OF_POSITIONS)].map((_) => '');

  public constructor() {}

  public ngOnInit(): void {}

  public getMove(move: string, position: number): Move {
    return {
      move,
      position,
    };
  }

  public onPlayerMove(index: number): void {
    this.moves[index] = 'X';
  }
}
