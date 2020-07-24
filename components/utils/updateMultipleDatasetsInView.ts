import updateSingleDatasetInView from './updateSingleDatasetInView';
import { PlainObject } from '../types';
import { View } from 'vega';

export default function updateMultipleDatasetsInView(view: View, data: PlainObject) {
  Object.keys(data).forEach(name => {
    updateSingleDatasetInView(view, name, data[name]);
  });
}
