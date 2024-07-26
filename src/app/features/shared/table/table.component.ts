import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: { field: string, label: string }[] = [];
  @Input() dataSource: any[] = [];
  @Input() sortBy: string = '';
  @Input() sortDirection: string = '';
  @Output() sortChange = new EventEmitter<{ sortBy: string, sortDirection: string }>();

  ngOnInit(): void { }

  sortTable(field: string): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.sortChange.emit({ sortBy: this.sortBy, sortDirection: this.sortDirection });
  }
}
