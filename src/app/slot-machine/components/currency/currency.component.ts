import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
      selectedOption: ['',Validators.required], // set validator required
    });
    //Get currency list
    this.currencyService.getCurrency().subscribe((res) => {
      //Change format to {label, value} to display 
      this.currencyTypes = Object.entries(res.data).map(([key, value]) => ({
        label:key,
        value,
      })); 
    });
    //Get current coins
    this.coins = this.slotService.getCoins();
  }

  onClose(): void {
    this.dialogRef.close();  // Close the dialog
  }

  currencyChange(){
    let {selectedOption} = this.form.value;
    this.currencyValue = selectedOption;
    //Calculate currency exchange
    this.calculate = +(selectedOption * this.coins).toFixed(6);//Format response to 6 decimals
  }
}
