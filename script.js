const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcal: 300,
        amount: 0,
        
        get summ(){
            return this.price * this.amount
        },
        
        get sumkall(){
            return  this.kcal * this.amount
        }
        
    },
    
    freshBurger: {
        name: 'Гамбургер Fresh',
        price: 20500,
        kcal: 600,
        amount: 0,
        
        get summ(){
            return this.price * this.amount
        },
        
        get sumkall(){
            return  this.kcal * this.amount
        }
    },
    
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcal: 900,
        amount: 0,
        
        get summ(){
            return this.price * this.amount
        },
        
        get sumkall(){
            return  this.kcal * this.amount
        }
    }
}

const extraProduct = {
    doubleMayonnaise:{
        name: 'Двойной Майонез',
        price: 1000,
        ckal: 200,
    },
    
    lettuce:{
        name: 'Салатовый лист',
        price: 500,
        ckal: 13,
    },
    
    cheese:{
        name: 'Сыр',
        price: 2000,
        ckal: 500,
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        pluseOrMinus(this)
    })
}

function pluseOrMinus(nik) {
    let parenId = nik.closest('.main__product').getAttribute('id');
    
    let out = nik.closest('.main__product').querySelector('.main__product-num')
    
    let price = nik.closest('.main__product').querySelector('.main__product-price span')
    
    let ckal = nik.closest('.main__product').querySelector('.main__product-call span')
    
    
    
    if(nik.getAttribute('data-symbol') == '+'){
        
        product[parenId].amount++
        
        if(product[parenId].amount > 50){
            product[parenId].amount = 50;
        }
        
    }
    
    if(nik.getAttribute('data-symbol') == '-'){
        product[parenId].amount--;
        
        if(product[parenId].amount < 1){
            product[parenId].amount = 0
        }
    }
    
    out.innerHTML = product[parenId].amount
    price.innerHTML = product[parenId].summ
    ckal.innerHTML = product[parenId].sumkall
}

const chekboxProd = document.querySelectorAll('.main__product-checkbox')

for (let n = 0; n < chekboxProd.length; n++) {
    
    chekboxProd[n].addEventListener('click', function () {
        addExtra(this);
    })
    
}

function addExtra(el) {
    const parent = el.closest('.main__product');
    const parentId = parent.getAttribute('id');
    const elDataInfo = el.getAttribute('data-extra');
    let price = parent.querySelector('.main__product-price span');
    let ckal = parent.querySelector('.main__product-call span');
    
    product[parentId][el.getAttribute('data-extra')] = el.checked
    
    
    if( product[parentId][elDataInfo] == true){
        product[parentId].price += extraProduct[elDataInfo].price
        product[parentId].kcal += extraProduct[elDataInfo].ckal
    }
    
    
    if( product[parentId][elDataInfo] == false){
        product[parentId].price -= extraProduct[elDataInfo].price
        product[parentId].kcal -= extraProduct[elDataInfo].ckal
    }
    
    
    price.innerHTML =  product[parentId].summ
    ckal.innerHTML =  product[parentId].sumkall
    
}


let addProduct = [];
let totalName = '';
let totalPrice = 0;
let totalKcall = 0;




const addCart = document.querySelector('.addCart')
const receipt =document.querySelector('.receipt')
const receiptWin =document.querySelector('.receipt__window')
const receiptWinBtn =document.querySelector('.receipt__window-btn')
const no = document.querySelector('.no')
const receptWinOut = document.querySelector('.receipt__window-out')

addCart.addEventListener('click', function() {
    
    
    for (const key in product) {
        
        if(product[key].amount > 0){
            const productObj = product[key];
            addProduct.push(productObj)
            
            
            for(const newKey in productObj){
                if(productObj[newKey] === true){
                    productObj.name +=  ' \n \n ' + extraProduct[newKey].name + '\n \n'
                }
            }
            
            productObj.price = productObj.summ;
            productObj.kcal = productObj.sumkall;
        }
    }
    
    for (let i = 0; i < addProduct.length; i++) {
        totalPrice += addProduct[i].price
        
        totalKcall += addProduct[i].kcal
        
        totalName += addProduct[i].name
    }
    
    console.log(addProduct);
    
    
    receptWinOut.innerHTML = `Вы преобрели:  ${totalName} \n  Kcall:  ${totalKcall} \n  Стоимость:  ${totalPrice} Сумм`
    
    receipt.style.display = 'flex';
    
    
   
    setTimeout(function() {
        receipt.style.opacity = '1';
    }, 100);
    
    setTimeout(function() {
        receiptWin.style.top = '20%';
    }, 200);
    
    
})

receiptWinBtn.addEventListener('click', function() {
    
    
    setTimeout(function() {
        receiptWin.style.top = '-100%';
    }, 200);
    
    setTimeout(function() {
        receipt.style = `display: none`;
        receipt.style.opacity = '0';
    }, 300);
    
   
})


no.addEventListener('click', function () {
    setTimeout(function() {
        receiptWin.style.top = '100%';
    }, 200);
    
    setTimeout(function() {
        receipt.style = `display: none`;
        receipt.style.opacity = '0';
    }, 300);
    
    
    let out = nik.closest('.main__product').querySelector('.main__product-num')
    
    let price = nik.closest('.main__product').querySelector('.main__product-price span')
    
    let ckal = nik.closest('.main__product').querySelector('.main__product-call span')
    
    out.innerHTML = 0;
    price.innerHTML = 0;
    ckal.innerHTML = 0;
})
