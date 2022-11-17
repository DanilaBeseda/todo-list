/**
 * Преобразует объект с бд firebase в массив
 * @param {object} obj - todo item
 * @returns {array}
 */
export default function objToArr(obj) {
  return Object.keys(obj).reduce((arr, key) => {
    return arr.concat({ id: key, ...obj[key] });
  }, []);
}
