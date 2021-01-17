// Source: Wikipedia REST API https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_

interface IImage {
  source: string;
  width: number;
  height: number;
}

export interface ISummary {
  title: string;
  displayTitle: string;
  pageid: number;
  extract: string;
  extract_html: string;
  thumbnail: IImage,
  originalimage: IImage,
  lang: string;
  dir: string;
  timestamp: string;
  description: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}
