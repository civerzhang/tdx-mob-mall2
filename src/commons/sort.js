/*
  排序算法
*/

/*
  
  快速排序

  @param { Array } arr 待排序数据集
  @param { String } field 排序字段
  @param { Number } direction -1 - 降序，1 - 升序

*/
export const quickSort = (arr, field, direction) => {

  if(arr.length <= 1) {
    return arr;
  }

  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];

  let b = pivot[field];
  let fb = parseFloat(b);

  for(let i = 0; i < arr.length; i++) {

    let a = arr[i][field];
    let fa = parseFloat(a);

    // 数字内容比较
    if(fa == a && fb == b) {

      if(direction == -1) {

        if(fa < fb) {
          right.push(arr[i]);
        }
        else {
          left.push(arr[i]);
        }
      }
      else {
        if(fa < fb) {
          left.push(arr[i]);
        }
        else {
          right.push(arr[i]);
        }
      }
    }

    // 字符串比较
    else {

      if(direction == -1) {

        if(a < b) {
          right.push(arr[i]);
        }
        else {
          left.push(arr[i]);
        }
      }
      else {

        if(a < b) {
          left.push(arr[i]);
        }
        else {
          right.push(arr[i]);
        }
      }
    }
  }

  return [...quickSort(left, field, direction), pivot, ...quickSort(right, field, direction)];
}