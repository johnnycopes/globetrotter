import { DefaultItem } from './default-item.interface';

export const MOCK_DATA: DefaultItem[] = [
  {
    name: 'Africa',
    items: [
      {
        name: 'Northern Africa',
        items: [
          { name: 'Morocco' },
          { name: 'Egypt' }
        ]
      },
      {
        name: 'Eastern Africa',
        items: [
          { name: 'Rwanda' },
          { name: 'Somalia' }
        ]
      }
    ]
  },
  {
    name: 'Europe',
    items: [
      {
        name: 'Western Europe',
        items: [
          { name: 'Germany' },
          { name: 'Italy' },
          { name: 'Spain' }
        ]
      }
    ]
  }
];

export const SOME_SELECTED_DICT = {
  Africa: 'indeterminate',
  Asia: 'indeterminate',
  Egypt: 'checked',
  Germany: 'checked',
  Italy: 'checked',
  Europe: 'indeterminate',
  'Northern Africa': 'indeterminate',
  'Western Europe': 'indeterminate',
};

export const ALL_SELECTED_DICT = {
  Africa: 'checked',
  'Eastern Africa': 'checked',
  Egypt: 'checked',
  Europe: 'checked',
  Germany: 'checked',
  Italy: 'checked',
  Morocco: 'checked',
  'Northern Africa': 'checked',
  Rwanda: 'checked',
  Somalia: 'checked',
  Spain: 'checked',
  'Western Europe': 'checked'
};
