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

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
}
