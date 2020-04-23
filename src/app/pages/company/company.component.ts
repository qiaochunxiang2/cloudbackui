import {Component, OnInit} from '@angular/core';
import {CompanyService} from './service/company.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {
  listData;
  loading;
  addCompanyViable = false;
  updateCompanyVisiable = false;
  selectedCompany;

  constructor(
    private companyService: CompanyService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit() {
    this.findAllCompany();
  }

  openAdd() {
    this.addCompanyViable = true;
  }

  addBack() {
    this.addCompanyViable = false;
  }

  findAllCompany() {
    this.loading = true;
    this.companyService.findAllCompany().then(res => {
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
    this.companyService.deleteCompany(id).then(res => {
      if (res['data']) {
        this.message.success('删除成功');
        this.findAllCompany();
      } else {
        this.message.error('服务器错误');
      }
    });
  }

  update(data) {
    this.selectedCompany = data;
    this.updateCompanyVisiable = true;
  }

  updateBack(data) {
    this.updateCompanyVisiable = false;
    if (data == 2) {
      this.findAllCompany();
    }
  }

  selectChange(data) {
    this.selectedCompany = data;
  }
}
