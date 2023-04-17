let tmp;
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let submit = document.getElementById("submit");
let total = document.getElementById("total");
let mode = "create";
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#060";
    total.style.color = "#fff";
  } else {
    total.innerHTML = "";
    total.style.background = "#222";
    total.style.color = "#222";
  }
}
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    catagory: catagory.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && catagory.value != "") {
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < count.value; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }


  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);
  clearInputs();
  showDate();
};

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.background = "#222";
  total.style.color = "#222";
  count.value = "";
  catagory.value = "";
}

function showDate() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `     
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catagory}</td>
        <td><button onclick='updatedata(${i})' id="update">Update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick='deleteAll()'>Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showDate();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showDate();
}
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showDate();
}

function updatedata(i) {
  mode = "update";
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  catagory.value = dataPro[i].catagory;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "catagory";
    search.placeholder = "Search By Catagory";
  }
  search.focus();
  search.value = "";
  showDate();
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `     
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catagory}</td>
        <td><button onclick='updatedata(${i})' id="update">Update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
    </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].catagory.includes(value.toLowerCase())) {
        table += `     
      <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].catagory}</td>
          <td><button onclick='updatedata(${i})' id="update">Update</button></td>
          <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
      </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
