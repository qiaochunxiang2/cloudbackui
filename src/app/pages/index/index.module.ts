import {NgModule} from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {IndexComponent} from './index.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EntryDataComponent} from './entry-data/entry-data.component';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserlistComponent} from './userlist/userlist.component';
import {CompanyComponent} from '../company/company.component';
import {AddCompanyComponent} from '../company/add-company/add-company.component';
import {UpdateCompanyComponent} from '../company/update-company/update-company.component';
import {DepartmentComponent} from '../department/department.component';
import {AddDepartmentComponent} from '../department/add-department/add-department.component';
import {UpdateDepartmentComponent} from '../department/update-department/update-department.component';
import {UpdateUserComponent} from './userlist/update-user/update-user.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogShowComponent } from '../blog/blog-show/blog-show.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'userlist', component: UserlistComponent},
      {path: 'company', component: CompanyComponent},
      {path: 'department', component: DepartmentComponent},
      {path: 'blog', component: BlogComponent},
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    EntryDataComponent,
    WelcomeComponent,
    UserlistComponent,
    CompanyComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    UpdateUserComponent,
    BlogComponent,
    BlogShowComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  exports: [RouterModule],
  providers: []
})
export class IndexModule {
}
