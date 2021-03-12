import { Component, OnInit } from '@angular/core';
import { NUMBER_OF_POSITIONS } from './board.consts';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public moves: string[] = [...Array(NUMBER_OF_POSITIONS)].map((_) => '');

  constructor() {}

  ngOnInit(): void {}
}
