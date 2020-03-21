import { Pipe, PipeTransform } from '@angular/core';

export enum MeasurementUnit {
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
    if (fromUnit === MeasurementUnit.kilometers && toUnit === MeasurementUnit.miles) {
      return this.convertKilometersToMiles(value);
    }
    else if (fromUnit === MeasurementUnit.squareKilometers && toUnit === MeasurementUnit.squareMiles) {
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
