document.addEventListener('DOMContentLoaded', function () {
    var sectionDivs = document.querySelectorAll('.sections div');
    var displayDiv = document.querySelector(".display");
    var currentCategoryIndex = -1;

    sectionDivs.forEach(function (div, index) {
        div.dataset.originalColor = window.getComputedStyle(div).backgroundColor;

        div.addEventListener('click', function () {
                sectionDivs.forEach(function (otherDiv) {
                otherDiv.classList.remove('selected');
                otherDiv.style.backgroundColor = otherDiv.dataset.originalColor;
            });

            div.classList.add('selected');
            div.style.backgroundColor = 'black';

            // Check if a different category is clicked
            if (index !== currentCategoryIndex) {
                displayDiv.innerHTML = "";
                loadCategory(index);
                currentCategoryIndex = index;
            }
        });
    });
});



function loadCategory(categoryindex){
    let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
let response = fetch(url)
response.then((v) => {
    return v.json()
}).then((data) => {
    console.log(data);
    let categories = data.categories; // Access the 'categories' property
    let displayDiv=document.querySelector(".display");
    let category=categories[categoryindex];
        let categoryName = category.category_name;
        console.log(categoryName);
        
        if (category.category_products && Array.isArray(category.category_products)) {
            for (let product of category.category_products) {
                let badgeTextDiv = product.badge_text !== null ? `<div class="tab">${product.badge_text}</div>` : '';
                let imageUrl = product.image || '';
                displayDiv.innerHTML += `
                    <div class="card1">
                        <div class="imgsec">
                        <img src="${imageUrl}">
                        ${badgeTextDiv}
                        </div>
                        <div class="bottompart">
                            <div class="header">
                                <p class="prodname">${product.title}</p>
                                <div class="dot"></div>
                                <p class="brand">${product.vendor}</p>
                            </div>
                            <div class="pricetag">
                                <p class="sellingprice">${product.price}</p>
                                <p class="actualprice">${product.compare_at_price}</p>
                                <p class="discountprice">50% Off</p>
                            </div>
                            <div class="button"><p class="cart">Add to Cart</p></div>
                        </div>
                    </div>`;
            }
        }
    
});

}

