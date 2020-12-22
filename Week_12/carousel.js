import {Component} from "./framework"
export class Carousel extends Component{
  constructor(){
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  render(){
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for(let record of this.attributes.src){
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }
    let position = 0;
    this.root.addEventListener("mousedown", event =>{
      // console.log("mousedown");
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        // console.log("mousemove");
        let x = event.clientX - startX;//若大于0，表示从右往左滑动鼠标，图片往前走，x变小
        let current = position - (x-x%500)/500;
        for(let offset of [-1,0,1]){
          let pos = current + offset;
          pos = (pos + children.length)%children.length;
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${-pos * 500 + offset *  500 + x % 500}px)`;
        }
      };
      let up = event => {
        // console.log("mouseup");
        let x = event.clientX - startX;
        position = position - Math.round(x / 500);
        for(let offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]){
          let pos = position + offset;
          pos = (pos + children.length)%children.length;
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${-pos * 500 + offset *  500}px)`;
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    /*
    //可视区域内最多只有2张图片，使用2张图的切换，就可以实现循环轮播的效果
    let currentIndex = 0;
    setInterval(()=>{
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;

      let current = children[currentIndex];
      let next = children[nextIndex];

      //将这2张图片放到正确的位置，current的位置一定是正确的。next元素原本就有一个100%的偏移(相对于current)这个要考虑进去
      next.style.transition = "none";//调整到正确的位置时，不希望有动画
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
      // next.style.transform = `translateX(${- currentIndex * 100}%)`;//可以简化成这样

      setTimeout(() => {
        next.style.transition = "";//还原，开启动画
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        next.style.transform = `translateX(${ - nextIndex * 100}%)`;
        currentIndex = nextIndex;
      },16);

    },3000);
    */

    // let current = 0;
    // setInterval(()=>{
    //   let children = this.root.children;
    //   current++;
    //   current = current % 4;
    //   for(let child of children){
    //     child.style.transform = `translateX(-${current * 100}%)`;
    //   }
    // },3000);
    return this.root;
  }
  mountTo(parent){
    parent.appendChild(this.render());
  }
}