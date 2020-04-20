import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryDataService} from './service/entry-data.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-entry-data',
  templateUrl: './entry-data.component.html',
  styleUrls: ['./entry-data.component.less']
})
export class EntryDataComponent implements OnInit {
  @Input() visible = false;
  @Output() result = new EventEmitter();
  editDisable = true;
  emailTrue = true;
  phoneTrue = true;
  qqTrue = true;
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
      address: null
    }
  };

  constructor(
    private entryDataService: EntryDataService,
    private message: NzMessageService,
    private modalService: NzModalService,
  ) {
  }


  ngOnInit() {

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
        address: null
      }
    };
  }

  save() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要添加此用户吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.saveConfirm(),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });

  }

  saveConfirm(){
    if (this.userData.username != null && this.userData.password != null) {
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
    } else {
      this.message.error('请填写账号和密码');
    }
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
}
