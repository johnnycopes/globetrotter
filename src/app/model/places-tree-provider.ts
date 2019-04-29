import { Region, Subregion } from "../country/country.service";
import { Country } from "./country.interface";

export type Place = Region | Subregion | Country;

export class PlacesTreeProvider {
  getChildItems(place: Place): Place[] {
    if (isRegion(place)) {
      return place.subregions;
    } else {
      return [];
    }
  }

  getItemDisplayName(place: Place): string {
    return place.name;
  }

  getItemID(place: Place): string {
    return place.name;
  }
}

function isRegion(place: Place): place is Region {
  return 'subregions' in place;
}
function isSubregion(place: Place): place is Subregion {
  return 'countries' in place;
}


