import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MAccGrpDto {
  caObjectID?: string;
  agrpNo?: number;
  companyId?: number;
  description?: string;
  lastUpdated?: Date;
  companyName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<MAccGrpDto[]> {
    return this.http.get<MAccGrpDto[]>('/api/MAccGrp');
  }
}
