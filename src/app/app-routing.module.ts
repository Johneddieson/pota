import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AuthguardGuard} from './authguard.guard'
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { VerifyaddressComponent } from './verifyaddress/verifyaddress.component';
import { CartComponent } from './cart/cart.component';
import { RegisterstaffComponent } from './registerstaff/registerstaff.component';
import { StaffhomepageComponent } from './staffhomepage/staffhomepage.component';
import { StaffschedComponent } from './staffsched/staffsched.component';
import { CheckoutformComponent } from './checkoutform/checkoutform.component';
import { ApproveorderComponent } from './approveorder/approveorder.component';
import { PayordersComponent } from './payorders/payorders.component';
import { ManageinventoryComponent } from './manageinventory/manageinventory.component';
import { WordComponent } from './word/word.component';
import { ExcelComponent } from './excel/excel.component';
import { PdfComponent } from './pdf/pdf.component';
import { JpegComponent } from './jpeg/jpeg.component';
import { SalefortodayComponent } from './salefortoday/salefortoday.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { NewsComponent } from './news/news.component';
import { CreateComponent } from './create/create.component';
import { ReadmoreComponent } from './readmore/readmore.component';
import { ViewnewsComponent } from './viewnews/viewnews.component';
import { EditnewsComponent } from './editnews/editnews.component';
import { RequisitionpageComponent } from './requisitionpage/requisitionpage.component';
import { SendmessagetostaffComponent } from './sendmessagetostaff/sendmessagetostaff.component';
import { SendmessagetoadminComponent } from './sendmessagetoadmin/sendmessagetoadmin.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { HistoryComponent } from './history/history.component';
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { AttendanceComponent } from './attendance/attendance.component';

    
const routes: Routes = [
    

  {
  path: '',
  redirectTo: '',
  pathMatch: 'full',
  
  component: NewsComponent
},
{
path: 'writeaddress',
component: VerifyaddressComponent
},


{
  path: '',
  component: NewsComponent

},
{
  path: 'news/:id',
  component: ReadmoreComponent
},
{
  path: '',
  canActivate: [AuthguardGuard],
  children: [


    {
        path: 'Attendance',
        component: AttendanceComponent
    },
    {
      path: 'editHistory/:id',
      component: EditHistoryComponent
    },

    {
        path: 'history',
        component: HistoryComponent
    },
    {
      path: 'editInventory/:id',
      component: EditInventoryComponent
    },

    {
      path: 'Inventoryforadmin',
      component: InventoryComponent
    },
    {
      path: 'sendmessagetoadmin',
      component: SendmessagetoadminComponent
    },

    {
        path: 'sendmessagetostaff',
        component: SendmessagetostaffComponent
    },

    {
      path: 'requisitionpage',
      component: RequisitionpageComponent
    },

    {
        path: 'view/:id',
        component: ViewnewsComponent
    },
    {
      path: 'edit/:id',
      component: EditnewsComponent
    },
    

    {
      path: 'Create',
      component: CreateComponent
    },

    {
      path: 'Requisition',
      component: RequisitionComponent
    },
    
    {
      path: 'SalesForToday',
      component: SalefortodayComponent
    },
    {
      path: 'CreatereportfromPDF',
      component: PdfComponent
    },
    {
      path: 'CreatereportfromJPG',
      component: JpegComponent
    },

{
path: 'CreatereportfromExcel',
component: ExcelComponent
},

    {
      path: 'CreatereportfromWord',
      component: WordComponent
    },
    {
      path: 'Inventory',
      component: ManageinventoryComponent
    },

    {
      path: 'payorder/:id',
      component: PayordersComponent
    },
    {
      path: 'order/:id/:uid',
      component: ApproveorderComponent
    },
    {
        path: 'checkout',
        component: CheckoutformComponent
    },
    
    {
      path: 'staffsched',
      component: StaffschedComponent
    },
{
  path: 'staffhomepage',
  component: StaffhomepageComponent
},

    {
  path: 'registerstaff',
  component: RegisterstaffComponent
},
    {
      path: 'home',
      component: HomeComponent,
      },
      {
          path: 'cart',
          component: CartComponent
      },
{
  path: 'admin',
  component: AdminComponent,
  
},
{
path: 'product/:id',
component: ProductComponent
},
{
    path: 'posts',
    component: PostsComponent
},
{
  path: 'products',
  component: ProductsComponent
}
  ]
},

{
path: 'login',
component: LoginComponent,


},
{
path: 'signup',
component: SignupComponent
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
