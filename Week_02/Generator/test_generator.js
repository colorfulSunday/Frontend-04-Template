function* loop() {//1.定义函数后面加个*
    console.log('启动！');
    for (let i = 0; i < 5; i++) {
        yield console.log(i);//2.函数内部可以使用yield来暂停函数的执行，注意：yield后面的表达式是要执行的，执行完这个表达式就暂停了
    }
    console.log('结束！');
}

const l = loop();//注意：函数需要执行后赋值给l，不是直接赋值给l
l.next();//3.调用过程中通过.next()恢复函数的执行
// l.next();
// l.next();
// l.next();
// l.next();
// l.next();



/*
Generator使用的3个步骤
1.定义Generator函数后面加个*
2.Generator函数内部可以使用yield来暂停函数的执行
3.调用过程中通过.next()恢复函数的执行，next()返回一个object对象{value: undefined, done: false}  ，done:是否执行完Generator函数

 */

/**
 * yield 表达式返回的是undefined
 */
