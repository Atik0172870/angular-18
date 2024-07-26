import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrl: './basic-search.component.scss'
})
export class BasicSearchComponent {
  search = {
    operFName: '',
    operLName: '',
    companyName: ''
  };

  isCollapsed = false;
  selectedTimeFormat = 'As Local Time';

  @Output() searchEvent = new EventEmitter<any>();
  @Output() clearEvent = new EventEmitter<void>();
  @Output() showAllEvent = new EventEmitter<void>();
  @Output() timeFormatChangeEvent = new EventEmitter<string>();

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  searchData(): void {
    this.searchEvent.emit(this.search);
  }

  clearSearch(): void {
    this.search = { operFName: '', operLName: '', companyName: '' };
    this.clearEvent.emit();
  }

  showAll(): void {
    this.search = { operFName: '', operLName: '', companyName: '' };
    this.showAllEvent.emit();
  }

  changeTimeFormat(format: string): void {
    this.selectedTimeFormat = format;
    this.timeFormatChangeEvent.emit(this.selectedTimeFormat);
  }
}
