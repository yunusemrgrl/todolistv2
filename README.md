# TODOLIST APP
## Hakkında
Bugüne kadar öğrenmiş olduğum bütün javascript bilgilerimi kullanabileceğim bir app.js uygulaması geliştirmek istedim. <br>
Aklıma **DOM manipülasyonu** olan, **CLİCK EVENT** gerçekleşebileceği, **ADD EVENT LİSTENER** işlemleri içeren ve **LOCALSTORAGE**'de veri tutabileceğim <br> **TODOLIST** uygulaması geldi.
Projede kodları yazarken açıklama satırları kullanmaya ve HTML kısmında sementic bir iskelet kurmaya çalıştım. <br>



## [Todolist App Demo](https://yunusemrgrl.github.io/index.html)

* DOM manipülasyonu 
HTML taglerine erişim
 ``` 
const form = document.querySelector("form");
const input = document.querySelector("#textInput");
const list = document.querySelector("#list");
const footerContent = document.querySelector("#footer-content")
const footerBtn = document.querySelectorAll(".footer-button")
const submitBtn = document.querySelector("#button-addon2")
```
* addEventListener

Sayfa ilk yüklendiğinde **localstorage**' de tutulan bilgilerin ekrana yazmasını sağlayan ve form submit edildiğinde verileri gönderen fonksiyon
 ```
window.addEventListener("DOMContentLoaded", setupItems);
form.addEventListener("submit", addItem);
 ```
 * Alert ("success", "danger")
 Kullanıcıdan bilgi alındıktan sonra eğer içi boş bir bilgiysa hata alarmı doğruysa item eklendi alarmı kullanıldı 
 ```
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
 ```
 * Creat list element item 
 HTML'de ul nin içindeki inputun value değerini text olarak li tag'ina yazan eğer isCompleted olarak işaretlenmişse işaretli şekilde getiren fonksiyon daha sonra bu fonksiyonu kullandım.
 ```
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
```
* Setup item
localstorage'de items lenght 0 dan büyükse içindeki herbir item ı **foreach** metoduyla create ediyor. Footer daki butonlar da visible oluyor.
```
//  setup items for window loaded

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach((item) => {
            createListItem(item.inputText.value, item.inputText.id, item.inputText.isCompleted);
            footerContent.classList.remove("invisible");


        });
    }
}
```
* Footer buttons click event
 Butonlara clicklenmesiyle itemların filtrelenmesi. Tek tek her butona değil foreach ile tek seferde butun butonlara erişim sağladıktan sonra getlocalstorage fonksiyonuyla itemlar çağırılıp eğer tıklanılan butonun name değeri ile içeriği uyuşuyorsa list.innerhtml sıfırlanıyor daha sonrasında eğer tamamlanmış bir tasksa isCompleted true olanlar geliyor. True ve false olması durumda gerekli sorgulardan geçtikten sonra list.innerHTML de listeleniyorlar. Tamamlanan öğeler silinmek istiyorsa gelen itemler idlerine göre tekrar removelocalstorage fonksiyonuna gidip orda siliniyorlar
```
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

```
* Kaç tane tamamlanmamış task kaldığını gösteren fonksiyon
Burada localstorage içinde gezip geçici bir değeri tamamlanmamış task gördüğü zaman 1 arttırıyorum. En son da bunu HTML sayfasına innerHTML koduyla yazdırıyorum. Dinamik olarak her click eventine çalışıyor.

```
// show how many items left 

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
```
* Checkbox içim **every()* operands'ını kullandım eğer true dönerse hepsini isCompleted = !isCompleted ile değiştiriyor bu şekilde bir nevi toggle görevi görüyor
eğer false ise hepsini true yapıyor bu şekilde bir for döngüsü elde ediyorum.
```
checkedAllItems.addEventListener("click", (e) => {
    e.preventDefault();
    checkedAll()
})

function checkedAll() {
    const items = getLocalStorage()
    const every = items.every((item) => item.inputText.isCompleted == true)
    if (items.length > 0) {



        if (every) {
            items.map((item) => {
                item.inputText.isCompleted = !item.inputText.isCompleted;
            })
        }
        else {
            items.map((item) => {
                item.inputText.isCompleted = true;
            })
        }

        localStorage.setItem("list", JSON.stringify(items));
        window.location.reload()


    }

}
```
* **LOCALSTORAGE** fonksiyonları
```
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
```

