import type I_PokemonItem from './I_PokemonItem';

export default interface I_PokemonData {
  name: string;
  results: I_PokemonItem[];
  location_area_encounters: string;
}
