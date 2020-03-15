import * as _ from 'lodash';

import { TPlace } from './place.type';
import { IRegion } from './region.interface';
import { ISubregion } from './subregion.interface';

export class PlacesTreeProvider {
  getItemDisplayName(place: TPlace): string {
    return place.name;
  }

  getItemID(place: TPlace): string {
    return place.name;
  }

  getChildItems(place: TPlace): TPlace[] {
    if (isRegion(place)) {
      return place.subregions;
    }
    else {
      return [];
    }
  }

  getItemTotal(place: TPlace): number {
    if (isRegion(place)) {
      return _.reduce(place.subregions, (accum, subregion) => accum + subregion.countries.length, 0);
    }
    else if (isSubregion(place)) {
      return place.countries.length;
    }
    else {
      return 0;
    }
  }

  getItemIcon(place: TPlace): string {
    return place.name;
  }
}

function isRegion(place: TPlace): place is IRegion {
  return 'subregions' in place;
}

function isSubregion(place: TPlace): place is ISubregion {
  return 'countries' in place;
}
