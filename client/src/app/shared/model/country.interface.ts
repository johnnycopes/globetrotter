// Source: REST Countries API -- https://restcountries.eu/#api-endpoints-response-example

import { ICurrency } from './currency.interface';
import { ILanguage } from './language.interface';
import { IRegionalBloc } from './regional-bloc.interface';

export interface ICountry {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: ICurrency[];
  languages: ILanguage[];
  translations: {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
  };
  flag: string;
  regionalBlocs: IRegionalBloc[]
  cioc: string;
}
