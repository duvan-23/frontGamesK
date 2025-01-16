import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

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
        debounceTime(500)  // Wait for 500ms after the user stops typing to avoid making multiple service calls
      )
    .subscribe((searchTerm: string) => {
      // Emit the search term 
      this.searchName.emit(searchTerm);
    });
  }

}
