import { Dictionary } from "lodash";

import { Place } from "../types/place.type";
import { IRegion } from "../interfaces/region.interface";
import { ISubregion } from "../interfaces/subregion.interface";
import { ITreeProvider } from "@shared/components/tree/tree.component";

export class PlacesTreeProvider implements ITreeProvider<Place> {
  private _placesById: Dictionary<Place> = {};

  constructor(place: Place) {
    // set placesKeyedById recursively
    const places = [place];
    while (places.length) {
      const currentPlace = places.shift();
      if (currentPlace) {
        const currentPlaceId = this.getId(currentPlace);
        const currentPlaceChildren = this.getChildren(currentPlace);
        this._placesById[currentPlaceId] = currentPlace;
        if (currentPlaceChildren.length) {
          currentPlaceChildren.forEach(child => {
            places.push(child);
          });
        }
      }
    }
  }

  getId(place: Place): string {
    return place.name;
  }

  getParent(place: Place): Place | undefined {
    if (isSubregion(place)) {
      return this._placesById[place.region];
    }
    return undefined;
  }

  getChildren(place: Place): Place[] {
    if (isRegion(place)) {
      return place.subregions;
    }
    return [];
  }
}

function isRegion(place: Place): place is IRegion {
  return "subregions" in place;
}

function isSubregion(place: Place): place is ISubregion {
  return "countries" in place;
}
