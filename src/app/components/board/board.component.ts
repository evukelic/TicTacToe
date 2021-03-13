import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComputerMoveService } from 'src/app/service/computer-move.service';
import { BOARD_DIMENSION } from './board.consts';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public board: string[][] = [];

  public constructor(public computerMoveService: ComputerMoveService, private snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.initEmptyBoard();
  }

  public onPlayerMove(row: number, column: number): void {
    const isValid = this.isValidMove(row, column);
    if (!isValid) {
      return;
    }

    this.board[row][column] = 'X';

    const isWin = this.isWin();
    if (isWin) {
      //todo dialog w message newgame/exit
    }

    this.setComputerMove();
  }

  private initEmptyBoard(): void {
    this.board = [...Array(BOARD_DIMENSION)].map((_) => [...Array(BOARD_DIMENSION)].map((_) => ''));
  }

  private setComputerMove(): void {
    const [row, column] = this.computerMoveService.getComputerMove(this.board);

    const isDraw = this.isDraw(row, column);
    if (isDraw) {
      //todo dialog w message newgame/exit
    }

    this.board[row][column] = 'O';

    const isWin = this.isWin();
    if (isWin) {
      //todo dialog w message newgame/exit
    }
  }

  private isValidMove(row: number, column: number): boolean {
    if (this.board[row][column] !== '') {
      this.snackBar.open('Invalid move!', 'OK', {
        duration: 2000,
      });

      return false;
    }

    return true;
  }

  private isDraw(row: number, column: number): boolean {
    const isDraw = row === -1 || column === -1;
    return isDraw;
  }

  private isWin(): boolean {
    //todo check board for the win
    return false;
  }
}
