import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MLockdownAreaDto {
  areaNo: number;
  areaName: string;
  active: boolean;
  companyId?: number;
  caObjectID?: string;
  description?: string;
  lastUpdated?: Date;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LockdownAreaDataService {

  constructor(private http: HttpClient) { }

  getLockDownAreas(): Observable<MLockdownAreaDto[]> {
    return this.http.get<MLockdownAreaDto[]>('/api/MLockdownAreas');
  }
}
