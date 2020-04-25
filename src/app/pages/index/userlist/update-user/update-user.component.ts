import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserService} from '../service/user.service';
import {DepartmentService} from '../../../department/service/department.service';
import {CompanyService} from '../../../company/service/company.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.less']
})
export class UpdateUserComponent implements OnInit {
  @Input() userData;
  @Output() result = new EventEmitter();
  @Output() updateResult = new EventEmitter();
  loading;
  emailTrue = true;
  phoneTrue = true;
  qqTrue = true;
  listCompany;
  listDepartment;

  constructor(
    private departmentService: DepartmentService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private companyService: CompanyService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.findAllCompany();
    this.queryByCompany();
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

  emailChecking() {
    if (this.userData['information']['email'] == null || this.userData['information']['email'] == '') {
      this.emailTrue = true;
      return;
    }
    let szReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
    this.emailTrue = szReg.test(this.userData['information']['email']);
  }

  phoneChecking() {
    if (this.userData['information']['phone'] == null || this.userData['information']['phone'] == '') {
      this.phoneTrue = true;
      return;
    }
    let phoneCheck = /^1([3456789])\d{9}$/;
    this.phoneTrue = phoneCheck.test(this.userData['information']['phone']);
  }

  qqChecking() {
    if (this.userData['information']['qq'] == null || this.userData['information']['qq'] == '') {
      this.qqTrue = true;
      return;
    }
    let qqCheck = /[1-9][0-9]{4,14}$/;
    this.qqTrue = qqCheck.test(this.userData['information']['qq']);
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
    this.userData['information']['department']['id'] = null;
    if (this.userData['information']['department']['company']['id'] != null) {
      this.queryByCompany();
    }
  }

  queryByCompany() {
    this.departmentService.findAllDepartment(this.userData['information']['department']['company']['id']).then(res => {
      if (res['data']) {
        this.listDepartment = res['data'];
      } else {
        this.message.error('服务器错误');
      }
    });
  }

  update() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要保存吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.saveConfirm(),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }

  saveConfirm() {
    this.userService.updateInformation(this.userData['information']).then(res => {
      if (res['state'] == 200) {
        this.message.success('修改成功');
        setTimeout(() => {
          this.updateResult.emit(false);
        }, 300);
      } else {
        this.message.error('服务器错误');
      }
    });
  }
}
