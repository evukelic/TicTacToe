import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComputerMoveService } from 'src/app/service/computer-move.service';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';
import { DialogData } from 'src/app/shared/info-dialog/info-dialog.model';
import { BOARD_DIMENSION } from './board.consts';

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
      const dialogData = this.getDrawDialogData();
      this.openInfoDialog(dialogData);
      return;
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

  private openInfoDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '250px',
      data,
    });
  }

  private getDrawDialogData(): DialogData {
    return { title: 'DRAW', content: "It's a draw! Wanna try again?" };
  }

  private getWinDialogData(): DialogData {
    return { title: "YOU'VE WON!", content: 'Give yourself a tap on the shoulder. Wanna try again?' };
  }

  private getLoseDialogData(): DialogData {
    return { title: "YOU'VE LOST!", content: 'Haha, you suck. Wanna try again?' };
  }
}
