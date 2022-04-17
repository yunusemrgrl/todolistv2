// Accesing DDOM element

const form = document.querySelector("form");
const input = document.querySelector("#textInput");
const list = document.querySelector("#list");
const footerContent = document.querySelector("#footer-content")
const footerBtn = document.querySelectorAll(".footer-button")

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
        setTimeout(() => {
            ALERT.innerHTML = "";
        }, 2000);

        list.appendChild(element);
        inputText.value = value;
        inputText.id = id;
        inputText.isCompleted = isCompleted;
        cart.push(inputText);
        // console.log(cart);

        footerContent.classList.remove("invisible")

        addToLocalStorage(inputText);

        setBackDefault();
        showItemLeft();
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
        setTimeout(() => {
            ALERT.innerHTML = "";
        }, 2000);

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
    if (e.target.tagName === "LI" && e.target.dataset.id !== "" && e.target.tagName !== "I") {

        e.target.classList.toggle("checked");
        console.log(e.target);
        const element = e.target;
        const id = element.dataset.id;
        editLocalStorageIsComplete(id)


    } else if (e.target.classList.contains("btn-close")) {
        const element = e.target.parentElement;
        const id = element.dataset.id;
        list.removeChild(element);
        removeFromLocalStorage(id);
        setBackDefault();
        closeFooterContent()


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
    showItemLeft();
});

// set back default

const setBackDefault = () => {
    input.value = "";
    editElement = "";
    editId = "";
    editFlag = false;
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

function editLocalStorageIsComplete(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.inputText.id == id) {
            if (item.inputText.isCompleted == false) {
                item.inputText.isCompleted = true;
            } else {
                item.inputText.isCompleted = false;
            }

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
            createListItem(item.inputText.value, item.inputText.id, item.inputText.isCompleted);
            footerContent.classList.remove("invisible");


        });
    }
    // console.log(items);
}

// creating list element content

function createListItem(value, id, isCompleted) {
    const element = document.createElement("li");
    const attr = document.createAttribute("data-id");
    element.setAttributeNode(attr);
    attr.value = id;

    element.innerHTML = `<p class="title">${value}</p>
    <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>        
    <button type="button" id="deleteButton"  class="btn-close"></button>`;
    list.appendChild(element);
    if (isCompleted == true) {
        element.classList.add("checked")
    }
    showItemLeft();
}

// invisible footer content ? list item lenght = 0 

function closeFooterContent() {
    let items = getLocalStorage();
    if (items.length == 0) {
        footerContent.classList.add("invisible")
    }
}

// ************ footer button add event listener *************

footerBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        items = getLocalStorage()
        if (e.target.value == "completed") {
            const newItem = items.filter((item) => {
                if (item.inputText.isCompleted == true) {
                    return item

                }
            });
            list.innerHTML = "";
            setupFilterItems(newItem)

        } else if (e.target.value == "active") {
            const activeItem = items.filter((item) => {
                if (item.inputText.isCompleted == false) {
                    return item
                }
            });
            list.innerHTML = "";
            setupFilterItems(activeItem);
        } else if (e.target.value == "all") {

            list.innerHTML = "";
            setupFilterItems(items);
        } else {
            const newItem = items.filter((item) => {
                if (item.inputText.isCompleted == true) {

                    console.log(item.inputText.id);
                    list.innerHTML = "";
                    removeFromLocalStorage(item.inputText.id);
                    window.location.reload();

                }
            });
        }
        showItemLeft();
    });
});


function setupFilterItems(checkedItems) {
    const items = checkedItems
    if (items.length > 0) {
        items.forEach((item) => {
            createFilterListItem(item.inputText.value, item.inputText.id, item.inputText.isCompleted);
            footerContent.classList.remove("invisible")

        });
    }
    // console.log(items);
}

// creating list element content

function createFilterListItem(value, id, isCompleted) {
    const element = document.createElement("li");
    const attr = document.createAttribute("data-id");
    element.setAttributeNode(attr);
    attr.value = id;

    element.innerHTML = `<p class="title">${value}</p>
    <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>        
    <button type="button" id="deleteButton"  class="btn-close"></button>`;
    list.appendChild(element);
    if (isCompleted == true) {
        element.classList.add("checked")
    }
}

const itemLeft = document.querySelector(".text-secondary")

function showItemLeft() {
    let tmp = 0;
    const items = getLocalStorage()
    if (items.length > 0) {
        items.forEach((item) => {
            if (item.inputText.isCompleted == false) {
                tmp++
            };
        });
    }
    itemLeft.innerHTML = `${tmp} item left`
}
// showItemLeft();

const checkedAllItems = document.querySelector("#checkedAll")

checkedAllItems.addEventListener("click", () => {

    checkedAll()
})

function checkedAll() {
    const items = getLocalStorage()

    if (items.length > 0) {

        items.forEach((item) => {
            item.inputText.isCompleted = true;
            if (item.inputText.isCompleted == true) {
                item.inputText.isCompleted = false;
            }
        });
        localStorage.setItem("list", JSON.stringify(items));
        window.location.reload()
    }
}