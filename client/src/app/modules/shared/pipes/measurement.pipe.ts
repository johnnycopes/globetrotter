import { Pipe, PipeTransform } from '@angular/core';

export enum EMeasurementUnit {
  kilometers = 'km',
  miles = 'mi',
  squareKilometers = 'sqKm',
  squareMiles = 'sqMi'
};

@Pipe({
  name: 'measurement'
})
export class MeasurementPipe implements PipeTransform {

  transform(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === EMeasurementUnit.kilometers && toUnit === EMeasurementUnit.miles) {
      return this.convertKilometersToMiles(value);
    }
    else if (fromUnit === EMeasurementUnit.squareKilometers && toUnit === EMeasurementUnit.squareMiles) {
      return this.convertSquareKilometersToSquareMiles(value);
    }
    return value;
  }

  private convertKilometersToMiles(kilometers: number): number {
    return kilometers / 1.609;
  }

  private convertSquareKilometersToSquareMiles(kilometers: number): number {
    return kilometers / 2.59;
  }

}
