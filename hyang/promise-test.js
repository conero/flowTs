/**
 * promise 请求测试
 * 2017年10月1日 星期日
 * Joshua Conero
 */



 class PT{
     constructor(){}
     /**
      * 基本测试
      * @static
      * @param {any} fn 
      * @returns 
      * @memberof PT
      */
     static baseTest(fn){
        fn = 'function' == typeof fn? fn:null;
         return new Promise(function(resolve, reject){             
             if(fn){
                 resolve(fn());
             }else{
                 reject('回调函数未设置，程序执行失败');
             }
         });
     }
 }
 PT.baseTest(()=>{
    // console.log('入口');
    return Math.random();
 })
.then((d) =>{console.log(d);})
.catch((error) => {console.log(error);});