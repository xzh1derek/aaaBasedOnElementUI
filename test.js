function Find(target, array) {
  if (array.length === 0 || array[0].length === 0) {
    return false
  }
  let row;
  let colLength = array[0].length
  for (let i = 0; i > array.length; i++) {
    if (array[i][colLength] > target) {
      row = i;
      break;
    } else if (i !== array.length - 1) {
      continue;
    }
    row = array.length - 1
  }
  return Search(array[row], 0, array[row].length - 1, target)
}

function Search(arr, start, end, target) {

  if (start > end) {
    return false
  }
  let point = Math.ceil((start + end) / 2);
  if (target > arr[point]) {//在右边
    return Search(arr, point + 1, end, target)
  } else if (target < arr[point]) {//在左边
    return Search(arr, start, point - 1, target)
  } else {
    return true
  }
}

function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

/**
 * 通过先序和中序还原树
 * @param pre   先序数组
 * @param vin   中序数组
 * @returns {TreeNode|null}
 */
function reConstructBinaryTree(pre, vin) {
  if (!pre.length || !vin.length) {
    return null;
  }

  const rootVal = pre[0];
  const node = new TreeNode(rootVal);

  let i = 0; // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
  for (; i < vin.length; ++i) {
    if (vin[i] === rootVal) {
      break;
    }
  }

  node.left = reConstructBinaryTree(pre.slice(1, i + 1), vin.slice(0, i));
  node.right = reConstructBinaryTree(pre.slice(i + 1), vin.slice(i + 1));
  return node;
}


function minNumberInRotateArray(rotateArray) {
  if (!rotateArray.length) {
    return 0
  }
  for (let i = rotateArray.length - 1; i > 0; i--) {//从数组的末尾开始
    if (rotateArray[i] < rotateArray[i - 1]) {//后一个元素小于前一个元素
      return rotateArray[i]
    }
  }
  return rotateArray[0]
}

//1 1 2 3 5 8
/**
 * @return {number}
 */
function Fibonacci(n) {
  // if (n > 39) {
  //   return 0
  // }
  if (n === 1 || n === 2) {
    return 1
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}

function Fibonacci1(n) {
  if (n < 0) {
    return 0
  }
  if (n === 1 || n === 2) {
    return 1
  }
  let arr = [];
  arr.length = n + 1
  arr[0] = 0
  arr[1] = 1
  arr[2] = 1

  for (let i = 3; i < n + 2; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}


/**
 *
 * @param number
 * @returns {number}
 */
function c(n) {
  if (n === 1) {
    return 1
  }
  return c(n - 1) * n
}


function jumpFloor(number) {
  if (number <= 0) return 0

  if (number === 1) return 1

  if (number === 2) return 2

  let arr = []
  arr.length = number + 1
  arr[0] = 0
  arr[1] = 1
  arr[2] = 2

  for (let i = 3; i < number + 1; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }

  return arr[number]
}

function jumpFloorII(number) {
  if (number <= 0) return 0

  if (number === 1) return 1

  let sum = 1

  for (let i = 2; i < number + 1; i++) {
    sum *= 2
  }
  return sum
}


// console.log(obj)


function rectCover(number) {
  if (number <= 0) return 0
  if (number === 1) return 1
  if (number === 2) return 2

  let before2 = 1
  let before1 = 2
  let methods = 0
  for (let i = 3; i < number + 1; i++) {
    methods = before1 + before2
    before2 = before1
    before1 = methods
  }

  return methods

}

/**
 * @return {number}
 */
function NumberOf1(n) {
  // write code here
  let count = 0;
  while (n != 0) {
    count++;
    n = n & (n - 1);
  }
  return count;
}


/**
 * @return {number}
 */
function Power(base, exponent) {
  //先做边界判断
  if (base === 0) return 0;
  if (exponent === 0) return 1;
  if (exponent === 1) return base;


  let initVal = base;//保存底数初始值
  let initExp = exponent;
  let i = 0;
  while (Math.pow(2, i) <= exponent) {
    i++;//算一共要进行几次平方,多了一次
  }
  //计算下次递归的exponent
  exponent -= Math.pow(2, i - 1)

  if (/\./.test(base.toString())) {
    let length = base.toString().split(".")[1].length
    let point = Math.pow(10, length) //计算需要乘多少
    base = point * base//化整后的
    let result = base
    for (let j = 1; j < i; j++) {
      result = Math.pow(result, 2)
    }
    // return Power(initVal,exponent)*(result/Math.pow(point,Math.pow(2,i-1)))
    return Power(initVal, exponent) * (result / Math.pow(point, Math.pow(2, i - 1)))
  } else {
    return Math.pow(base, initExp)
  }

}


function reOrderArray(array) {
  // write code here
  let odd = [];//奇数
  let evn = [];//偶数
  let len = array.length
  for (let i = 0; i < len; i++) {
    if (array[i] % 2) {
      odd.push(array[i])
    } else {
      evn.push(array[i])
    }
  }
  return odd.concat(evn)
}


function FindKthToTail(head, k) {
  if (k < 0) {
    return
  }
  if (k === 0) {
    return head
  }

  let result = head.next
  if (k === 1) {
    return result
  }
  // write code here
  for (i = 0; i < k + 1; i++) {
    result = result.next
  }

  return result

}


/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

function quickSort(array, left, right) {
  if (left >= right) {//当两个指针重合的时候.返回
    return
  }
  //left 和 right 从来都没变
  let l = left //左指针
  let r = right//右指针
  let pivot = array[left]//最左边的值
  while (l < r) {
    while (array[r] > pivot && l < r) {
      r--
    }
    while (array[l] <= pivot && l < r) {
      l++
    }
    if (l < r) {
      let temp = array[l]
      array[l] = array[r]
      array[r] = temp
    }
  }
  array[left] = array[l]
  array[l] = pivot

  quickSort(array, left, l - 1)
  quickSort(array, l + 1, right)
  return array
}


/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2) {
  // write code here
  if (pHead1 === null) {
    return pHead2
  } else if (pHead2 === null) {
    return pHead1
  }

  let initPhead1 = pHead1
  let initPhead2 = pHead2


  let arr = []
  let beforeOne;
  while (pHead1 != null) {
    arr.push(pHead1.val)
    beforeOne = pHead1//滞后一个节点
    pHead1 = pHead1.next
  }
  beforeOne.next = pHead2//把两个链表链接起来
  while (pHead2 != null) {
    arr.push(pHead2.val)
    pHead2 = pHead2.next
  }
  arr = quickSort(arr, 0, arr.length - 1)
  pHead1 = initPhead1

  while (pHead1 != null) {
    pHead1.val = arr.shift()
    pHead1 = pHead1.next
  }
  return initPhead1
}


let arr = [5, 87, 456, 6, 12, 45, 2, 6, 45789, 7]
// console.log(quickSort(arr, 0, arr.length - 1));
// quick_sort(arr, 0, arr.length - 1);
// console.log(arr);


/**
 *堆排序对树的要求
 * 1.完全二叉树(从上到下,从左到右排列的二叉树)
 * 2.根节点的值大于两个子节点
 */
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 保证根节点的值大于子节点
 * @param tree:用于排序的数组
 * @param n:数组的长度
 * @param i:对树的哪个节点进行排序
 */
function heapify(tree, n, i) {
  if (i >= n) {//如果待排序的节点大于数组的最大下标
    return
  }
  if (n === 0 || n === 1) {
    return;
  }
  let c1 = 2 * i + 1
  let c2 = 2 * i + 2
  let max = i
  if (c1 < n && tree[c1] > tree[max]) {
    max = c1
  }
  if (c2 < n && tree[c2] > tree[max]) {
    max = c2
  }
  if (max !== i) {
    swap(tree, max, i)
    heapify(tree, n, max)
  }
}


/**
 * 把一个杂乱无章的树,建立成符合堆排序条件的树
 * @param tree
 * @param n
 */
function buildHeap(tree, n) {
  let lastNode = n - 1
  let parent = Math.floor(lastNode / 2)
  for (; parent >= 0; parent--) {
    heapify(tree, n, parent)
  }
}


function heapSort(tree, n) {
  buildHeap(tree, n)
  for (let i = n - 1; i >= 0; i--) {
    swap(tree, i, 0)
    heapify(tree, i, 0)
  }
}


let arr123 = [9, 18, 5, 15, 48, 6, 6, 46, 1, 7, 9, 82];
// heapSort(arr123, arr123.length)
// console.log(arr123);


function quickSortNow(arr, left, right) {
  if (left > right) return []

  let i = left
  let j = right
  let first = arr[left]

  while (i < j) {
    while (i < j && arr[j] >= first) {
      j--
    }

    while (i < j && arr[i] < first) {
      i++
    }
    if (i < j) {
      swap(arr, i, j)
    }
  }

  arr[left] = arr[i]
  arr[i] = first

  quickSort(arr, left, i - 1)
  quickSort(arr, i + 1, right)
  return arr
}


function quickSortNowCoder(arr, left, right) {
  if (left > right) return []

  let i = left
  let j = right
  let first = arr[left]

  while (i < j) {
    while (i < j && arr[j] >= first) {
      j--
    }

    while (i < j && arr[i] < first) {
      i++
    }
    if (i < j) {
      swap(arr, i, j)
    }
  }

  arr[left] = arr[i]
  arr[i] = first

  quickSortNowCoder(arr, left, i - 1)
  quickSortNowCoder(arr, i + 1, right)
  return arr
}

function arrToSet(arr) {
  //arr = buildArr(arr)
  // console.log(arr);
  arr = quickSortNow(arr, 0, arr.length - 1)
  // console.log(arr);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1)
      i--
    }
  }
  return arr
}

let result = [
  [1, 5, 48, 3615, 46, 12, 54, 1, 5, 45, 21, 32465, 8, 9],
  [15, 45, 48, 23, 6, 45, 87, 45, 12, 15, 15, 33, 5, 45, 878, 1]
]

for (i = 0; i < result.length; i++) {
  // console.log(result[i]);
  let setArr = arrToSet(result[i])
  // console.log(setArr);

}


// arr = [ 9,8,5,415,78,123,456,8,56,8,59,56,123,78]
arr = []
// console.log(quickSortNowCoder(arr, 0, arr.length - 1));
// console.log(arrToSet(arr));
// console.log(arr)
//


function getPossi(n, under) {
  //n 表示 指数
  //under 表示 总数
  if (n == 0 && under != 0) return 1
  if (under === 0) return
  let up = 1
  let underNum = 1
  for (let i = n; i >= 1; i--) {
    up *= i
    underNum *= under--
  }
  let result = underNum / up
  return result
}

function possibility(n) {
  if (n > 991 && n <= 1000) return 1
  if (n < 0 || n > 1000) return
  let top = getPossi(n, 990)
  let bottom = getPossi(n, 1000)
  let noneOfOne = top / bottom
  // console.log("noneOfOne:" + noneOfOne);
  let result = 1 - noneOfOne
  return result
}


class Tree {
  constructor(val) {
    this.val = val;
    this.left = null
    this.right = null
  }
}

let c1 = new Tree(1);
let c2 = new Tree(2);
let c3 = new Tree(3);
let c4 = new Tree(4);
let c5 = new Tree(5);
let c6 = new Tree(6);
let c7 = new Tree(7);

c1.left = c2
c1.right = c3
c2.left = c4
c2.right = c5
c3.left = c6
c3.right = c7

//前序遍历
function getTreePre(treeNode, arr) {
  if (!treeNode) {
    return
  }
  let val = treeNode.val
  arr.push(val)
  let left = treeNode.left
  if (left) {
    getTreePre(left, arr)
    left = treeNode.left
  }
  getTreePre(treeNode.right, arr)
  return arr
}

//中序遍历
function getTreeMid(treeNode, arr) {
  if (!treeNode) {
    return
  }

  let left = treeNode.left
  if (left) {
    getTreeMid(left, arr)
    left = treeNode.left
  }

  arr.push(treeNode.val);

  getTreeMid(treeNode.right, arr)
  return arr

}

function getTreeBack(treeNode, arr) {
  if (!treeNode) {
    return
  }

  let left = treeNode.left
  if (left) {
    getTreeBack(left, arr)
    left = treeNode.left
  }

  getTreeBack(treeNode.right, arr)
  arr.push(treeNode.val);
  return arr

}

function reverseMatrix(arr) {
  if (!arr.length) return
  let result = []
  let i = arr.length      //行
  let j = arr[0].length   //列
  for (let k = 0; k < j; k++) {
    result[k] = []
  }
  for (let k = 0; k < j; k++) {
    for (let l = 0; l < i; l++) {
      result[k].push(arr[l].pop())
    }
  }
  return result
}


function printMatrix(matrix) {
  let result = [];
  if (!matrix.length) return result;
  while (matrix) {
    if (matrix.length === 1 || matrix[0].length === 1) {
      result.push(matrix);
      result = result.join(",").split(",")
      return result;
    }
    result.push(matrix.shift());
    matrix = reverseMatrix(matrix)
  }
}

arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// console.log(printMatrix(arr));


let url = "www.google.com?q=123"
let params = "q"

function getParams(url, params) {
  let index = url.indexOf("?")
  if (index === -1) {
    return false
  }

  let paramsStr = url.substr(index + 1)
  if (!paramsStr.length) {
    return false
  }
  let reg = new RegExp("^" + params);

  let paramsArr = paramsStr.split("&")
  for (let i = 0; i < paramsArr.length; i++) {
    let test = reg.test(paramsArr[i])
    if (test) {
      return test
    }
  }
  return false
}

// console.log(getParams(url, params));


let reg = new RegExp("^" + params + "=");

// console.log(reg.test("1q="));


/**
 *
 * @param line
 *
 * 先把line分割成数组
 * 遍历数组中的每一个选项,如果中间有"-" 则判断范围
 *
 */
function sortPorts(line) {
  //如果是空串,直接返回
  if (!line.length) return
  let portsArr = line.split(",");
  //如果只有一个端口值
  if (portsArr.length === 1) return portsArr[0]
  let comArr = []
  let index = 0
  let testReg = /-/
  for (let i = 0; i < portsArr.length; i++) {
    //如果是合并端口号
    if (testReg.test(portsArr[i])) {
      let com = portsArr[i].split("-")
      comArr[index][0] = com[0]
      comArr[index][1] = com[1]
      index++
    }
  }
  let min = 999999
  let max = 0
  for (let i = 0; i < comArr.length; i++) {
    //后一个小元素
    if (comArr[i + 1][0] > comArr[i][0] && comArr[i + 1][0] < comArr[i][1]) {
      if (comArr[i][0] < min) {
        min = comArr[i][0]
      }
      let nowMax = Math.max(comArr[i][1], comArr[i + 1][1])
      if (nowMax > max) {
        max = nowMax
      }
    }

  }

}

let testReg = /,/


arr = [
  [5, 1],
  [1, 3],
  [100, 0]
]


function multipleArr(arr) {
  let num = 1
  for (let value of arr) {
    num *= value
  }
  return num
}

function sumArr(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}


function solution(m, n) {
  // write code here
  //按键可以分成三类
  //正中心    *1
  //角       *4
  //边中心    *4
  if (m < 0) m = 1;
  if (n < 0) n = 1;
  if (m > n) return 0;

  let arr = []
  arr[0] = 0
  arr[1] = 9
  arr[2] = 56

  for (let i = 3; i <= n; i++) {
    arr[i] = sumArr(arr)
  }
  let sum = 0
  for (let i = m; i <= n; i++) {
    sum += arr[i]
  }

  return sum
}

solution(1, 5);


let line = "2,10,3,4,5,7,11,10,11,20"


function getArr(line) {
  if (line.length === 0) return

  line = line.split(",")
  line = line.sort(function (a, b) {
    return a - b
  })

  let result = [1]
  for (let i = 1; i < line.length; i++) {
    result.push(line[i] - line[i - 1])
  }


  let index = 0
  let returnArr = []
  for (let i = 0; i < line.length; i++) {
    returnArr[i] = []
  }


  for (let i = 0; i < result.length; i++) {

    if (result[i] === 1) {
      returnArr[index].push(line[i])
      // returnArr.push(line[i])
    } else if (result[i] === 0) {
      continue;
    } else {
      index++
      returnArr[index].push(line[i])
    }
  }
  for (let i = 0; i < returnArr.length; i++) {
    if (returnArr[i] !== []) {
      console.log(returnArr[i].join(","))
    }
  }

}

console.log('a'.charCodeAt('0') - 'b'.charCodeAt("b"))

/**
 * 用闭包实现截留函数
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
function throttle(func, delay) {
  let timer = null;
  let startTime = Date.parse(new Date());

  return function () {
    let curTime = Date.parse(new Date());
    let remaining = delay - (curTime - startTime);
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.parse(new Date());
    } else {
      console.log("不能太快")
    }
  }
}


function f() {
  console.log(1)
}

// let a = throttle(f, 1000);
// setTimeout(a, 1000)


var A = function() {};

var c = new A();
A.prototype.n = 1;
A.prototype.m = 1;

A.prototype={
  m:2,
  n:3
}

var b = new A();
console.log(b.n);
console.log(b.m);

console.log(c.n);
console.log(c.m);
