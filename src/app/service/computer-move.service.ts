import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComputerMoveService {
  constructor() {}

  public getComputerMove(board: string[][]): any {
    let bestVal = -1000;
    let bestMove = [-1, -1];

    for (const row of board) {
      for (const move of row) {
        console.log(move);
      }
    }
  }
}
