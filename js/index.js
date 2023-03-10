var productNameInput = document.getElementById("productNameInp");
var productPriceInput = document.getElementById("productPriceInp");
var productCategoryInput = document.getElementById("productCategoryInp");
var productDescInput = document.getElementById("productDescInp");
var searchInput = document.getElementById("searchInp");
productsContainer = [];
var currentIndex = 0;
var validName = document.getElementById("validName");
var validPrice = document.getElementById("validPrice");
var validCategory = document.getElementById("validCategory");
var validDesc = document.getElementById("validDesc");
var productNameRegEx;
var productPriceRegEx;
var productCategoryRegEx;
var productDescRegEx;
console.log(
  productNameInput,
  productPriceInput,
  productCategoryInput,
  productDescInput
);
if (localStorage.getItem("products") != null) {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}
function addProduct() {
  if (
    validationProductName() == true &&
    validationProductPrice() == true &&
    validationProductCategory() == true &&
    validationProductDesc() == true
  ) {
    var products = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
    productsContainer.push(products);
    console.log(productsContainer);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    clearForm();
    displayProducts();
  }
}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
  validName.innerHTML = "";
  validPrice.innerHTML = "";
  validCategory.innerHTML = "";
  validDesc.innerHTML = "";
}

function displayProducts() {
  var container = "";
  for (var i = 0; i < productsContainer.length; i++) {
    container += `<tr>
        <td class="text-muted">${i + 1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm"><i class="fa-solid fa-trash-can"></i></button></td>
        <td><button onclick="getProduct(${i})" class="btn btn-outline-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = container;
}

function deleteProduct(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts();
}
function getProduct(updatedIndex) {
  currentIndex = updatedIndex;
  productNameInput.value = productsContainer[updatedIndex].name;
  productPriceInput.value = productsContainer[updatedIndex].price;
  productCategoryInput.value = productsContainer[updatedIndex].category;
  productDescInput.value = productsContainer[updatedIndex].desc;
  document.getElementById("update").classList.replace("d-none", "d-block");
  document.getElementById("add").classList.add("d-none");
}
function updateProduct() {
  var products = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productsContainer[currentIndex] = products;
  localStorage.setItem("products", JSON.stringify(productsContainer));
  clearForm();
  displayProducts();
  document.getElementById("update").classList.replace("d-block", "d-none");
  document.getElementById("add").classList.remove("d-none");
}
function searchProducts() {
  var searchTerm = searchInput.value;
  var container = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      container += `<tr>
    <td >${i}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].desc}</td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm"><i class="fa-solid fa-trash-can"></i></button></td>
    <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></button></td>
    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = container;
}

// function validationProductsForm() {
//   productNameRegEx = /^[A-Z][a-z]{3,8}$/;
//   productPriceRegEx = /^[0-9]+$/;
//   productCategoryRegEx = /^[a-z]{3,8}$/;
//   productDescRegEx = /^[a-z]{3,}$/;
//   if (productNameRegEx.test(productNameInput.value) == true) {
//     if (productPriceRegEx.test(productPriceInput.value) == true) {
//       if (productCategoryRegEx.test(productCategoryInput.value) == true) {
//         if (productDescRegEx.test(productDescInput.value) == true) {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     }
//   } else {
//     return false;
//   }
// }

function validationProductName() {
  productNameRegEx = /^[A-Z][a-z]+$/;

  if (productNameInput.value == "") {
    validName.innerHTML = "**Enter Your Product Name";
    return false;
  } else {
    if (productNameRegEx.test(productNameInput.value) == true) {
      validName.innerHTML = "";
      return true;
    } else {
      validName.innerHTML =
        " invalid Product Name [ starts with only one uppercase letter and other letters are lowercase without any spaces]";
      return false;
    }
  }
}

function validationProductPrice() {
  productPriceRegEx = /^[0-9]+$/;

  if (productPriceInput.value == "") {
    validPrice.innerHTML = "**Enter Your Product Price";
    return false;
  } else {
    if (productPriceRegEx.test(productPriceInput.value) == true) {
      validPrice.innerHTML = "";
      return true;
    } else {
      validPrice.innerHTML = " invalid Product price [ number only ]";
      return false;
    }
  }
}
function validationProductCategory() {
  productCategoryRegEx = /^[a-z]+$/;

  if (productCategoryInput.value == "") {
    validCategory.innerHTML = "**Enter Your Product Category";
    return false;
  } else {
    if (productCategoryRegEx.test(productCategoryInput.value) == true) {
      validCategory.innerHTML = "";
      return true;
    } else {
      validCategory.innerHTML =
        " invalid Product category [ starts with only lowercase letters without any spaces ]";
      return false;
    }
  }
}

function validationProductDesc() {
  productDescRegEx = /^[a-z]+$/;

  if (productDescInput.value == "") {
    validDesc.innerHTML = "**Enter Your Product Description";
    return false;
  } else {
    if (productDescRegEx.test(productDescInput.value) == true) {
      validDesc.innerHTML = "";
      return true;
    } else {
      validDesc.innerHTML =
        " invalid Product price [ starts with only lowercase letters without any spaces  ]";
      return false;
    }
  }
}
