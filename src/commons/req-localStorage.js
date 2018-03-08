/* 

  从 localStorage 中取数据

*/

/* 

  @params { String } key
  @params { Function } callback 回调
*/
export const getLocalStorage = (key, callback) => {
  callback(localStorage[key]);
}