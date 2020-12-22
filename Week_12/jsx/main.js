function createElement(type, attributes, ...children){
  let element;
  if(typeof type === "string"){
    element = new ElementWrapper(type);
  }else{
    element = new type();
  }

  for(let name in attributes){
    element.setAttribute(name, attributes[name]);
  }
  for(let child of children){
    if(typeof child === "string"){
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

class ElementWrapper {
  constructor(type){
    this.root = document.createElement(type);
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value);
  }
  appendChild(child){
    child.mountTo(this.root);
  }
  mountTo(parent){
    parent.appendChild(this.root);
  }
}
class TextWrapper {
  constructor(type){
    this.root = document.createTextNode(type);
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value);
  }
  appendChild(child){
    child.mountTo(this.root);
  }
  mountTo(parent){
    parent.appendChild(this.root);
  }
}
class Div {
  constructor(){
   this.root = document.createElement("div");
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value);
  }
  appendChild(child){
    child.mountTo(this.root);
  }
  mountTo(parent){
    parent.appendChild(this.root);
  }
}

let a=<div>
    <span>123</span>
  </div>

// document.body.appendChild(a);//Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.

a.mountTo(document.body);

//1 为什么要给自定义标签添加mountTo方法
//正常的dom的appendChild方法参数只能接受正常的dom对象，无法接受自定义的
//2 为什么需要给正常的dom封装一个类来使用
// 如果是一个正常的html的dom是没有mountTo方法的，如果a是正常的html标签无法通用mountTo方法，所以需要扩展正常的dom
//3 为什么appendChild方法里面用mountTo实现
// 由于正常的dom被封装类替代了，appendChild只能接受正常的dom对象，无法接受封装扩展的类型，所以appendChild方法里面用mountTo实现