import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})

@Inject(MAT_DIALOG_DATA)
export class DialogExampleComponent implements OnInit {
stock;
  constructor(private afauth: AngularFireAuth,
    public dialog: MatDialogRef<DialogExampleComponent>
   ) {
this.afauth.authState.subscribe(user => {

  if (user && user.uid) {


    
  }
})


   }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.close()
  }

}
