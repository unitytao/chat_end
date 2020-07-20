// class Foo{
//     constructor(){
//         bar =function(){console.log(2);};
// }
// }
// Foo.bar =function(){console.log(2);};
// Foo.prototype.bar =function(){
//     console.log(3)
// }
// var bar= function(){console.log(4)};

// function bar(){console.log(5)}

// Foo.bar()
// bar()
// new Foo().bar()
// bar()
// new Foo.bar();
// new new Foo().bar()
// var str ="aabbbbbbcdeeef"

// var x=0;

// var y=""

// for(var i=0;i<str.length;i++){
//     if(str[i]==y[y.length-1]){
//         x++
//     }else{
//         if(x>0){
//             y+= x+1;
//             x=0;
//         }
//         y+=str[i]
//     }
// }
// console.log(y)
// function foo (num){
//     let temps = num.toFixed(2).toString().split('.'), //处理浮点数的情况，整数时会返回原数值
//             target = temps[0].split('').reverse(), //倒序
//             lastIndex = target.length;
//         let result = target.map((item,index) => { 
//                         //第三个就增加一个','，要注意最后一个数字不添加
//                         return ((index+1) % 3 === 0 && (index !== lastIndex - 1)) ? (','+ item) : item;
//                     })
//                     .reverse() //倒序回来
//                     .join('') + (temps[1] ? '.' + temps[1] : ''); //如果是浮点数，就再加上小数部分
//                     console.log(result)
//                     return result
// }
// foo(15354531.1531531)

// const x = {};

// function foo(y,z) {
//     // TODO
//   var str =y.split('.')
//     var item ='{'
//     for (var i=0;i<str.length-1;i++) {
//         item =item +'"'+str[i]+'"'+':'+'{'
//     }
//     let str1 ='"'+str[str.length-1]+'"'+':'+z
//     item =item +str1
//     for (var i=0;i<str.length;i++) {
//         item =item +"}"
//     }
//      x=JSON.parse(item)
// }
// foo('a.b.c',1)
// console.log(x)
// console.log(JSON.stringify(x)); 

// var x=0;

// var y=""

// for(var i=0;i<str.length;i++){
//     if(str[i]==y[y.length-1]){
//         x++
//     }else{
//         if(x>0){
//             y+= x+1;
//             x=0;
//         }
//         y+=str[i]
//     }
// }
// console.log(y)

function clearAndSort(e){
    //请写出实现代码思路，考虑性能问题
    //去重
    let newArr = [e[0]];
    for (var i = 1; i < e.length; i++) {
        var flag = false;
        for (var j = 0; j < newArr.length; j++) {
            if (e[i] === newArr[j]) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            newArr.push(e[i]);
        }
    }
    //冒泡排序
    var len = newArr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (newArr[j] > newArr[j+1]) {    
                var temp = newArr[j+1];       
                newArr[j+1] = newArr[j];
                newArr[j] = temp;
            }
        }
    }
    return newArr;
}
var inputArray=[2,-3,11,6,-3,0,3,2,3,-1,9,2,2,5,-2,8,5,-1,-2,0,11,0,2]; 
//数组长度超过1万个数据
console.log(clearAndSort(inputArray));