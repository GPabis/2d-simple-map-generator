import { FC } from 'react';
import styled from 'styled-components';
import { makeNoise2D } from "open-simplex-noise";
import { makeRectangle } from 'fractal-noise';
var Rainbow = require('rainbowvis.js');



interface SquareProps {
  numberOfSquaresInRow: number,
  color: string,
}

const Square = styled.div<SquareProps>`
  width: calc(100vw/${({ numberOfSquaresInRow }) => numberOfSquaresInRow});
  height: calc(100vw/${({ numberOfSquaresInRow }) => numberOfSquaresInRow});
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  background: ${({ color }) => color};
`;

const MapContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  color: #693f00;
`


const Map: FC = () => {


  const [width, height] = [100, 100];
  const noise2D = makeNoise2D(Date.now()); // Using current date as seed
  const noise: number[][] = makeRectangle(width, height, noise2D, { frequency: 0.024, octaves: 10, persistence: 0.2, amplitude: 2.3 });
  const numberOfColors = 100;
  const rainbow = new Rainbow();
  rainbow.setNumberRange(1, numberOfColors);
  rainbow.setSpectrum('#358610', '#693f00');
  const colors: string[] = [];

  for (let i = 0; i < numberOfColors; i++) {
    colors.push(`#${rainbow.colourAt(i)}`)
  }

  console.log(colors);

  const map = noise.map(row => row.map(square => {
    const index = Math.round((square) * 100);
    const color = (square > 0) ? colors[index] : '#035fb6';
    return <Square numberOfSquaresInRow={width} color={color}></Square>
  }))


  return <MapContainer columns={width}>
    {map}
  </MapContainer>
}

export default Map;