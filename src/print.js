import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);

export default function printMe(text) {
  console.log(text);
  console.log('I get called from print.js!');
}