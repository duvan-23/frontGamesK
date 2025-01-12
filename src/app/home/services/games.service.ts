import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Game } from '../models/game';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  http= inject(HttpClient);
  apiUrl = environment.API_URL;
  games= signal<Game[]>([]);
  gamesFilterPage= signal<Game[]>([]);
  pageSize = 8; 
  pageNumber = signal(1);
  pageTotal = signal(0);

  getGames(){
    return this.http.get<Game[]>(`${this.apiUrl}games`);
  }

  setGames(games: Game[]){
    this.games.set(games);
  }

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

  filterDataByName(name:string){
    this.http.get<Game[]>(`${this.apiUrl}games/${name}`).subscribe((data) => {
      this.games.set(data);
      this.filterDataByPage(1);
      const total = this.games().length>0?Math.ceil(this.games().length / this.pageSize):0;
      this.pageTotal.set(total);
    });
  }
}
