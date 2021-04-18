import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as FileSaver from 'file-saver';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

 
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {
 
firstheader1stparag
firstheader2ndparag

firstheader3rdparag

firstheader4thparag

firstheader5thparag

firstheader6thparag


secondheader1stparag
secondheader2ndparag

secondheader3rdparag

secondheader4thparag

secondheader5thparag

secondheader6thparag


thirdheader1stparag
thirdheader2ndparag

thirdheader3rdparag

thirdheader4thparag

thirdheader5thparag

thirdheader6thparag


fourthheader1stparag
fourthheader2ndparag

fourthheader3rdparag

fourthheader4thparag

fourthheader5thparag

fourthheader6thparag


fifthheader1stparag
fifthheader2ndparag

fifthheader3rdparag

fifthheader4thparag

fifthheader5thparag

fifthheader6thparag


sideBarOpen = true

    meReference: AngularFirestoreDocument
    sub


  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
         this.meReference =   this.afstore.collection('staff').doc(`${user.uid}`)
     

        }
      })

   }

   public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  exportAsXLSX():void {

  this.sub =    this.meReference.get()
      .pipe(map(actions => {
        return {
          id: actions.id,
          ...actions.data()
        }
      })).subscribe(me => {

        
 var   data: any = 

 [
 
 
   {
      
       '1stHeader': this.firstheader1stparag,
       "2ndHeader": this.secondheader1stparag,
       "3rdHeader": this.thirdheader1stparag,
       "4thHeader": this.fourthheader1stparag,
       "5thHeader": this.fifthheader1stparag,
       
   },
   {
      
     
     '1stHeader': this.firstheader2ndparag,
     "2ndHeader": this.secondheader2ndparag,
     "3rdHeader": this.thirdheader2ndparag,
     "4thHeader": this.fourthheader2ndparag,
     "5thHeader": this.fifthheader2ndparag,
    
   },
   {
    
     '1stHeader': this.firstheader3rdparag,
     "2ndHeader": this.secondheader3rdparag,
     "3rdHeader": this.thirdheader3rdparag,
     "4thHeader": this.fourthheader3rdparag,
     "5thHeader": this.fifthheader3rdparag,
   
   },
   {
      
     '1stHeader': this.firstheader4thparag,
     "2ndHeader": this.secondheader4thparag,
     "3rdHeader": this.thirdheader4thparag,
     "4thHeader": this.fourthheader4thparag,
     "5thHeader": this.fifthheader4thparag,
   
 },
 {
      
   '1stHeader': this.firstheader5thparag,
   "2ndHeader": this.secondheader5thparag,
   "3rdHeader": this.thirdheader5thparag,
   "4thHeader": this.fourthheader5thparag,
   "5thHeader": this.fifthheader5thparag,
  
 },
 {
      
   '1stHeader': this.firstheader6thparag,
   "2ndHeader": this.secondheader6thparag,
   "3rdHeader": this.thirdheader6thparag,
   "4thHeader": this.fourthheader6thparag,
   "5thHeader": this.fifthheader6thparag,
  
 },
 
   ]

var date = new Date()
 this.exportAsExcelFile(data, `${data.name} ${data.surname} My Report Today ${date.toDateString()}`);



  this.firstheader1stparag = ''
  this.secondheader1stparag = ''
  this.thirdheader1stparag = ''
  this.fourthheader1stparag = ''
  this.fifthheader1stparag = ''


   this.firstheader2ndparag = ''
   this.secondheader2ndparag = ''
   this.thirdheader2ndparag = ''
   this.fourthheader2ndparag = ''
   this.fifthheader2ndparag = ''

    this.firstheader3rdparag = ''
    this.secondheader3rdparag = ''
    this.thirdheader3rdparag = ''
    this.fourthheader3rdparag = ''
    this.fifthheader3rdparag = ''

     this.firstheader4thparag = ''
     this.secondheader4thparag = ''
     this.thirdheader4thparag = ''
     this.fourthheader4thparag = ''
     this.fifthheader4thparag = ''


      this.firstheader5thparag = ''
      this.secondheader5thparag = ''
      this.thirdheader5thparag = ''
      this.fourthheader5thparag = ''
      this.fifthheader5thparag = ''


       this.firstheader6thparag = ''
       this.secondheader6thparag = ''
       this.thirdheader6thparag = ''
       this.fourthheader6thparag = ''
       this.fifthheader6thparag = ''
  
      })


  
  }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
