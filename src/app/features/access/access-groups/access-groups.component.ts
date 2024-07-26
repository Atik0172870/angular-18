import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DataService, MAccGrpDto } from './data.service';

@Component({
  selector: 'app-access-groups',
  templateUrl: './access-groups.component.html',
  styleUrl: './access-groups.component.scss'
})
export class AccessGroupsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['companyName', 'agrpNo', 'description', 'lastUpdated'];
  dataSource = new MatTableDataSource<MAccGrpDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
