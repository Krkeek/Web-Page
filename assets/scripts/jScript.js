class Product {
    sku;
    name;
    price;
    type;

}
class DVD extends Product {
    size;
    specialAttribute = `
            <div class="form-row">
                <div class="col-4">
                  <label for="size">Size (MB) </label>
                </div>
                <div class="col-8">
                  <input id="size" class="form-control" type="text">
                  <p>Please, provide size in CM</p>
                </div>
              </div>
        `;

}
class Book extends Product {
    weight;
    specialAttribute = `
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

}
class Furniture extends Product {
    height;
    width;
    lenght;
    specialAttribute = `
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


}

class SpecialAttributeSetup {

    updateSpecialAttributeRow() {
        const app = new App();
        let theProduct = '';
        let selectedProductType = productType.options[productType.selectedIndex].value;
        switch (selectedProductType) {
            case app.DVD_SELECTION:
                theProduct = new DVD();
                break;
            case app.BOOK_SELECTION:
                theProduct = new Book();
                break;
            case app.FURNITURE_SELECTION:
                theProduct = new Furniture();
                break;
            default:
                app.specialAttributeRow.innerHTML = '';
                return;
        }
        app.specialAttributeRow.innerHTML = theProduct.specialAttribute;

    }


}
class SaveProduct {

    MISSING_VALUES = 'MISSING_VALUES';
    VALIDATION_ERROR = 'VALIDATION_ERROR';
    SKU_EXECIT = 'SKU_EXECIT';

    checkMissingValues() {
        let noVErrors = true;
        let noErrors = true;
        let noXErrors = true;
        const EMPTY_FIELD = '';
        const NOT_SET = 'NOT_SET';
        const pushNotification = new PushNotification();
        const saveProduct = new SaveProduct();
        const app = new App();
        var sku = document.getElementById('sku').value;
        var name = document.getElementById('name').value;
        var price = document.getElementById('price').value;
        var size = NOT_SET;
        var weight = NOT_SET;
        var length = NOT_SET;
        var width = NOT_SET;
        var height = NOT_SET;

        if (document.getElementById('size') != null)
            size = document.getElementById('size').value;
        if (document.getElementById('weight') != null)
            weight = document.getElementById('weight').value;
        if (document.getElementById('length') != null)
            length = document.getElementById('length').value;
        if (document.getElementById('width') != null)
            width = document.getElementById('width').value;
        if (document.getElementById('height') != null)
            height = document.getElementById('height').value;

        if (length === NOT_SET &&
            width === NOT_SET &&
            height === NOT_SET &&
            size === NOT_SET &&
            weight === NOT_SET) {
            pushNotification.pushNotification(saveProduct.MISSING_VALUES);
            noErrors = false;

        } else if (size === NOT_SET && weight === NOT_SET) {
            if (sku === EMPTY_FIELD ||
                name === EMPTY_FIELD ||
                price === EMPTY_FIELD ||
                length === EMPTY_FIELD ||
                width === EMPTY_FIELD ||
                height === EMPTY_FIELD
            ) {
                pushNotification.pushNotification(saveProduct.MISSING_VALUES);
                noErrors = false;
            }
        } else if (length === NOT_SET && width === NOT_SET && height === NOT_SET) {

            if (size === NOT_SET) {
                if (sku === EMPTY_FIELD ||
                    name === EMPTY_FIELD ||
                    price === EMPTY_FIELD ||
                    weight === EMPTY_FIELD
                ) {
                    pushNotification.pushNotification(saveProduct.MISSING_VALUES);
                    noErrors = false;
                }
            } else if (weight === NOT_SET) {
                if (sku === EMPTY_FIELD ||
                    name === EMPTY_FIELD ||
                    price === EMPTY_FIELD ||
                    size === EMPTY_FIELD
                ) {
                    pushNotification.pushNotification(saveProduct.MISSING_VALUES);
                    noErrors = false;
                }
            }



        }
        if (noErrors == true) {




            if (size === NOT_SET && weight === NOT_SET) {
                if (isNaN(price) ||
                    isNaN(length) ||
                    isNaN(width) ||
                    isNaN(height)
                ) {
                    pushNotification.pushNotification(saveProduct.VALIDATION_ERROR);
                    noVErrors = false;

                }
            } else if (length === NOT_SET && width === NOT_SET && height === NOT_SET) {

                if (size === NOT_SET) {
                    if (isNaN(price) ||
                        isNaN(weight)
                    ) {
                        pushNotification.pushNotification(saveProduct.VALIDATION_ERROR);
                        noVErrors = false;


                    }
                } else if (weight === NOT_SET) {
                    if (isNaN(price) ||
                        isNaN(size)
                    ) {
                        pushNotification.pushNotification(saveProduct.VALIDATION_ERROR);
                        noVErrors = false;


                    }
                }

            }

            if (noVErrors == true) {
                var z = 'false';
                let ajax = new XMLHttpRequest();
                let method = "GET";
                let url = "assets/backend/server.php?checkSKU=checkSKU&sku=" + sku;
                let asynchronous = true;
                ajax.open(method, url, asynchronous);
                ajax.send();
                ajax.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        let status = JSON.parse(this.responseText);
                        let statusResult = status.ss;
                        if (statusResult === true) {

                            pushNotification.pushNotification(saveProduct.SKU_EXECIT);

                        } else {
                            let finalType = size === NOT_SET && weight === NOT_SET ? `${app.FURNITURE_SELECTION}` : " ";
                            finalType = length === NOT_SET && width === NOT_SET && height === NOT_SET ? size === NOT_SET ? `${app.BOOK_SELECTION}` : `${app.DVD_SELECTION}` : `${app.FURNITURE_SELECTION}`;


                            let ajax2 = new XMLHttpRequest();
                            let method2 = "GET";
                            let url2 = "assets/backend/server.php?addProduct=addProduct&sku=" + sku + "&name=" + name + "&price=" + price + "&size=" + size + "&weight=" + weight + "&length=" + length + "&width=" + width + "&height=" + height + "&finalType=" + finalType;
                            let asynchronous2 = true;
                            ajax2.open(method2, url2, asynchronous2);
                            ajax2.send();
                            ajax2.onreadystatechange = function() {
                                if (this.readyState === 4 && this.status === 200) {
                                    window.location.href = "index.php";
                                }

                            }

                        }


                    }
                }

            }

        }

    }
}


class PushNotification {
    saveProduct = new SaveProduct();
    pushNotification(type) {

        switch (type) {
            case "MISSING_VALUES":

                const notification1 = new Notification('Missing Data', {
                    body: "Please, submit required data",
                    icon: "assets/images/favicon.png"
                });
                notification1.onClick = (e) => {
                    window.location.href = "#";
                };
                break;
            case "VALIDATION_ERROR":

                const notification2 = new Notification('Validation Error', {
                    body: "Please, provide the data of indicated type",
                    icon: "assets/images/favicon.png"

                });
                notification2.onClick = (e) => {
                    window.location.href = "#";
                };
                break;
            case "SKU_EXECIT":
                const notification3 = new Notification('SKU Already Excited', {
                    body: "Please, provide a unique SKU",
                    icon: "assets/images/favicon.png"

                });
                notification3.onClick = (e) => {
                    window.location.href = "#";
                };
                break;
            default:
        }

    }

}

class ProductList {

    showProductList() {

        if (document.getElementById('product_list_container') != null) {


            var prodContainer = document.getElementById('product_list_container');
            prodContainer.innerHTML = '';
            let prodBox1 = ` `;
            let prodBox2 = ` `;
            let prodBox3 = ` `;

            let ajax = new XMLHttpRequest();
            let method = "GET";
            let url = "assets/backend/server.php?showProductList=showProductList";
            let asynchronous = true;
            ajax.open(method, url, asynchronous);
            ajax.send();
            ajax.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    let ProductLists = JSON.parse(this.responseText);
                    let ProdListDVD = ProductLists.dataDVD;
                    let ProdListBook = ProductLists.dataBook;
                    let ProdListFurniture = ProductLists.dataFurniture;

                    for (let a = 0; a < ProdListDVD.length; a++) {
                        let sku = ProdListDVD[a].sku;
                        let name = ProdListDVD[a].name;
                        let price = ProdListDVD[a].price;
                        let type = ProdListDVD[a].type;
                        let size = ProdListDVD[a].price;


                        prodBox1 = `
                <div class="container prodContainer">
            <div class="row">
                <div class="col">
                    <input id='${sku}' type="checkbox" class = 'delete-checkbox'>
                </div>
            </div>
            <div class="row prodRow">
                <div class="col prodCol">
                    ${sku}
                </div>
            </div>
            <div class="row">
                <div class="col prodCol">
                    ${name}
                </div>
            </div>
            <div class="row">
                <div class="col prodCol">
                    ${price} $
                </div>
            </div>
            <div class="row">
                <div id='SA' class="col prodCol">
                   Size: ${size} MB
                </div>
            </div>

        </div>
           `;


                        prodContainer.innerHTML += prodBox1;
                    }

                    for (let a = 0; a < ProdListBook.length; a++) {
                        let sku = ProdListBook[a].sku;
                        let name = ProdListBook[a].name;
                        let price = ProdListBook[a].price;
                        let type = ProdListBook[a].type;
                        let weight = ProdListBook[a].weight;

                        prodBox2 = `
                <div class="container prodContainer">
            <div class="row">
                <div class="col">
                    <input id='${sku}' type="checkbox" class = 'delete-checkbox'>
                </div>
            </div>
            <div class="row prodRow">
                <div class="col prodCol">
                    ${sku}
                </div>
            </div>
            <div class="row">
                <div class="col prodCol">
                    ${name}
                </div>
            </div>
            <div class="row">
                <div class="col prodCol">
                    ${price} $
                </div>
            </div>
            <div class="row">
                <div id='SA' class="col prodCol">
                   Weight: ${weight} KG
                </div>
            </div>

        </div>
           `;
                        prodContainer.innerHTML += prodBox2;
                    }
                    for (let a = 0; a < ProdListFurniture.length; a++) {
                        let sku = ProdListFurniture[a].sku;
                        let name = ProdListFurniture[a].name;
                        let price = ProdListFurniture[a].price;
                        let type = ProdListFurniture[a].type;
                        let length = ProdListFurniture[a].length;
                        let width = ProdListFurniture[a].width;
                        let height = ProdListFurniture[a].height;

                        prodBox3 = `
                <div class="container prodContainer">
            <div class="row">
                <div class="col">
                    <input id='${sku}' type="checkbox" class = 'delete-checkbox'>
                </div>
            </div>
            <div class="row prodRow">
                <div class="col prodCol">
                    ${sku}
                </div>
            </div>
            <div class="row">
                <div class="col prodCol">
                    ${name}
                </div>
            </div>
            <div class="row">
                <div class="col prodCol">
                    ${price} $
                </div>
            </div>
            <div class="row">
                <div id='SA' class="col prodCol">
                   Dimenions: ${width}x${length}x${height} 
                </div>
            </div>

        </div>
           `;
                        prodContainer.innerHTML += prodBox3;
                    }

                }







            }

        }

    }
}
class DeleteProduct {

    deleteAction() {
        const productList = new ProductList();
        let checkBoxes = document.querySelectorAll('.delete-checkbox');
        let checkedBoxes = Array();
        for (let checkBox of checkBoxes) {
            if (checkBox.checked == true) {

                checkedBoxes.push(checkBox.id);
            }
        }


        $.ajax({
            url: "assets/backend/server.php",
            method: "POST",
            data: { deleteAction: 'deleteAction', checkedBoxes: checkedBoxes },
            success: function(res) {


                productList.showProductList();
            },
        });





    }

}

class App {
    DVD_SELECTION = 'DVD';
    BOOK_SELECTION = 'Book';
    FURNITURE_SELECTION = 'Furniture';
    specialAttributeRow = document.getElementById('special_attribute_row');

    static init() {
        const deleteProduct = new DeleteProduct();
        const productList = new ProductList();
        productList.showProductList();
        Notification.requestPermission();
        const specialAttributeSetup = new SpecialAttributeSetup();
        const saveProduct = new SaveProduct();
        if (document.getElementById('productType') != null)
            document.getElementById('productType').addEventListener('change', specialAttributeSetup.updateSpecialAttributeRow);

        if (document.getElementsByName('saveBtn')[0] != null) {
            document.getElementsByName('saveBtn')[0].addEventListener('click', saveProduct.checkMissingValues);
        }
        if (document.getElementById('delete-product-btn') != null)
            document.getElementById('delete-product-btn').addEventListener('click', deleteProduct.deleteAction);


    }

}
App.init();


var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.body.appendChild(script);