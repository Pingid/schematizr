/*
  Takes arbitary number of functions and returns a function wich takes a
  value which is passed to each function from right to left
*/
// compose :: (f) -> f
const compose = (...args) => (item) => args.reverse().reduce((a, b) => b(a), item);

export default compose;
