import * as _ from 'lodash';

import { Place } from './place.type';

export class PlacesRenderer {
  getImagePath(place: Place): string {
    return `assets/icons/${place.name}.svg`;
  }
}
