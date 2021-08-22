window.jQuery = function(selectorOrArrayOrTemplate){
    let elements
    if(typeof selectorOrArrayOrTemplate === 'string'){
      if(selectorOrArrayOrTemplate[0] === '<'){
        // 创建 div
        elements=[createElement(selectorOrArrayOrTemplate)]
      }else{
        // 查找 div
        elements = document.querySelectorAll(selectorOrArrayOrTemplate)
      }
    }else if(selectorOrArrayOrTemplate instanceof Array){
      elements = selectorOrArrayOrTemplate
    }
  
    function createElement(string){
      const container = document.createElement("template");
      container.innerHTML = string.trim();
      return container.content.firstChild;
    }
    // api 可以操作elements
const api = Object.create(jQuery.prototype)//创建一个对象，这个对象的__proto__为括号里面的东西，相当于const api = {__proto__:jQuery,prototype}
    
    Object.assign(api,{
        elements:elements,
        oldApi:selectorOrArrayOrTemplate.oldApi
    })// api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi 简写在上面
    return api
   
 }
 
 jQuery.fn = jQuery.prototype = {
    constructor:jQuery,
    jquery: true,
    get(index){
        return this.elements[index]
        },
        appendTo(node){
            if(node instanceof Element){
              this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
            }else if(node.jquery === true){
              this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
            }
          },
        append(children){
            if(children instanceof Element){
              this.get(0).appendChild(children)
            }else if(children instanceof HTMLCollection){
              for(let i =0;i<children.length;i++){
                this.get(0).appendChild(children[i])
              }
            }else if(children.jquery === true){
              children.each(node => this.get(0).appendChild(node))
            }
        },
        find(selector){
            let array =[]
            for(let i=0;i<this.elements.length;i++){
                const elements2=Array.from(this.elements[i].querySelectorAll(selector))
                array=array.concat(elements2)
            }
            array.oldApi = this //this是api
            const newApi = jQuery(array)
              return newApi
           },
           each(fn){
            for(let i=0;i< this.elements.length;i++){
                fn.call(null,this.elements[i],i)
            }
            return this
           },
           parent(){
               const array =[]
               this.each((node)=>{
                   if(array.indexOf(node.parentNode)===-1){
                       array.push(node.parentNode)
                   }
               })
               return jQuery(array)
           },
           children(){
            const array = []
            this.each((node)=>{
              
              array.push(...node.children)//等于array.push(node.children[1],node.children[2],node.children[3]...)
      
            })
            return jQuery(array)
          },
          siblings(){
            const array = []
            this.each((node)=>{

            array.push(Array.from(node.parentNode.children).filter(n=>n!==node))
            })
           return jQuery(array)
          },
          next(){
            const array = []
            this.each((node)=>{
                let x=node.nextSibling
               while(x && x.nodeType === 3){
                x = x.nextSibling
            }
              array.push(x)
                
           })
            return jQuery(array)
    
          },
          previous(){
            const array = []
            this.each((node)=>{
                let x=node.previousSibling
               while(x && x.nodeType === 3){
                x = x.previousSibling
            }
              array.push(x)
                
           })
            return jQuery(array)
          },
           print(){
               console.log(this.elements)
           },
           
     addClass(className){//闭包：函数访问外部的变量
         for(let i=0;i<this.elements.length;i++){
             this.elements[i].classList.add(className)
         }
          return this//this就是api
     },//"addClass":function(){}可以简写成addClass(){}
     end(){
        return this.oldApi //这个this 是 api2
    },
 }

 window.$=window.jQuery//别名