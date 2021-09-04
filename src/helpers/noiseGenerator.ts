import { Noise2D } from "open-simplex-noise/lib/2d";
import { makeNoise2D } from 'open-simplex-noise';
import { makeRectangle } from 'fractal-noise';

export class NoiseGenerator {
    width: number;
    height: number;
    noise: Noise2D;

    constructor(width: number, height: number, seed: number){
        this.width = width;
        this.height = height;
        this.noise = makeNoise2D(seed);
    }

    generateNoise = () => {
        const map: number[][] = new Array(this.height);
        const mainOutline = makeRectangle(this.width, this.height, this.noise, {frequency: 0.03,  amplitude: 1})
        const boulders = makeRectangle(this.width, this.height, this.noise, {frequency: 0.09,  amplitude: 0.5})
        const smallRocks = makeRectangle(this.width, this.height, this.noise, {frequency:0.27, amplitude: 0.25})
        for(let y = 0; y < this.height; y++){
            map[y] = new Array(this.width);
            for(let x = 0; x < this.width; x++){
                map[y].push(mainOutline[y][x] + boulders[y][x] + smallRocks[y][x]);
            }
        }
        return map;
    };
} 