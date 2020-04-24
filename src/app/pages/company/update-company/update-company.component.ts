import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.less']
})
export class UpdateCompanyComponent implements OnInit {
  @Input() companyData;
  @Output() result = new EventEmitter();
  @Output() saveResult = new EventEmitter();
  nameRequired = false;
  phoneRequired = false;
  loading = false;

  constructor(
    private companyService: CompanyService,
    private message: NzMessageService,
    private modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    console.log(this.companyData['id']);
  }

  updateCompany() {
    this.confrim();
    this.loading = true;
    console.log(this.nameRequired + '   ' + this.phoneRequired);
    if (!this.nameRequired && !this.phoneRequired) {
      this.companyService.updateCompany(this.companyData).then(res => {
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

  update() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要修改数据吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.updateCompany(),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }
}
