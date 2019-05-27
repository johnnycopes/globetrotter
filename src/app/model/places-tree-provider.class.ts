import * as _ from 'lodash';

import { Place } from './place.type';
import { Region } from './region.interface';
import { Subregion } from './subregion.interface';

export class PlacesTreeProvider {
  getChildItems(place: Place): Place[] {
    if (isRegion(place)) {
      return place.subregions;
    }
    else {
      return [];
    }
  }

  getItemTotal(place: Place): number {
    if (isRegion(place)) {
      return _.reduce(place.subregions, (accum, subregion) => accum + subregion.countries.length, 0);
    }
    else if (isSubregion(place)) {
      return place.countries.length;
    }
    else {
      return null;
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
