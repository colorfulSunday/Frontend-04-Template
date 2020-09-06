var momsPromise = new Promise(function(resolve1111, reject) {
    momsSavings = 200000;
    priceOfPhone = 60000;
    if (momsSavings > priceOfPhone) {
        console.log("执行顺序：1");
        resolve1111({
            brand: "iphone",
            model: "6s"
        });
        console.log("执行顺序：2");
    } else {
        reject("我们没有足够的储蓄，让我们多存点钱吧。");
    }
});
console.log("执行顺序：3");
let promise1 = momsPromise.then(function(value) {
    console.log("执行顺序：5");
    console.log("哇，我得到这个电话作为礼物 ", JSON.stringify(value));
});
// momsPromise.catch(function(reason) {
//     console.log("妈妈不能给我买电话，因为 ", reason);
// });
// momsPromise.finally(function() {
//     console.log(
//         "不管妈妈能不能给我买个电话，我仍然爱她"
//     );
// });
let promise2 = momsPromise.then(function(value) {
    console.log("执行顺序：6");
    console.log("哇，我得到这个电话作为礼物2 ", JSON.stringify(value));
});
console.log("执行顺序：4");

console.log(momsPromise === promise1 );
console.log(momsPromise === promise2 );
console.log(promise1 === promise2 );

console.log(momsPromise);
console.log(promise1);
console.log(promise2);

//改变momsSavings的值使momsPromise的状态值不一样，观察promise1和promise2的状态值和momsPromise的状态值保持一致，
//如果调用then时，第一个参数（函数）没有返回一个明确的promise对象，调用then就会返回promise1这样的空promise对象，
// 它的状态已经定型，和上一个momsPromise的状态值保持一致，之后的then就和之前的then触发同样的状态的回调函数，
// 无法变化出新的状态，这明显不是我们想要的结果。