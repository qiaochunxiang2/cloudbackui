import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from '../../company/service/company.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {DepartmentService} from '../service/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.less']
})
export class UpdateDepartmentComponent implements OnInit {
  @Input() departmentData;
  @Output() result = new EventEmitter();
  @Output() saveResult = new EventEmitter();
  updateDepartmentData = {
    id: null,
    name: null,
    cId: null
  };
  nameRequired = false;
  companyRequired = false;
  loading = false;
  listCompany = [];

  constructor(
    private departmentService: DepartmentService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private companyService: CompanyService,
  ) {
  }

  ngOnInit() {
    this.updateInit();
    this.findAllCompany();
  }

  updateInit() {
    this.updateDepartmentData.id = this.departmentData.id;
    this.updateDepartmentData.name = this.departmentData.name;
    this.updateDepartmentData.cId = this.departmentData.company.id;
  }

  updateDepartment() {
    this.confirm();
    this.loading = true;
    if (!this.nameRequired && !this.companyRequired) {
      this.departmentService.updateDepartment(this.updateDepartmentData).then(res => {
        if (res['data']) {
          this.message.success('修改成功');
          this.loading = false;
          setTimeout(() => {
            this.saveResult.emit(false);
          }, 300);
        }
      });
    }
  }

  back() {
    this.result.emit(false);
  }

  cancel() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">还有数据没保存，您确定要取消吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.back(),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }

  confirm() {
    if (this.updateDepartmentData.name == null || this.updateDepartmentData.name == '') {
      this.nameRequired = true;
    }
    if (this.updateDepartmentData.cId == null || this.updateDepartmentData.cId == '') {
      this.companyRequired = true;
    }
  }

  nameChange() {
    this.nameRequired = this.departmentData.name == null || this.departmentData.name == '';
  }

  companyChange() {
    this.companyRequired = this.updateDepartmentData.cId == null || this.updateDepartmentData.cId == '';
  }

  update() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要修改数据吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.updateDepartment(),
      nzCancelText: '取消',
      nzOnCancel: () => null
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
}
