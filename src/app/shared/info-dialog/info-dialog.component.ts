import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from './info-dialog.model';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public ngOnInit(): void {}

  public onExitClick(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/start');
  }

  public onNewGameClick(): void {
    this.dialogRef.close();
  }
}
