import {Component, OnInit} from '@angular/core';
import {EntryDataService} from '../entry-data/service/entry-data.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserService} from './service/user.service';
import {CompanyService} from '../../company/service/company.service';
import {DepartmentService} from '../../department/service/department.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less']
})
export class UserlistComponent implements OnInit {

  entryDataVisible = false;
  loading = false;
  listData = [];
  selectData;
  listCompany;
  listDepartment;
  cId;
  dId;
  updateUserVisiable = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private companyService: CompanyService,
    private departmentService: DepartmentService
  ) {
  }

  ngOnInit() {
    this.queryByCompanyAndDepartment();
    this.findAllCompany();
  }


  openEntryData() {
    this.entryDataVisible = true;
  }

  closeEntry() {
    this.entryDataVisible = false;
    this.queryByCompanyAndDepartment();
  }

  selectChange(data) {
    this.selectData = data;
  }

  delete(data) {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要删除此用户吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.deleteConfirm(data),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }

  deleteConfirm(data) {
    let id = data.id;
    this.userService.deleteUser(id).then(res => {
      if (res['data']) {
        this.message.success('删除成功');
        this.queryByCompanyAndDepartment();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  findAllCompany() {
    this.companyService.findAllCompany().then(res => {
      if (res['data']) {
        this.listCompany = res['data'];
      } else {
        this.message.error('服务器错误');
      }
    });
  }

  companyChange() {
    this.dId = null;
    if (this.cId != null) {
      this.queryByCompany();
    }
  }

  queryByCompany() {
    this.departmentService.findAllDepartment(this.cId).then(res => {
      if (res['data']) {
        this.listDepartment = res['data'];
      } else {
        this.message.error('服务器错误');
      }
    });
  }

  queryByCompanyAndDepartment() {
    this.loading = true;
    this.userService.findAll(this.cId, this.dId).then(res => {
      if (res['data']) {
        this.listData = res['data'];
      } else {
        this.message.error('服务器错误');
      }
      this.loading = false;
    });
  }

  updateBack(data) {
    this.updateUserVisiable = false;
    if (data == 2) {
      this.queryByCompanyAndDepartment();
    }
  }

  update(data) {
    this.selectData = data;
    this.updateUserVisiable = true;
  }
}
