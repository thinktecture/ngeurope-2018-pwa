import { ModelHelperService } from '../services/modelHelper';
import { BaseModel } from './baseModel';

export class Pokemon implements BaseModel {
  public id: number;
  public name: string;
  public weight: number;
  public baseExperience: string;
  public height: string;

  public static deserialize(obj: any): Pokemon {
    const pokemon = new Pokemon();

    // Copy over all values
    pokemon.name = obj.name;
    pokemon.weight = obj.weight;
    pokemon.baseExperience = obj.base_experience;
    pokemon.height = obj.height;

    pokemon.id = obj.id ? obj.id : ModelHelperService.extractIdFromUrl(obj.url);

    return pokemon;
  }
}
