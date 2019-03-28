import Base from '../src/routes/home/Base';
import { shallow } from 'preact-render-spy';

describe('Initial Test of the Base Home Page', () => {
  test('Should have 2 titles, for big screen and small one', () => {
    const context = shallow(<Base />);
    const title = context.find('h3');
    expect(title.length).toBe(2);
    expect(title.at(0).text()).toBe('📷');
    expect(title.at(1).text()).toBe('📷');
  });
});
