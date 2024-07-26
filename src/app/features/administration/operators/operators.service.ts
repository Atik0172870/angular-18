import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Operator } from './operator.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  private apiOperatorsUrl: string;
  private apiOperatorInsertUpdateUrl: string;

  constructor(private http: HttpClient, @Inject('API_BASE_URL') apiBaseUrl: string) {
    this.apiOperatorsUrl = `${apiBaseUrl}/Operator/grid`;
    this.apiOperatorInsertUpdateUrl = `${apiBaseUrl}/Operator`;
  }

  fetchOperators(queryParams: any = {}): Observable<{ operators: Operator[], totalCount: number }> {
    let params = new HttpParams()
      .set('sortBy', 'CompanyName,OperLoginName')
      .set('sortDirection', 'asc')
      .set('pageNumber', '1');

    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] !== null && queryParams[key] !== '') {
        params = params.set(key, queryParams[key]);
      }
    });

    return this.http.get<{ operators: Operator[], totalCount: number }>(this.apiOperatorsUrl, { params }).pipe(
      map(response => ({
        operators: response.operators.map((item: any) => ({
          operatorId: item.operatorID,
          operLoginName: item.operLoginName,
          operFName: item.operFName,
          operLName: item.operLName,
          autoAckTime: item.autoAckTime,
          lastUpdated: new Date(item.lastUpdated),
          companyId: item.companyId,
          companyName: item.companyName,
          isPortalUser: item.isPortalUser
        })),
        totalCount: response.totalCount
      }))
    );
  }
  getOperatorByOperatorId(id: string): Observable<Operator> {
    return this.http.get<Operator>(`${this.apiOperatorInsertUpdateUrl}/${id}`);
  }
}
