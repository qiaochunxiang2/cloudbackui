import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private loginService: LoginService,
              private message: NzMessageService) {
  }

  username;
  password;

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.username, this.password).then(res => {
      if (res['data'] !== false) {
        this.message.success('登录成功 ');
        setTimeout(() => {
          this.router.navigate(['/index']);
        }, 200);
      } else {
        this.message.error('账号或者密码错误');
      }
    });
  }
}
