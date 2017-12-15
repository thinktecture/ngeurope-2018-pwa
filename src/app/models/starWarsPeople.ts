import { ModelHelperService } from '../services/modelHelper';
import { BaseModel } from './baseModel';

export class StarWarsPeople implements BaseModel {
  public id: number;
  public name: string;
  public height: string;
  public mass: string;
  public hair_color: string;
  public skin_color: string;
  public eye_color: string;
  public birth_year: string;
  public gender: string;
  public homeworld: string;

  public static deserialize(obj: any): StarWarsPeople {
    const people = new StarWarsPeople();

    // Copy over all values
    Object.assign(people, obj);
    people.id = ModelHelperService.extractIdFromUrl(obj.url);

    return people;
  }
}
