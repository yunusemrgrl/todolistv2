const form = document.querySelector("form");
const input = document.querySelector("#textInput");
const list = document.querySelector("#list");



window.addEventListener("DomContentLoaded", function () {

})


form.addEventListener("submit", addItem);



// key
cart = [];

function addItem(e) {
    e.preventDefault();
    var inputText = {};
    let value = input.value;
    const id = new Date().getTime().toString();
    let isCompleted = false
    if (value.trim() !== "") {

        const element = document.createElement("li");
        const attr = document.createAttribute("data-id");
        element.setAttributeNode(attr);
        attr.value = id;
        list.appendChild(element);
        element.innerHTML = `<p class="title">${value}</p>        
           <button type="button" id="deleteButton"  class="btn-close"></button>`;
        ALERT.innerHTML = displayAlert(
            "Başarılı Ekleme :) ",
            "Ekleme işlemi tamamlandı.. Lütfen eklemenizi unutmayın ve tamamlamaya çalışın. Kalbim sizinle güç bizimle ! olsun ",
            "success"
        )

        inputText.value = value;
        inputText.id = id;
        inputText.isCompleted = isCompleted;
        cart.push(inputText);
        console.log(cart);


        setBackDefault();
    } else {
        ALERT.innerHTML = displayAlert(
            "Hatalı Ekleme!   ",
            "Boş ekleme yapamazsınız. Lütfen ekleme yapmak istediğiniz içeriği belirtilen alana yazarak gönderiniz !",
            "danger"

        )
    }
}


const setBackDefault = () => {
    input.value = "";
};
// display alert function
const ALERT = document.querySelector(".alert")

const displayAlert = (title, message, className) => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong>${message}<button type="button" class="btn-close" id="alert-close-button" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`
const alertBtn = document.querySelector("#alert-close-button")

ALERT.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-close")) {
        const item = e.target.parentElement;
        ALERT.removeChild(item);
    }
})

const completedArr = [];

// list item event 
list.addEventListener("click", function (e) {
    // console.log(e.target);
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
    }
    else if (e.target.classList.contains("btn-close")) {
        const element = e.target.parentElement
        list.removeChild(element);
    }
});

const completedItem = document.querySelector("#display-completed-item");

const completed = document.querySelector(".completed");