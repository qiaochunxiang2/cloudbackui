import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from '../../company/service/company.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {DepartmentService} from '../service/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.less']
})
export class AddDepartmentComponent implements OnInit {

  departmentData = {
    name: null,
    cId: null
  };
  listCompany = [];
  @Input() isVisible = false;
  @Output() result = new EventEmitter();
  isConfirmLoading = false;
  nameRequired = false;
  companyRequired = false;
  constructor(
    private departmentService: DepartmentService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private companyService: CompanyService,
  ) {
  }

  ngOnInit() {
    this.findAllCompany();
  }

  back() {
    this.departmentData = {
      name: null,
      cId: null
    };
    this.result.emit(false);
  }

  confrim() {
    if (this.departmentData.name == null || this.departmentData.name == '') {
      this.nameRequired = true;
    }
    if (this.departmentData.cId == null || this.departmentData.cId == '') {
      this.companyRequired = true;
    }
  }

  nameChange() {
    this.nameRequired = this.departmentData.name == null || this.departmentData.name == '';
  }

  cIdChange() {
    this.companyRequired = this.departmentData.cId == null || this.departmentData.cId == '';
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
    if (!this.nameRequired && !this.companyRequired) {
      this.isConfirmLoading = true;
      this.departmentService.save(this.departmentData).then(res => {
        if (res['data']) {
          this.message.success('添加成功');
          this.isConfirmLoading = false;
          setTimeout(() => {
            this.back();
          }, 300);
        } else {
          this.message.error('服务器错误');
        }
      });
    }
  }

  findAllCompany(){
    this.companyService.findAllCompany().then(res=>{
      if (res['data']){
        this.listCompany = res['data'];
      } else{
        this.message.error('服务器错误');
      }
    })
  }
}
