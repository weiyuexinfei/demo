/* 快速排序算法
*1、选择一个基准点
*2、所有小于“基准”的元素，都移动“基准”的左边，大于“基准”的元素移到“基准”右边
*3、对“基准”左右两边的子集不断重复步骤1和2，直到所有子集只剩下一个元素。
*/
var array = [28,55,9,35,45,12,77,55,65,65];

var quickSort = function(array) {
	if(array.length <= 1) {return array;}
	var pivoteIndex = Math.floor(array.length/2);  // 选取中间点为基准点
	var left = [];
	var rigth = [];
	var pivote = array.splice(pivoteIndex,1)[0];
	for(var i =0;i<array.length;i++) {
		if(array[i] <= pivote) {
			left.push(array[i]);
		}else {
			rigth.push(array[i]);
		}
	}
	return quickSort(left).concat([pivote],quickSort(rigth));  //递归得到排序后数组
}
console.log(quickSort(array));