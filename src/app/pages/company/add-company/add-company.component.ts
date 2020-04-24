import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.less']
})
export class AddCompanyComponent implements OnInit {
  @Input() isVisible = false;
  @Output() result = new EventEmitter();
  @Output() saveResult = new EventEmitter();

  isConfirmLoading = false;
  nameRequired = false;
  phoneRequired = false;
  companyData = {
    name: null,
    address: null,
    phone: null
  };

  constructor(
    private companyService: CompanyService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit() {
  }

  back() {
    this.companyData = {
      name: null,
      address: null,
      phone: null
    };
    this.result.emit(false);
  }

  saveBack() {
    this.saveResult.emit(false);
  }

  confrim() {
    if (this.companyData.name == null || this.companyData.name == '') {
      this.nameRequired = true;
    }
    if (this.companyData.phone == null || this.companyData.phone == '') {
      this.phoneRequired = true;
    }
  }

  nameChange() {
    this.nameRequired = this.companyData.name == null || this.companyData.name == '';
  }

  phoneChange() {
    this.phoneRequired = this.companyData.phone == null || this.companyData.phone == '';
  }

  saveConfirm() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要保存吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.save(),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }

  save() {
    this.confrim();
    if (!this.nameRequired && !this.phoneRequired) {
      this.isConfirmLoading = true;
      this.companyService.save(this.companyData).then(res => {
        if (res['data']) {
          this.message.success('添加成功');
          this.isConfirmLoading = false;
          setTimeout(() => {
            this.back();
          }, 200);
        } else {
          this.message.error('服务器错误');
        }
      });
    }
  }
}
