import { Component, inject } from '@angular/core';
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
 
  gamesService = inject(GamesService);

  pageNumber = this.gamesService.pageNumber;
  pageTotal = this.gamesService.pageTotal;
  pageSize =  this.gamesService.pageSize; 
  games=this.gamesService.games;
  gamesFilterPage=this.gamesService.gamesFilterPage;

  ngOnInit(): void {
    this.getGames();
  }

  //get All games
  getGames(){
    this.gamesService.getGames().subscribe({
      next:(data) => {
        //Set Games
        this.gamesService.games.set(data.games);
        //Set page
        this.gamesService.filterDataByPage(this.pageNumber());
        //Set total games
        this.gamesService.pageTotal.set(Math.ceil(this.games().length / this.pageSize));
      },
      error:(e)=>{
        console.log(e);
      }
    });
  }
  //Page change in grid
  onPageChange(pageNumber: number): void {
    this.filterData(pageNumber);
  }
  //Set new page games
  filterData(pageNumber: number){
    this.gamesService.filterDataByPage(pageNumber);
    this.pageNumber.set(this.gamesService.pageNumber());
  }

  //Get games filtered by title
  searchName(title:any){
    if(title != ""){
      this.gamesService.filterDataByName(title);
    }else{
      this.getGames();
    }
  }
}
