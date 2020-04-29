import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryDataService} from './service/entry-data.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CompanyService} from '../../company/service/company.service';
import {DepartmentService} from '../../department/service/department.service';

@Component({
  selector: 'app-entry-data',
  templateUrl: './entry-data.component.html',
  styleUrls: ['./entry-data.component.less']
})
export class EntryDataComponent implements OnInit {
  @Input() visible = false;
  @Output() result = new EventEmitter();
  emailTrue = true;
  phoneTrue = true;
  qqTrue = true;
  cId;
  listDepartment;
  listCompany;
  userData = {
    username: null,
    password: null,
    information: {
      name: null,
      birthday: null,
      sex: 0,
      age: 0,
      email: null,
      qq: null,
      phone: null,
      address: null,
      department: {
        id: null,
      }
    }
  };
  companyRequired = false;
  departmentRequired = false;
  usernameRequired = false;
  passwordRequired = false;

  constructor(
    private entryDataService: EntryDataService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private companyService: CompanyService,
    private departmentService: DepartmentService
  ) {
  }


  ngOnInit() {
    this.findAllCompany();
  }

  close() {
    this.result.emit(false);
    this.userData = {
      username: null,
      password: null,
      information: {
        name: null,
        birthday: null,
        sex: 0,
        age: 0,
        email: null,
        qq: null,
        phone: null,
        address: null,
        department: {
          id: null,
        }
      }
    };
    this.cId = null;
  }

  save() {
    this.confirm();
    if (!this.usernameRequired && !this.passwordRequired && !this.departmentRequired && !this.companyRequired) {
      if (this.qqTrue && this.emailTrue && this.phoneTrue) {
        this.modalService.warning({
          nzTitle: null,
          nzContent: '<b style="color:#1b86d7;">您确定要添加此用户吗？</b>',
          nzOkText: '确定',
          nzOnOk: () => this.saveConfirm(),
          nzCancelText: '取消',
          nzOnCancel: () => null
        });
      } else {
        this.message.error('信息格式错误');
      }
    } else {
      this.message.error('请完善信息');
    }


  }

  saveConfirm() {
    this.entryDataService.register(this.userData).then(res => {
      if (res['state'] == 200) {
        this.message.success('添加成功');
        setTimeout(() => {
          this.close();
        }, 300);
      } else {
        this.message.error('账号已存在');
      }
    });
  }

  confirm() {
    this.departmentRequired = this.userData.information.department.id == null || this.userData.information.department.id == '';
    this.companyRequired = this.cId == null || this.cId == '';
    this.usernameRequired = this.userData.username == null || this.userData.username == '';
    this.passwordRequired = this.userData.password == null || this.userData.password == '';
  }

  emailChecking() {
    if (this.userData.information.email == null || this.userData.information.email == '') {
      this.emailTrue = true;
      return;
    }
    let szReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
    this.emailTrue = szReg.test(this.userData.information.email);
  }

  phoneChecking() {
    if (this.userData.information.phone == null || this.userData.information.phone == '') {
      this.phoneTrue = true;
      return;
    }
    let phoneCheck = /^1([3456789])\d{9}$/;
    this.phoneTrue = phoneCheck.test(this.userData.information.phone);
  }

  qqChecking() {
    if (this.userData.information.qq == null || this.userData.information.qq == '') {
      this.qqTrue = true;
      return;
    }
    let qqCheck = /[1-9][0-9]{4,14}$/;
    this.qqTrue = qqCheck.test(this.userData.information.qq);
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
    this.companyRequired = this.cId == null || this.cId == '';
    this.userData.information.department.id = null;
    if (this.cId != null) {
      this.queryByCompany();
    }
  }

  departmentChange() {
    this.departmentRequired = this.userData.information.department.id == null || this.userData.information.department.id == '';
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

  usernameChange() {
    this.usernameRequired = this.userData.username == null || this.userData.username == '';
  }

  passwordChange() {
    this.passwordRequired = this.userData.password == null || this.userData.password == '';
  }
}
