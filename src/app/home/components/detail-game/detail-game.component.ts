import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-detail-game',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule],
  templateUrl: './detail-game.component.html'
})
export class DetailGameComponent {
  data = inject(MAT_DIALOG_DATA);  
  dialogRef = inject(MatDialogRef<DetailGameComponent>); 

  onClose(): void {
    this.dialogRef.close();  // Close the dialog when needed
  }
}
