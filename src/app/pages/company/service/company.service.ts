import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  public findAllUrl = 'http://localhost:8080/company/findAll';
  public saveCompanyUrl = 'http://localhost:8080/company/addCompany';
  public deleteCompanyUrl = 'http://localhost:8080/company/deleteCompany';
  public updateCompanyUrl = 'http://localhost:8080/company/updateCompany';

  constructor(
    private http: HttpClient,
  ) {
  }

  findAllCompany() {
    return new Promise((resolve, reject) => {
      this.http.get(this.findAllUrl).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  save(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.saveCompanyUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateCompany(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.updateCompanyUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  deleteCompany(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.deleteCompanyUrl + '?id=' + id).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
