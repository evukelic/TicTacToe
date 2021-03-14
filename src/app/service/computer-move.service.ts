import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComputerMoveService {
  constructor() {}

  public getComputerMove(board: string[][]): any {
    let bestVal = -1000;
    let bestMove = [-1, -1];

    for (const [rowIndex, row] of board.entries()) {
      for (let [colIndex, move] of row.entries()) {
        if (move === '') {
          board[rowIndex][colIndex] = 'X';
          const moveEvaluation = this.minimax(board, 0, false);

          board[rowIndex][colIndex] = '';
          if (moveEvaluation > bestVal) {
            bestMove = [rowIndex, colIndex];
            bestVal = moveEvaluation;
          }
        }
      }
    }

    return bestMove;
  }

  private minimax(board: string[][], depth: number, isMax: boolean): number {
    const score = this.evaluate(board);

    switch (score) {
      case 10:
        return score;
      case -10:
        return score;
    }

    const isMovesLeft = this.isMovesLeft(board);
    if (!isMovesLeft) {
      return 0;
    }

    if (isMax) {
      let best = -1000;
      for (const [rowIndex, row] of board.entries()) {
        for (let [colIndex, move] of row.entries()) {
          if (move === '') {
            board[rowIndex][colIndex] = 'X';
            const minimaxVal = this.minimax(board, depth + 1, !isMax);
            best = Math.max(best, minimaxVal);
            board[rowIndex][colIndex] = '';
          }
        }
      }

      return best - depth;
    } else {
      let best = 1000;
      for (const [rowIndex, row] of board.entries()) {
        for (let [colIndex, move] of row.entries()) {
          if (move === '') {
            board[rowIndex][colIndex] = 'O';
            const minimaxVal = this.minimax(board, depth + 1, isMax);
            best = Math.min(best, minimaxVal);
            board[rowIndex][colIndex] = '';
          }
        }
      }

      return best + depth;
    }
  }

  private evaluate(board: string[][]): number {
    for (const [index, row] of board.entries()) {
      if (board[index][0] === board[index][1] && board[index][1] === board[index][2]) {
        if (board[index][0] === 'X') {
          return 10;
        } else {
          board[index][0] === 'O';
        }
        return -10;
      }
    }

    for (const [index, col] of board.entries()) {
      if (board[0][index] === board[1][index] && board[1][index] === board[2][index]) {
        if (board[0][index] === 'X') {
          return 10;
        } else if (board[0][index] === 'O') {
          return -10;
        }
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === 'X') {
        return 10;
      } else if (board[0][0] === 'O') {
        return -10;
      }
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === 'X') {
        return 10;
      } else if (board[0][2] === 'O') {
        return -10;
      }
    }

    return 0;
  }

  private isMovesLeft(board: string[][]): boolean {
    for (const row of board) {
      for (const move of row) {
        if (move === '') {
          return true;
        }
      }
    }

    return false;
  }
}
