class Product{
    constructor(name, price, year){
        this.name = name;
        this.price  = price;
        this.year = year;
    }
}

class UI{
    addProduct(Product){
       const productList = document.getElementById("product-list");
       const element = document.createElement("div");
       element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${Product.name}
                    <strong>Product Price</strong>: ${Product.price}
                    <strong>Product Year</strong>: ${Product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
       `;
       productList.appendChild(element);
    }

    resetForm(){
        document.getElementById("product-form").reset();
    }

    deleteProduct(element){
        if (element.name === 'delete'){
            const deleteElement = element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully','info');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message))
        //Show in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        //timeout
        setTimeout(function() {
            document.querySelector(".alert").remove();
        },3000);
    }
}

// Dom Events

document.getElementById("product-form")
    .addEventListener("submit", function(e){
       const name = document.getElementById("name").value;
       const price = document.getElementById("price").value;
       const year = document.getElementById("year").value;
        // console.log(name, price, year)
        // console.log(new Product(name, price, year));
        const product = new Product(name, price, year);
        const ui = new UI();

        if(name === '' || price === '' || year === ''){
            return ui.showMessage ("Complete all the fields please", "danger");
        }

        ui.addProduct(product);
        ui.showMessage("Product Added successfully", "success");
        ui.resetForm();

        e.preventDefault();
    });

document.getElementById("product-list").addEventListener("click", function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
});