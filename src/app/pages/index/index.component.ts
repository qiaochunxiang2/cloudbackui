import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  isCollapsed = false;
  // 控制目录的展开/折叠
  collapsed = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigate(['/index/welcome']);
  }

  onToggleCollapsed(evt) {
    this.collapsed = !this.collapsed;
  }
  changeUrl(url) {
    this.router.navigate([url]);
  }
}
