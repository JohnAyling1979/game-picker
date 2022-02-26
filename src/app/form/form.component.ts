import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  playerCountFilter: number = 0;

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.gameService.playerCountChanged.next(this.playerCountFilter);
  }
}
