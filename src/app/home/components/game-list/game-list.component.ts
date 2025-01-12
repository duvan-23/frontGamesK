import { Component, inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { GamesService } from 'app/home/services/games.service';
import { GameComponent } from '../game/game.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameComponent, PaginatorComponent, SearchComponent],
  templateUrl: './game-list.component.html'
})
export class GameListComponent {
 

  authService = inject(AuthService);
  gamesService = inject(GamesService);

  pageNumber = this.gamesService.pageNumber;
  pageTotal = this.gamesService.pageTotal;
  pageSize =  this.gamesService.pageSize; 
  games=this.gamesService.games;
  gamesFilterPage=this.gamesService.gamesFilterPage;
  ngOnInit(): void {
    this.authService.login().subscribe(
      () => {
        this.getGames();
      }
    );
  }
  getGames(){
    this.gamesService.getGames().subscribe({
      next:(data) => {
        this.gamesService.games.set(data);
        this.gamesService.filterDataByPage(this.pageNumber());
        this.gamesService.pageTotal.set(Math.ceil(this.games().length / this.pageSize));
      },
      error:(e)=>{
        console.log(e);
      }
    });
  }

  onPageChange(pageNumber: number): void {
    this.filterData(pageNumber);
  }

  filterData(pageNumber: number){
    this.gamesService.filterDataByPage(pageNumber);
    this.pageNumber.set(this.gamesService.pageNumber());
  }

  searchName(title:any){
    if(title != ""){
      this.gamesService.filterDataByName(title);
    }else{
      this.getGames();
    }
  }
}
