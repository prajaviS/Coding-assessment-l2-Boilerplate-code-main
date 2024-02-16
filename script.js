document.addEventListener('DOMContentLoaded', function () {
    // Get all the div elements with the class 'sections'
    var sectionDivs = document.querySelectorAll('.sections div');
    var displayDiv = document.querySelector(".display");
    var currentCategoryIndex = -1;

    // Add click event listener to each div
    sectionDivs.forEach(function (div, index) {
        // Store original color in dataset when the page loads
        div.dataset.originalColor = window.getComputedStyle(div).backgroundColor;

        div.addEventListener('click', function () {
            // Remove 'selected' class from all divs
            sectionDivs.forEach(function (otherDiv) {
                otherDiv.classList.remove('selected');
                // Retrieve original color from dataset
                otherDiv.style.backgroundColor = otherDiv.dataset.originalColor;
            });

            // Add 'selected' class to the clicked div and change its background color
            div.classList.add('selected');
            div.style.backgroundColor = 'black';

            // Check if a different category is clicked
            if (index !== currentCategoryIndex) {
                // Clear the content of the displayDiv
                displayDiv.innerHTML = "";
                // Load category based on the index of the clicked div
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


/*for(item in categories){
        console.log(categories[item])
        document.querySelector(".display").innerHTML+=`
        <div class="card1">
        <div class="imgsec">
            <div class="tab">Wedding Special ${categories[item].category_name}</div>
        </div>
        <div class="bottompart">
            <div class="header">
                <p class="prodname">Mens Kurta</p>
                <div class="dot"></div>
                <p class="brand">Manayavar</p>
            </div>
            <div class="pricetag">
                <p class="sellingprice">1000</p>
                <p class="actualprice">1299</p>
                <p class="discountprice">50% Off</p>
            </div>
            <div class="button"><p class="cart">Add to Cart</p></div>
        </div>
    </div>`; */