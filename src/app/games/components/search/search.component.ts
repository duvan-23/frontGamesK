import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output() searchName = new EventEmitter<String>();
  fb = inject(FormBuilder);
  searchForm!: FormGroup;

  ngOnInit(){
    // Initialize the form
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.searchForm.get('search')?.valueChanges.pipe(
        debounceTime(500)  // Wait for 500ms after the user stops typing
      )
    .subscribe((searchTerm: string) => {
      // Emit the search term instead of calling the service
      this.searchName.emit(searchTerm);
    });
  }

}
