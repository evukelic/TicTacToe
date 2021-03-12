import { Component, OnInit } from '@angular/core';
import { ComputerMoveService } from 'src/app/service/computer-move.service';
import { BOARD_DIMENSION } from './board.consts';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public board: string[][] = [];

  public constructor(public computerMoveService: ComputerMoveService) {}

  public ngOnInit(): void {
    this.initEmptyBoard();
  }

  public onPlayerMove(row: number, column: number): void {
    this.board[row][column] = 'X';

    this.setComputerMove();
  }

  private initEmptyBoard(): void {
    this.board = [...Array(BOARD_DIMENSION)].map((_) => [...Array(BOARD_DIMENSION)].map((_) => ''));
  }

  private setComputerMove(): void {
    const [row, column] = this.computerMoveService.getComputerMove(this.board);
    this.board[row][column] = 'O';
  }
}
