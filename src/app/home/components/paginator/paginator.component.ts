import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import {PageEvent, MatPaginatorModule, MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() totalItems!: number;
  @Input() pageSize!: number;

  @Output() pageChange = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private paginatorIntl= inject( MatPaginatorIntl);

  ngOnChanges(changes: SimpleChanges){
    //Check there are changes on totalItems input and paginator exist
    if (changes["totalItems"] && this.paginator) {
      //Restart page index
      this.paginator.pageIndex = 0;
    }
  }
  ngAfterViewInit() {
    //Settings paginator
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    this.paginatorIntl.previousPageLabel = ''; 
    this.paginatorIntl.nextPageLabel = ''; 
    this.paginator._changePageSize(this.paginator.pageSize);

  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    //Custom paginator label
    const total = Math.ceil(length / pageSize);
    return `Page ${page+1} of ${total}`;
  }

  pageChanged(event: PageEvent): void {
    //Emit change page
    this.pageChange.emit(event.pageIndex + 1);
  }
}
