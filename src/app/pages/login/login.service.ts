import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginUrl = 'http://localhost:8080/user/login';

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) {
  }

  login(username, password) {
    let data = {username, password};
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.loginUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
