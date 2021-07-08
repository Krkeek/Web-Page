class Product {
    constructor(sku, name, price) {
        this.sku = sku;
        this.name = name;
        this.price = price;

    }
    static pushSpecialAttribute(data) {
        const specialAttributeRow = document.getElementById('special_attribute_row');
        specialAttributeRow.innerHTML = data;
    }
}
class DVD extends Product {
    constructor(size) {
        super(sku, name, price);
        this.size = size;
    }

    setSpecialAttribute() {
        const specialAttributeForm = `
          <div class="form-row">
                <div class="col-4">
                  <label for="size">Size (MB) </label>
                </div>
                <div class="col-8">
                  <input id="size" class="form-control" type="text">
                  <p>Please, provide size in CM</p>
                </div>
              </div>`;

        Product.pushSpecialAttribute(specialAttributeForm);

    }
}
class Book extends Product {
    constructor(weight) {
        super(sku, name, price);
        this.weight = weight
    }
    setSpecialAttribute() {
        const specialAttributeForm = `
         <div class="form-row">
        <div class="col-4">
          <label for="weight">Weight (KG) </label>
        </div>
        <div class="col-8">
          <input id="weight" class="form-control" type="text">
          <p>Please, provide weight in KG</p>
        </div>
      </div>
        `;
        Product.pushSpecialAttribute(specialAttributeForm);
    }

}
class Furniture extends Product {
    constructor(height, width, length) {
        super(sku, name, price);
        this.height = height;
        this.width = width;
        this.length = length;
    }
    setSpecialAttribute() {

        const specialAttributeForm = `
         <div class="form-row">
        <div class="col-4">
          <label for="height">Height (CM) </label>
        </div>
        <div class="col-8">
          <input id="height" class="form-control" type="text">
        </div>
      </div>
        <div class="form-row">
        <div class="col-4">
          <label for="width">Width (CM) </label>
        </div>
        <div class="col-8">
          <input id="width" class="form-control" type="text">
        </div>
      </div>
        <div class="form-row">
        <div class="col-4">
          <label for="length">Length (CM) </label>
        </div>
        <div class="col-8">
          <input id="length" class="form-control" type="text">
          <p>Please, provide dimensions in HxWxL format</p>
        </div>
      </div>
        `;
        Product.pushSpecialAttribute(specialAttributeForm);
    }
}
class UI {
    static DisplayProducts() {
        console.log('Product Displayed');
    }
    static addProduct() {
        let missingValue = ErrorHandler.missingValues();
        if (missingValue == false) {
            let validationError = ErrorHandler.validationErrors()
            if (validationError == false) {
                let SkuExcit = ErrorHandler.invalidSku()
                if (SkuExcit == false) {
                    alert('Done')
                } else {
                    alert('false');
                }
            } else {
                PushNotification.notification('VALIDATION_ERROR')
            }
        } else {
            PushNotification.notification('MISSING_VALUES')
        }

    }
    static deleteProduct() {
        console.log('Deleted');
    }

    static handleSpecialAttribute() {
        const DVD_SELECTION = 'DVD';
        const BOOK_SELECTION = 'Book';
        const FURNITURE_SELECTION = 'Furniture';
        let theProduct;
        const switcher = document.getElementById('productType');
        let selectedProductType = switcher.options[productType.selectedIndex].value;
        switch (selectedProductType) {
            case DVD_SELECTION:
                theProduct = new DVD();
                theProduct.setSpecialAttribute();
                break;
            case BOOK_SELECTION:
                theProduct = new Book();
                theProduct.setSpecialAttribute();
                break;
            case FURNITURE_SELECTION:
                theProduct = new Furniture();
                theProduct.setSpecialAttribute();
                break;
            default:
                Product.pushSpecialAttribute(' ');


        }
    }

}

class PushNotification {

    static notification(type) {

        switch (type) {
            case "MISSING_VALUES":

                new Notification('Missing Data', {
                    body: "Please, submit required data",
                    icon: "assets/images/favicon.png"
                });
                break;
            case "VALIDATION_ERROR":

                new Notification('Validation Error', {
                    body: "Please, provide the data of indicated type",
                    icon: "assets/images/favicon.png"

                });
                break;
            case "SKU_EXECIT":
                new Notification('SKU Already Excited', {
                    body: "Please, provide a unique SKU",
                    icon: "assets/images/favicon.png"

                });
                break;
            default:
        }
        return;
    }

}

class ErrorHandler {

    static missingValues() {
        let status = true;
        let inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            status = input.value === '' || inputs.length < 4 ? true : false;
        })

        return status;
    }
    static validationErrors() {
        let status = false;
        let inputs = ['price', 'size', 'weight', 'height', 'width', 'length'];
        for (let i = 0; i < inputs.length; i++) {
            let inputID = inputs[i];
            let inputEl = document.getElementById(inputID);
            if (inputEl != null)
                status = isNaN(inputEl.value) ? true : status;
        }

        return status;
    }
    static invalidSku() {

    }


}

//Store Class: Handle Storage


document.addEventListener('DOMContentLoaded', UI.DisplayProducts);

const saveBtn = document.getElementsByName('saveBtn')[0];
if (saveBtn != null)
    saveBtn.addEventListener('click', UI.addProduct);

const deleteBtn = document.getElementById('delete-product-btn');
if (deleteBtn != null)
    deleteBtn.addEventListener('click', UI.deleteProduct);

const switcher = document.getElementById('productType');
if (switcher != null)
    switcher.addEventListener('click', UI.handleSpecialAttribute);