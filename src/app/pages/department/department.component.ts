import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company/service/company.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {DepartmentService} from './service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less']
})
export class DepartmentComponent implements OnInit {
  listData;
  loading;
  addDepartmentVisiable = false;
  updateDepartmentVisiable = false;
  selectedDepartment;
  cId;
  listCompany = [];

  constructor(
    private departmentService: DepartmentService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.findAllDepartment();
    this.findAllCompany();
  }

  openAdd() {
    this.addDepartmentVisiable = true;
  }

  addBack() {
    this.addDepartmentVisiable = false;
    this.findAllDepartment();
  }

  findAllDepartment() {
    this.loading = true;
    this.departmentService.findAllDepartment(null).then(res => {
      if (res['data']) {
        this.listData = res['data'];
      } else {
        this.message.error('服务器错误');
      }
      this.loading = false;
    });
  }

  delete(data) {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要删除吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.deleteConfirm(data),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }

  deleteConfirm(data) {
    let id = data['id'];
    this.departmentService.deleteDepartment(id).then(res => {
      if (res['data']) {
        this.message.success('删除成功');
        this.findAllDepartment();
      } else {
        this.message.error('有关联的人员，无法删除');
      }
    });
  }

  // 显示修改页面
  update(data) {
    this.selectedDepartment = data;
    this.updateDepartmentVisiable = true;
  }

  // 修改页面返回
  updateBack(data) {
    this.updateDepartmentVisiable = false;
    if (data == 2) {
      this.findAllDepartment();
    }
  }

  selectChange(data) {
    this.selectedDepartment = data;
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

  queryByCompany() {
    this.loading = true;
    this.departmentService.findAllDepartment(this.cId).then(res => {
      if (res['data']) {
        this.listData = res['data'];
      } else {
        this.message.error('服务器错误');
      }
      this.loading = false;
    });
  }
}
