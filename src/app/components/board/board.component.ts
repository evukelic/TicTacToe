import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComputerMoveService } from 'src/app/service/computer-move.service';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';
import { DialogData } from 'src/app/shared/info-dialog/info-dialog.model';
import {
  BOARD_DIMENSION,
  DRAW_CONTENT,
  DRAW_TITLE,
  INVALID_MOVE,
  LOSE_CONTENT,
  LOSE_TITLE,
  OK,
  WIN_CONTENT,
  WIN_TITLE,
} from './board.consts';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public board: string[][] = [];

  public constructor(
    public computerMoveService: ComputerMoveService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.initEmptyBoard();
  }

  public onPlayerMove(row: number, column: number): void {
    const isValid = this.isValidMove(row, column);
    if (!isValid) {
      return;
    }

    this.board[row][column] = 'X';

    const isWin = this.isWin('X', row, column);
    if (isWin) {
      const dialogData = this.getWinDialogData();
      this.openInfoDialog(dialogData);
      return;
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
      const dialogData = this.getDrawDialogData();
      this.openInfoDialog(dialogData);
      return;
    }

    this.board[row][column] = 'O';

    const isWin = this.isWin('O', row, column);
    if (isWin) {
      const dialogData = this.getLoseDialogData();
      this.openInfoDialog(dialogData);
      return;
    }
  }

  private isValidMove(row: number, column: number): boolean {
    if (this.board[row][column] !== '') {
      this.snackBar.open(INVALID_MOVE, OK, {
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

  private isWin(player: string, row: number, column: number): boolean {
    const isRow = this.checkRow(player, row);
    const isColumn = this.checkColumn(player, column);
    const isLeftDiagonal = this.checkLeftDiagonal(player);
    const isRightDiagonal = this.checkRightDiagonal(player);

    return isRow || isColumn || isLeftDiagonal || isRightDiagonal;
  }

  private openInfoDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '250px',
      data,
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.initEmptyBoard();
    });
  }

  private checkRow(player: string, row: number): boolean {
    const isWin =
      this.board[row][0] === player &&
      this.board[row][1] === player &&
      this.board[row][2] === player;

    return isWin;
  }

  private checkColumn(player: string, column: number): boolean {
    const isWin =
      this.board[0][column] === player &&
      this.board[1][column] === player &&
      this.board[2][column] === player;

    return isWin;
  }

  private checkLeftDiagonal(player: string): boolean {
    const isWin =
      this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player;

    return isWin;
  }

  private checkRightDiagonal(player: string): boolean {
    const isWin =
      this.board[2][0] === player && this.board[1][1] === player && this.board[0][2] === player;

    return isWin;
  }

  private getDrawDialogData(): DialogData {
    return { title: DRAW_TITLE, content: DRAW_CONTENT };
  }

  private getWinDialogData(): DialogData {
    return { title: WIN_TITLE, content: WIN_CONTENT };
  }

  private getLoseDialogData(): DialogData {
    return { title: LOSE_TITLE, content: LOSE_CONTENT };
  }
}
