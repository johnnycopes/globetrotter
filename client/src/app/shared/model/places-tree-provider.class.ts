import { TPlace } from "./place.type";
import { IRegion } from "./region.interface";
import { ISubregion } from "./subregion.interface";
import { ITreeProvider } from "../components/tree/tree.component";

export class PlacesTreeProvider implements ITreeProvider<TPlace> {
  private placesKeyedById: _.Dictionary<TPlace> = {};

  constructor(place: TPlace) {
    // set placesKeyedById recursively
    const places = [place];
    while (places.length) {
      const currentPlace = places.shift();
      if (currentPlace) {
        const currentPlaceId = this.getId(currentPlace);
        const currentPlaceChildren = this.getChildren(currentPlace);
        this.placesKeyedById[currentPlaceId] = currentPlace;
        if (currentPlaceChildren.length) {
          currentPlaceChildren.forEach(child => {
            places.push(child);
          });
        }
      }
    }
  }

  getId(place: TPlace): string {
    return place.name;
  }

  getParent(place: TPlace): TPlace | undefined {
    if (isSubregion(place)) {
      return this.placesKeyedById[place.region];
    }
    return undefined;
  }

  getChildren(place: TPlace): TPlace[] {
    if (isRegion(place)) {
      return place.subregions;
    }
    return [];
  }
}

function isRegion(place: TPlace): place is IRegion {
  return 'subregions' in place;
}

function isSubregion(place: TPlace): place is ISubregion {
  return 'countries' in place;
}
