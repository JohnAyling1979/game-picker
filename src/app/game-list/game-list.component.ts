import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {
  private gameSubscription: Subscription;
  private filterSubscription: Subscription;
  games: Game[] = [];
  playerFilter: number = 0;
  randomGame: Game | null;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gameSubscription = this.gamesService.gamesChanged.subscribe(games => {
      this.games = games;
    });
    this.filterSubscription = this.gamesService.playerCountChanged.subscribe(players => {
      this.playerFilter = players;
    })
    this.gamesService.fetchGames();
  }

  getFilterGames() {
    if (this.playerFilter === 0 || this.playerFilter === null) {
      return this.games;
    }

    return this.games.filter(game => game.min <= this.playerFilter && game.max >= this.playerFilter)
  }

  getRandomGame() {
    const games = this.getFilterGames();

    if (games.length === 0) {
      this.randomGame = null;
    }

    const index = Math.floor(Math.random() * games.length)

    this.randomGame = games[index];
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
}
