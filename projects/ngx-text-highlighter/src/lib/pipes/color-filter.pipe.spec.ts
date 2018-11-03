import { ColorFilterPipe } from './color-filter.pipe';

describe('ColorFilterPipe', () => {
  let colorFilter: ColorFilterPipe;

  // synchronous beforeEach
  beforeEach(() => {
    colorFilter = new ColorFilterPipe();
  });

  it('create an instance', () => {
    expect(colorFilter).toBeTruthy();
  });

  it('should return all items if no args given ', () => {
    const items = [];
    items.push({text: 'Highlighted Text', color: '#000000'});
    const filtered = colorFilter.transform(items, undefined);
    expect(filtered).toEqual(items);
  });

  it('should return all items if args are empty ', () => {
    const items = [];
    items.push({text: 'Highlighted Text', color: '#000000'});
    const filtered = colorFilter.transform(items, []);
    expect(filtered).toEqual(items);
  });

  it('should return items with color value existing in args', () => {
    const items = [];
    items.push(
      {text: 'Highlighted Text in Black', color: '#000000'},
      {text: 'Highlighted Text in White', color: '#FFFFFF'},
      {text: 'Highlighted Text in Blue', color: '#0000ff'}
      );
    const args = ['#000000', '#0000ff', '#404040'];
    const filtered = colorFilter.transform(items, args);
    expect(filtered).toEqual(items.filter(item => args.includes(item.color)));
  });

});
