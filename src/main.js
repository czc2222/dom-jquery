const api = jQuery('.test')//不返回元素们，返回api对象
api.addClass('red')
   .addClass('blue')
   .addClass('green')//遍历所有刚才获取的元素，添加.red,由于for循环中return了api 后面继续添加addClass是链式操作
   jQuery('.test')
    .find('.child')
    .addClass('black')
    .addClass('yellow')//下面的简化
    .end()
    .addClass('pink')
/* const api=jQuery('.test')
api1.addClass('pink')
const api2 =api.find('.child').addClass('black').addClass('yellow')
const oldApi =api2.end().addClass('pink') */
    

const x =jQuery('.test').find('.child')
x.each((div)=>(console.log(div)))

api.parent().print()

api.children().print()

const c2=api.find('.child2')
c2.siblings().print()
c2.next().print()
c2.previous().print()

const $div = $('<div>添加div</div>')
$div.appendTo(document.body)

$('#img_1').removeAttr("style")