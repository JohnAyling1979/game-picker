import { Pipe, PipeTransform } from '@angular/core';
import { Game } from './game.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(games: Game[], playerCount: number): Game[] {
    console.log(playerCount)
    if (playerCount === 0 || playerCount === null) {
      return games;
    }

    return games.filter(game => game.min <= playerCount && game.max >= playerCount)
  }
}
