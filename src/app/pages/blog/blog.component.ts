import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BlogService} from './service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {
  blogData = [];
  selectedBlog;
  blogShowVisible = false;
  loading;

  constructor(
    private blogService: BlogService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.getAllBlog();
  }

  getAllBlog() {
    this.blogService.getAll().then(res => {
      if (res['data']) {
        this.blogData = res['data'];
      } else {
        this.message.error('服务器错误');
      }
    });
  }

  changeSelectedBlog(data) {
    this.selectedBlog = data;
  }

  showBlog(data) {
    this.selectedBlog = data;
    this.blogShowVisible = true;
  }

  back() {
    this.blogShowVisible = false;
  }

  delete(blog) {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要删除此博客吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.deleteBlog(blog),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteBlog(blog) {
    this.blogService.deleteBlog(blog['id']).then(res => {
      if (res['data']) {
        this.message.success('删除成功');
        this.getAllBlog();
      } else {
        this.message.error('服务器错误');
      }
    });
  }
}
