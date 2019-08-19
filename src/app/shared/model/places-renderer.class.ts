import * as _ from 'lodash';

import { Place } from './place.type';

export class PlacesRenderer {
  getIconName(place: Place): string {
    return place.name;
  }
}
