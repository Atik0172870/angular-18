import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorService } from './operators.service';
import { Operator } from './operator.model';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  operators: Operator[] = [];
  totalCount: number = 0;
  sortBy: string = '';
  sortDirection: string = '';
  columns = [
    { field: 'companyName', label: 'Company' },
    { field: 'operLoginName', label: 'User Name' },
    { field: 'operFName', label: 'First Name' },
    { field: 'operLName', label: 'Last Name' },
    { field: 'autoAckTime', label: 'AckTimeout' },
    { field: 'lastUpdated', label: 'Last Edit' }
  ];
  search = {
    operFName: '',
    operLName: '',
    companyName: ''
  };
  selectedOperator: Operator | null = null;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private operatorService: OperatorService, private router: Router) { }

  ngOnInit(): void {
    this.fetchOperators();
  }

  fetchOperators(queryParams: any = {}): void {
    queryParams.sortBy = this.sortBy;
    queryParams.sortDirection = this.sortDirection;
    queryParams.pageNumber = this.currentPage;
    queryParams.pageSize = this.pageSize;

    this.operatorService.fetchOperators(queryParams).subscribe(response => {
      this.operators = response.operators;
      this.totalCount = response.totalCount;
    });
  }

  searchData(): void {
    this.currentPage = 1;
    const queryParams = {
      operFName: this.search.operFName,
      operLName: this.search.operLName,
      companyName: this.search.companyName
    };
    this.fetchOperators(queryParams);
  }

  clearSearch(): void {
    this.search = { operFName: '', operLName: '', companyName: '' };
    this.searchData();
  }

  showAll(): void {
    this.search = { operFName: '', operLName: '', companyName: '' };
    this.fetchOperators();
  }

  onSearch(filters: any): void {
    this.fetchOperators(filters);
  }

  onClear(): void {
    this.fetchOperators();
  }

  onShowAll(): void {
    this.fetchOperators();
  }

  onSortChange(sortData: { sortBy: string, sortDirection: string }): void {
    this.sortBy = sortData.sortBy;
    this.sortDirection = sortData.sortDirection;
    this.fetchOperators();
  }

  selectOperator(operator: Operator): void {
    this.selectedOperator = operator;
  }

  goToOperatorDetail(operatorId: string): void {
    this.router.navigate([`/operator/${operatorId}`]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchOperators();
  }
}
