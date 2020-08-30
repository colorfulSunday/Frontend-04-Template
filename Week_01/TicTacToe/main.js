let pattern = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];

//可以将pattern改成一维数组，程序中所有使用pattern[i][j]的地方需要替换为pattern[i*3+j],copy数组同理。好处是可以直接使用Object.create()克隆。
//因为一维数组每个元素都是基本类型（非引用类型，如果存在引用类型，需要深拷贝）

let color = 2;//2表示×，第一步×先走，1表示○
function show() {
    let board = document.getElementById("board");

    board.innerText = "";//每次重绘棋盘前，先清空棋盘

    for (let i = 0; i < 3; i++) {//i表示棋盘的行
        for (let j = 0; j < 3; j++) {//j表示棋盘的列
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText =
                pattern[i][j] == 2 ? "×" :
                pattern[i][j] == 1 ? "○" : "";
            //添加点击事件:落子
            cell.addEventListener("click",() => uerMove(i,j));
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}

function uerMove(x, y){
    pattern[x][y] = color;//这一步落子到棋盘上
    if(check(pattern,color)){
        alert(color == 2 ? '× is winner!' : "○ is winner!");
    }
    color = 3 - color;//下一步该谁走,数据对称可以使用这种方式实现2个数的来回切换
    // console.log(bestChoice(pattern,color));
    show();
    computerMove();//用户走完了，自动走ai的
}

function computerMove(){
    let choice = bestChoice(pattern,color);//下一步最好的走法
    if(choice.point){
        pattern[choice.point[0]][choice.point[1]] = color;
    }
    if(check(pattern,color)){
        alert(color == 2 ? '× is winner!' : "○ is winner!");
    }
    color = 3 - color;
    show();
}

/**
 * 检查是否获胜
 */
function check(pattern,color){
    //1判断行，是否有3个同样的子
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if(pattern[i][j] != color ){//当前行存在一个不等于当前落子，就没有获胜
                win = false;
                break;
            }
        }
        if(win){
            return true;
        }
    }
    //2判断列，是否有3个同样的子
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if(pattern[j][i] != color ){//当前列存在一个不等于当前落子，就没有获胜
                win = false;
                break;
            }
        }
        if(win){
            return true;
        }
    }
    //3判断斜
    {
        let win = true;
        for (let i = 0; i < 3; i++) {
            if(pattern[i][i] != color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    {
        let win = true;
        for (let i = 0; i < 3; i++) {
            if(pattern[i][2-i] != color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    return false;//都不满足则未获胜
}

function clone(pattern){
    return JSON.parse(JSON.stringify(pattern));
}

function willWin(pattern,color){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(pattern[i][j]){//如果当前位置已经落子（不为0），则跳过
                continue;
            }
            let copy = clone(pattern);
            copy[i][j] = color;
            if(check(copy,color)){
                return [i,j];//返回下一步可以赢的点
            }
        }
    }
    return null;
}

function bestChoice(pattern, color){
    let p;
    if(p = willWin(pattern, color) ){
        return{
            point: p,
            result: 1//-1输，0和，1赢
        }
    }
    let result = -2;//用于记录结果的最大值
    let point = null;
    outer:for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(pattern[i][j]){//已经有子了，跳过
                continue;
            }
            let copy = clone(pattern);
            copy[i][j] = color;
            let r = bestChoice(copy, 3-color).result;//下一步对方走的结果

            if(-r > result){//-r表示我方的结果。大于最大值则交换
                result = -r;
                point = [i,j];
            }
            if(result == 1){
                break outer;
            }
        }
    }
    return {
        point : point,
        result : point ? result :0
    }
}
show();