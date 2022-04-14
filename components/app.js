// Accesing DDOM element

const form = document.querySelector("form");
const input = document.querySelector("#textInput");
const list = document.querySelector("#list");

//  display item on the loaded page

window.addEventListener("DOMContentLoaded", setupItems);

form.addEventListener("submit", addItem);

// input main array

cart = [];
editElement = "";
editId = "";
editFlag = false;

// display item

function addItem(e) {
    e.preventDefault();
    var inputText = {};
    let value = input.value;
    const id = new Date().getTime().toString();
    let isCompleted = false;
    if (value.trim() !== "" && !editFlag) {
        const element = document.createElement("li");
        const attr = document.createAttribute("data-id");
        element.setAttributeNode(attr);
        attr.value = id;

        element.innerHTML = `<p class="title">${value}</p>
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>        
        <button type="button" id="deleteButton"  class="btn-close"></button>`;

        ALERT.innerHTML = displayAlert(
            "Başarılı Ekleme :) ",
            "Ekleme işlemi tamamlandı.. Lütfen eklemenizi unutmayın ve tamamlamaya çalışın. Kalbim sizinle güç bizimle ! olsun ",
            "success"
        );

        list.appendChild(element);
        inputText.value = value;
        inputText.id = id;
        inputText.isCompleted = isCompleted;
        cart.push(inputText);
        // console.log(cart);

        addToLocalStorage(inputText);

        setBackDefault();
    } else if (value.trim() !== "" && editFlag) {
        editElement.innerHTML = value;

        // edit local storage
        editLocalStorage(editID, value);

        setBackDefault();
    } else {
        ALERT.innerHTML = displayAlert(
            "Hatalı Ekleme!   ",
            "Boş ekleme yapamazsınız. Lütfen ekleme yapmak istediğiniz içeriği belirtilen alana yazarak gönderiniz !",
            "danger"
        );
    }
}

// display alert
const ALERT = document.querySelector(".alert");

const displayAlert = (title, message, className) => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong>${message}<button type="button" class="btn-close" id="alert-close-button" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;

// alert close button

const alertBtn = document.querySelector("#alert-close-button");
ALERT.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-close")) {
        const item = e.target.parentElement;
        ALERT.removeChild(item);
    }
});

// list click event


list.addEventListener("click", function (e) {
    // console.log(e.target);
    if (e.target.tagName === "LI" && e.target.dataset.id !== "") {
        e.target.classList.toggle("checked");
        console.log(e.target);

    } else if (e.target.classList.contains("btn-close")) {
        const element = e.target.parentElement;
        const id = element.dataset.id;
        list.removeChild(element);
        removeFromLocalStorage(id);
        setBackDefault();
    } else {
        const element = e.target.parentElement;

        // set edit item

        editElement = e.target.parentElement.previousElementSibling;

        // set form value

        input.value = editElement.innerHTML;

        editFlag = true;

        editID = element.parentElement.dataset.id;
        // submitBtn.textContent = "Edit Text";
    }
});

// set back default

const setBackDefault = () => {
    input.value = "";
};

// ***************** LOCALSTORAGE **************//

// get local storage item

function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

// add localstorage

function addToLocalStorage(inputText) {
    const temp = { inputText };
    let items = getLocalStorage();
    items.push(temp);
    localStorage.setItem("list", JSON.stringify(items));
}

// remove localstorage item

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    // localstorage arrayimize gidiyor benim silmek istediğim id ile localstorage'te eşleşen id varsa o zaman if'e girmiyor. İf'içine girenler benim tıkladığım id ile alakası olmayan diğer itemlar. Alakası olmayan itemları = items'a eşitliyorum ve setlocalStorage yapıp tekrar gönderiyorum

    items = items.filter(function (item) {
        if (item.inputText.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}

// edit localstorage item

function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.inputText.id == id) {
            item.inputText.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// edit local storage item isCompleted True

function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.inputText.id == id) {
            item.inputText.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

//  setup items for window loaded

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach((item) => {
            createListItem(item.inputText.value, item.inputText.id);
        });
    }
    // console.log(items);
}

// creating list element content

function createListItem(value, id) {
    const element = document.createElement("li");
    const attr = document.createAttribute("data-id");
    element.setAttributeNode(attr);
    attr.value = id;

    element.innerHTML = `<p class="title">${value}</p>
    <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>        
    <button type="button" id="deleteButton"  class="btn-close"></button>`;
    list.appendChild(element);
}
