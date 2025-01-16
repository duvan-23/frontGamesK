import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { IGame, IPropertiesGame } from '../models/game';
import { environment } from '@enviroment';
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  http= inject(HttpClient);
  apiUrl = environment.API_URL;
  games= signal<IPropertiesGame[]>([]);
  gamesFilterPage= signal<IPropertiesGame[]>([]);
  pageSize = 8; 
  pageNumber = signal(1);
  pageTotal = signal(0);
  
  //Get games
  getGames(){
    return this.http.get<IGame>(`${this.apiUrl}games`);
  }
  //Set games
  setGames(games: IPropertiesGame[]){
    this.games.set(games);
  }

  //Get games depending on page number
  filterDataByPage(pageNumber: number){
    this.pageNumber.set(pageNumber);
    let num = this.games().length;
    let data= [];
    if (num > 0) {
      for (let index = 0; index < num; index++) {
        if(index < (pageNumber*this.pageSize) && ((index>=((pageNumber*this.pageSize)-this.pageSize))|| ((pageNumber*this.pageSize)-this.pageSize)<1)){
          data.push(this.games()[index]);
        }
      }
    }
    this.gamesFilterPage.set(data);
  }

  //Get games with filter
  filterDataByName(name:string){
    this.http.get<IGame>(`${this.apiUrl}games/${name}`).subscribe((data) => {
      this.games.set(data.games);
      this.filterDataByPage(1);
      const total = this.games().length>0?Math.ceil(this.games().length / this.pageSize):0;
      this.pageTotal.set(total);
    });
  }
}
