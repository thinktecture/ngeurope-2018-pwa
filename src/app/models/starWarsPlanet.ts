import { ModelHelperService } from '../services/modelHelper';
import { BaseModel } from './baseModel';

export class StarWarsPlanet implements BaseModel {
  public id: number;
  public name: string;
  public rotation_period: string;
  public orbital_period: string;
  public diameter: string;
  public climate: string;
  public gravity: string;
  public terrain: string;
  public surface_water: string;
  public population: string;

  public static deserialize(obj: any): StarWarsPlanet {
    const planet = new StarWarsPlanet();

    // Copy over all values
    Object.assign(planet, obj);
    planet.id = ModelHelperService.extractIdFromUrl(obj.url);

    return planet;
  }
}
