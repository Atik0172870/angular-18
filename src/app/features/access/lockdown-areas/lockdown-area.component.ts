import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LockdownAreaDataService, MLockdownAreaDto } from './lockdown-area-data.service';

@Component({
  selector: 'app-lockdown-area',
  templateUrl: './lockdown-area.component.html',
  styleUrl: './lockdown-area.component.scss'
})
export class LockdownAreaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['companyName', 'areaNo', 'areaName', 'lastUpdated'];
  dataSource = new MatTableDataSource<MLockdownAreaDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private lockdownAreaDataService: LockdownAreaDataService) { }

  ngOnInit() {
    this.lockdownAreaDataService.getLockDownAreas().subscribe(lockDownAreas => {
      this.dataSource.data = lockDownAreas;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
