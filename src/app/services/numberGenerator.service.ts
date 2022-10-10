import { forwardRef, Injectable } from "@angular/core";
import { GameModule } from "../game/game.module";

@Injectable()
export default class NumberGeneratorService {
  constructor () {
    console.log('load game service')
  }

  generate(size: number, min: number = 1, max: number = 49): number[] {
    const numberSet = new Set<number>();
    while(numberSet.size < 6) {
      numberSet.add(Math.floor(Math.random() * (max - min - 1) + min));
    }
    return [...numberSet];
  }
}