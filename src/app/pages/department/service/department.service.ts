import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  public findAllUrl = 'http://localhost:8080/department/allDepartment';
  public saveDepartmentUrl = 'http://localhost:8080/department/addDepartment';
  public deleteDepartmentUrl = 'http://localhost:8080/department/deleteDepartment';
  public updateDepartmentUrl = 'http://localhost:8080/department/updateDepartment';

  constructor(
    private http: HttpClient,
  ) {
  }

  findAllDepartment(data) {
    let allUrl = this.findAllUrl;
    if (data != null) {
      allUrl = allUrl + '?id=' + data;
    }
    return new Promise((resolve, reject) => {
      this.http.get(allUrl).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  save(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.saveDepartmentUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateDepartment(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.updateDepartmentUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  deleteDepartment(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.deleteDepartmentUrl + '?id=' + id).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
