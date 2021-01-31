const productWidth = 250;
var mpCarousel = {
    margin: 0,
    index: 4,
    maxSize: 0,
}

var prCarousel = {
    margin: 0,
    index: 4,
    maxSize: 0,
}


function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
        callbackFunc();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}


function getProducList(maxProducts, callback) {
    const apiUrl = 'http://localhost:5051/recommendations' + (maxProducts ? '?maxProducts=' + maxProducts : '');

    let header = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        mode: 'cors',
    };

    fetch(apiUrl, header)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function renderProducts(productList, carousel, type) {
    
    let renderedProducts = productList.map((prdInfo, index) => {
        let {props} = prdInfo;
        let prdDocument = document.createElement('div');
        let off = Math.round((props.oldPrice - props.price) * 100/props.oldPrice);
        let html = (
            (type=='pr'?`<span class="off">-${off}%</span>`:'') +
            `\
                <div class="info">\
                    <img src="${ props.images.default}" alt="...">\
                    <h1>\
                    ${props.name}\
                    </h1>\
                    <span class="oldPrice">\
                    R$ ${props.oldPrice}\
                    </span>\
                    <span>Por <span class="newPrice">R$ ${props.price}</span></span>\
                    <span class="installment">\
                    ${props.installment.count}x R$ ${props.installment.price}\
                    </span>\
                </div>
            ` +
            (type=='mp'?`<span class="number">${index+1}°</span>`:'')
        )
    
        prdDocument.innerHTML = html;
        prdDocument.className = 'product';
        carousel.appendChild(prdDocument)
    });

    return renderedProducts;
}



function moveRightMostPop() {
    if (mpCarousel.index+1 > mpCarousel.maxSize) {
        mpCarousel.index = 4;
        mpCarousel.margin = 0;
    } else {
        mpCarousel.margin -= productWidth;
        mpCarousel.index++;
    }

    let product = document.getElementById('mostPopular').firstChild;
    product.style.marginLeft = mpCarousel.margin;
}
function moveLeftMostPop() {
    if (mpCarousel.index-1 < 4)
        return;
    mpCarousel.margin += productWidth;
    mpCarousel.index--;

    let product = document.getElementById('mostPopular').firstChild;
    product.style.marginLeft = mpCarousel.margin;
}

function moveRightPriceRec() {
    if (prCarousel.index+1 > prCarousel.maxSize) {
        prCarousel.index = 4;
        prCarousel.margin = 0;
    } else {
        prCarousel.margin -= productWidth;
        prCarousel.index++;
    }

    let product = document.getElementById('priceReduction').firstChild;
    product.style.marginLeft = prCarousel.margin;
}
function moveLeftPriceRec() {
    if (prCarousel.index-1 < 4)
        return;
    prCarousel.margin += productWidth;
    prCarousel.index--;

    let product = document.getElementById('priceReduction').firstChild;
    product.style.marginLeft = prCarousel.margin;
}

function render() {
    getProducList(12, (data) => {
        let mostPopular = document.getElementById('mostPopular');
        let priceReduction = document.getElementById('priceReduction');

        renderProducts(data.productsMostPopular, mostPopular, 'mp');
        renderProducts(data.productsPriceReduction, priceReduction, 'pr')

        mpCarousel.maxSize = data.productsMostPopular.length;
        prCarousel.maxSize = data.productsPriceReduction.length;
    });

    let btnMPRight = document.getElementById('btnMPRight');
    btnMPRight.onclick = moveRightMostPop;

    let btnMPLeft = document.getElementById('btnMPLeft');
    btnMPLeft.onclick = moveLeftMostPop;

    let btnPRRight = document.getElementById('btnPRRight');
    btnPRRight.onclick = moveRightPriceRec;

    let btnPRLeft = document.getElementById('btnPRLeft');
    btnPRLeft.onclick = moveLeftPriceRec;
}

ready(render)