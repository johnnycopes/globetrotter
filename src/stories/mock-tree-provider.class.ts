import * as _ from 'lodash';

import { Region, Subregion } from 'src/app/country/country.service';
import { Country } from 'src/app/model/country.interface';

export type Place = Region | Subregion | Country;

export class MockTreeProvider {
  getChildItems(place: Place): Place[] {
    if (isRegion(place)) {
      return place.subregions;
    }
    else if (isSubregion(place)) {
      return place.countries;
    } else {
      return [];
    }
  }

  getItemTotal(place: Place): number {
    if (isRegion(place)) {
      return _.reduce(place.subregions, (accum, subregion) => accum + subregion.countries.length, 0);
    } else if (isSubregion(place)) {
      return place.countries.length;
    } else {
      return 1;
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
