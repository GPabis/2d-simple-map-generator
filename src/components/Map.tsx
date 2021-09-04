import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/use-input';
import { NoiceGenerator } from './../helpers/noiceGenerator';



interface SquareProps {
  color: string,
}

const Square = styled.div<SquareProps>`
  aspect-ratio: 1;
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

const MapPanel = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 30px;
  flex-wrap: wrap;
  background: #a5c059;
`

const FormField = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border: #718634 1px solid;
  background: #d2e0ac;
  padding: 5px 15px;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 600;
  color: #805311;
`

const Button = styled.button`
  margin-top: 10px;
  border:#718634 1px solid;
  background: #d2e0ac;
  color: #805311;
  font-size: 16px;
  padding: 0 20px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s;

  &:hover{
    background: #718634;
    color: #291800;
  }
`


const Map: FC = () => {

  const { enteredValue: width, valueChangedHandler: widthChangedHandler} = useInput(0, 10);
  const { enteredValue: height, valueChangedHandler: heightChangedHandler} = useInput(0, 10);
  const { enteredValue: seed, valueChangedHandler: seedChangedHandler} = useInput(0, 10);
  const [noise, setNoise] = useState<number[][]>();
  const [columns, setColumns] = useState(10);

  const colors = ['#0161f1', '#1495ff','#3ab7ff', '#90e71f', '#66c717', '#5cb314', '#cddb00', '#b1751b', '#805311', '#5a2d04'];
  
  let map = noise && noise.map(row => row.map(value => {
      if(value > 1) return <Square color={'#ffffff'}></Square>
      if(value < -1) return <Square color={'#0048b4'}></Square>
      else return <Square color={colors[Math.round((value + 1) * 5)]}></Square>
  }))

  const generateTerrainHandler = (noiseWidth: number, noiseHeight: number, seed: number) => {
    setNoise(new NoiceGenerator(noiseWidth, noiseHeight, seed).generateNoise());
    setColumns(height);
  }


  return <>
    <MapPanel>
      <FormField>
        <Label>Height</Label>
        <Input type='number' onChange={widthChangedHandler} value={width}></Input>
      </FormField>
      <FormField>
        <Label>Width</Label>
        <Input type='number' onChange={heightChangedHandler} value={height}></Input>
      </FormField>
      <FormField>
        <Label>Seed</Label>
        <Input type='number' onChange={seedChangedHandler} value={seed}></Input>
      </FormField>
      <Button onClick={() => generateTerrainHandler(width, height, seed)}>Generate Terrain</Button>
    </MapPanel>
    <MapContainer columns={columns}>
      {map}
    </MapContainer>
  </>
}

export default Map;