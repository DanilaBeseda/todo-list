export default function objToArr(obj) {
  return Object.keys(obj).reduce((arr, key) => {
    return arr.concat({ id: key, ...obj[key] });
  }, []);
}
