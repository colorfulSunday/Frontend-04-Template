//async 定义的函数，（调用时）返回的promise对象
//await 后面根的内容是promise对象，如果不是promise对象会自动转换为promise对象
//await 只能在async定义的函数里面使用

async function firstAsync() {
    let promise = new Promise((resolve,reject) => {
        setTimeout(function () {
            resolve("now it is done");
        },1000);
    });
    console.log(await promise);
    console.log(await Promise.resolve(40));
    console.log(2);
    return Promise.resolve(3);
}

firstAsync().then(val => {
   console.log(val);
});