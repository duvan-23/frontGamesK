import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '@enviroment';
import { ICalculateResult, IResponse, ISlotMachine } from '../models/slot-machine';
import { setCookie, getCookie } from 'typescript-cookie';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotMachineService {

  apiUrl = environment.API_URL;
  http= inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  //Get initial parameters
  getParametersGame(){
    return this.http.get<ISlotMachine>(`${this.apiUrl}slot-machine`).pipe(
      tap((data) => {
        if(data.parameters.coins){
          //Check if it have previous coins
          if (this.getCoins() === 0 ) {
            this.saveCoins(data.parameters.coins);
          }
        }
      })
    );
  }

  //Put calculate spin result
  setResult(data:ICalculateResult){
    return this.http.put<IResponse>(`${this.apiUrl}slot-machine`,{
      ...data
    }).pipe(
      tap((data) => {
        if(data){
          //Save coins
          this.saveCoins(data.parameters.coins);
        }
      })
    );
  }

  saveCoins(coins:number){
    if (isPlatformBrowser(this.platformId)) {
      //Set coins cookie
      setCookie('coins', coins, { expires: 1, path: '/', sameSite: 'Strict' });
    }
    
  }

  getCoins():number{
    if (isPlatformBrowser(this.platformId)) {
      //Get coins cookie
      return +(getCookie('coins')|| 0);
    }
    return 0;
  }
}
