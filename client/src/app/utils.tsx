import _ from 'lodash';

export function handleInputDebounce<T>(setter: (value: T) => void) {
  return _.debounce((value: T) => setter(value), 500);
}
