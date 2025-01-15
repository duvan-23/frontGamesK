import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';  
import { CurrencyService } from 'app/slot-machine/services/currency.service';
import { SlotMachineService } from 'app/slot-machine/services/slot-machine.service';
import {MatDividerModule} from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule, ReactiveFormsModule, MatSelectModule ],
  templateUrl: './currency.component.html'
})
export class CurrencyComponent {
  data = inject(MAT_DIALOG_DATA);  
  dialogRef = inject(MatDialogRef<CurrencyComponent>); 
  currencyService = inject(CurrencyService);
  slotService = inject(SlotMachineService);
  coins:number = 0;
  form!: FormGroup;
  calculate:number = 0;
  currencyValue:number = 0;
  currencyTypes:{label: string, value: number}[]=[];
  filterText: string = '';
  fb = inject(FormBuilder);
  
  ngOnInit(){
    this.form = this.fb.group({
      selectedOption: ['',Validators.required], // Default value can be set here
    });
    this.currencyService.getCurrency().subscribe((res) => {
      this.currencyTypes = Object.entries(res.data).map(([key, value]) => ({
        label:key,
        value,
      })); 
    });
    this.coins = this.slotService.getCoins();
  }

  onClose(): void {
    this.dialogRef.close();  // Close the dialog when needed
  }

  currencyChange(){
    let {selectedOption} = this.form.value;
    this.currencyValue = selectedOption;
    this.calculate = selectedOption * this.coins;
  }
}
