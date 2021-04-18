import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component'
import { AdminComponent } from 'src/app/admin/admin.component';
import { RouterModule } from '@angular/router'
import {PostsComponent} from 'src/app/modules/posts/posts.component'
import {FooterComponent} from 'src/app/shared/components/footer/footer.component'
import {HeaderComponent} from 'src/app/shared/components/header/header.component'
import {SidebarComponent} from 'src/app/shared/components/sidebar/sidebar.component'
import { MatSidenavModule} from '@angular/material/sidenav'
import {MatDividerModule} from '@angular/material/divider'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list'
import {AreaComponent} from 'src/app/shared/widgets/area/area.component'
import {MatCardModule} from '@angular/material/card'
import {HighchartsChartModule} from 'highcharts-angular'
import { CardComponent } from 'src/app/shared/widgets/card/card.component';
import { PieComponent } from 'src/app/shared/widgets/pie/pie.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductComponent } from 'src/app/product/product.component';
import { HomeComponent } from 'src/app/home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';

import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { AlertModule } from 'ngx-alerts';
import { VerifyaddressComponent } from 'src/app/verifyaddress/verifyaddress.component';
import {MenusComponent} from 'src/app/menus/menus.component'
import {CustomerheaderComponent} from 'src/app/customerheader/customerheader.component'
import { NavComponent } from 'src/app/nav/nav.component'
import { CartComponent } from 'src/app/cart/cart.component'

import { RegisterstaffComponent } from 'src/app/registerstaff/registerstaff.component';

import { StaffhomepageComponent } from 'src/app/staffhomepage/staffhomepage.component';

import { StaffschedComponent } from 'src/app/staffsched/staffsched.component'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'
import {MatBadgeModule} from '@angular/material/badge';

import { StaffsidebarComponent } from 'src/app/shared/components/staffsidebar/staffsidebar.component';

import { ApproveorderComponent } from 'src/app/approveorder/approveorder.component';
import { PayordersComponent } from 'src/app/payorders/payorders.component';
import {MatTableModule} from '@angular/material/table';


import { CheckoutformComponent } from 'src/app/checkoutform/checkoutform.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import {MatGridListModule} from '@angular/material/grid-list';
import { FilterComponent } from 'src/app/filter/filter.component';

import { ManageinventoryComponent } from 'src/app/manageinventory/manageinventory.component';

import { DecreasedialogComponent } from 'src/app/decreasedialog/decreasedialog.component';

import { WordComponent } from 'src/app/word/word.component';



import { ExcelComponent } from 'src/app/excel/excel.component';

import { PdfComponent } from 'src/app/pdf/pdf.component';

import { JpegComponent } from 'src/app/jpeg/jpeg.component';
import {ExportAsModule} from 'ngx-export-as'

import { SalefortodayComponent } from 'src/app/salefortoday/salefortoday.component';

import { ErrorpageComponent } from 'src/app/errorpage/errorpage.component';

import { RequisitionComponent } from 'src/app/requisition/requisition.component';

import { NoshcedComponent } from 'src/app/noshced/noshced.component';


import { NewsComponent } from 'src/app/news/news.component';

import { NonewsComponent } from 'src/app/nonews/nonews.component';

import { CreateComponent } from 'src/app/create/create.component';

import { ReadmoreComponent } from 'src/app/readmore/readmore.component';

import { ViewnewsComponent } from 'src/app/viewnews/viewnews.component';

import { EditnewsComponent } from 'src/app/editnews/editnews.component';

import { RequisitionpageComponent } from 'src/app/requisitionpage/requisitionpage.component';

import { SendmessagetostaffComponent } from 'src/app/sendmessagetostaff/sendmessagetostaff.component';

import { DialogmessageComponent } from 'src/app/dialogmessage/dialogmessage.component';

import { SendmessagetoadminComponent } from 'src/app/sendmessagetoadmin/sendmessagetoadmin.component';

import { InventoryComponent } from 'src/app/inventory/inventory.component';

import { EditInventoryComponent } from 'src/app/edit-inventory/edit-inventory.component';

import { HistoryComponent } from 'src/app/history/history.component';

import { EditHistoryComponent } from 'src/app/edit-history/edit-history.component';

import { AttendanceComponent } from 'src/app/attendance/attendance.component';
@NgModule({
  declarations: [
    
    WordComponent,
    
    AttendanceComponent,
    
    
    EditHistoryComponent,
    HistoryComponent,
    
    EditInventoryComponent,
    
    InventoryComponent,
    SendmessagetoadminComponent,
    DialogmessageComponent,
    
    SendmessagetostaffComponent,
    RequisitionpageComponent,
    
    EditnewsComponent,
    
    ViewnewsComponent,
    ReadmoreComponent,
    
    CreateComponent,
    
    NonewsComponent,
    
    NewsComponent,
    NoshcedComponent,
    
    RequisitionComponent,
    
    ErrorpageComponent,
    
    SalefortodayComponent,
    
    PdfComponent,
    
    JpegComponent,
    
    ExcelComponent,
    ApproveorderComponent,
    
    ManageinventoryComponent,
    
    FilterComponent,
    PayordersComponent,
    AdminComponent,
    RegisterstaffComponent,
      
    CheckoutformComponent,
    StaffsidebarComponent,
    
    StaffschedComponent,
    
    StaffhomepageComponent,

  
  DefaultComponent,
PostsComponent,
CardComponent,

HomeComponent,
AreaComponent,
SidebarComponent,
PieComponent,
HeaderComponent,
FooterComponent,
MenusComponent,
CustomerheaderComponent,

CartComponent,
  
NavComponent,
ProductsComponent,
ProductComponent,
DialogExampleComponent,

DecreasedialogComponent,
VerifyaddressComponent,

   
LoginComponent,
SignupComponent,

],
entryComponents: [DialogExampleComponent, 
DecreasedialogComponent,
DialogmessageComponent
],
  imports: [

    ExportAsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2TelInputModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatTableModule,
    
    AlertModule.forRoot({maxMessages: 20, timeout:5000, positionX: 'right', positionY: 'top'}),
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
MatListModule,
MatGridListModule,
MatInputModule,
MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    HighchartsChartModule,
  ]
})
export class DefaultModule { }
