import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gamesChanged = new Subject<Game[]>();
  playerCountChanged = new Subject<number>();

  constructor(private httpClient: HttpClient) { }

  fetchGames() {
    this.httpClient.get<{games: Game[]}>('assets/games.json')
      .subscribe(data => {
        this.gamesChanged.next([...data.games]);
      });
  }


}
