import { Component, OnInit } from '@angular/core';
import {EntryDataService} from '../entry-data/service/entry-data.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserService} from './service/user.service';

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
  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    this.findAll();
  }


  openEntryData() {
    this.entryDataVisible = true;
  }

  closeEntry() {
    this.entryDataVisible = false;
  }

  findAll(){
    this.loading = true;
    this.userService.findAll().then(res=>{
      if (res['data']){
        this.listData = res['data'];
      } else{
        this.message.error('服务器错误');
      }
      this.loading = false;
    })
  }

  selectChange(data){
    this.selectData = data;
  }

  delete(data){
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要删除此用户吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.deleteConfirm(data),
      nzCancelText: '取消',
      nzOnCancel: () => null
    });
  }

  deleteConfirm(data){
    let id = data.id;
    this.userService.deleteUser(id).then(res=>{
      if (res['data']){
        this.message.success('删除成功');
        this.findAll();
      }else{
        this.message.error('删除失败');
      }
    })
  }
}
