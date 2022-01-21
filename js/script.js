let bstart = document.querySelector(".bstart"); //кнопка старта
let binput = document.querySelector(".binput"); //кнопка отправки формы
let brestart = document.querySelector(".brestart"); //кнопка занова уровень 1
let bgo = document.querySelector(".bgo"); //переход на уровень 2
let form = document.querySelector(".forma"); //форма
let kont = document.querySelector(".conteiner");
let numb1 = document.querySelector(".number1"); //1 задание
let numb2 = document.querySelector(".number2"); //2задание
let uname = document.querySelector(".user-name"); //имя пользователя
let perehod = document.querySelector(".perehod"); //переход
let perehod2 = document.querySelector(".perehod2"); //переход
let usname = "";
let flcol = document.querySelector(".flex-column"); //2задание
let res = document.querySelector(".res"); //2 задание

// старт
bstart.addEventListener("click", function () {
  bstart.classList.add("d-none");
  login();
});

// заполнение формы
binput.addEventListener("click", function () {
  if (uname.value === null || uname.value === "") {
    alert("Введи свое имя");
    return;
  }
  usname = uname.value;
  document.cookie = `username=${usname}`;
  console.log(getCookie("username"));
  form.classList.add("d-none");
  kont.classList.remove("d-none");
  //появляются рандомные картинки
  show_pictures1();
});

// типо возврат на предыдущий уровень
brestart.addEventListener("click", function () {
  perehod.classList.add("d-none");
  numb1.classList.remove("d-none");
  show_pictures1();
});

bgo.addEventListener("click", function () {
  console.log(numb2);
  perehod.classList.add("d-none");
  numb2.classList.remove("d-none");
  show_pictures2();
});

function login() {
  const u_l = getCookie("username");
  console.log(u_l);
  if (u_l === "" || u_l === undefined) {
    form.classList.remove("d-none");
  } else {
    usname = u_l;
    kont.classList.remove("d-none");
    show_pictures1();
  }
}

function show_pictures1() {
  let rand = Math.floor(Math.random() * questions1.length);
  const teg_div = document.createElement("div");
  numb1.innerHTML = `<h1>Уровень 1</h1>`;
  teg_div.innerHTML = `<h2>${uname.value}, ${questions1[rand].que}</h2>`;
  numb1.append(teg_div);
  let count = addImg(questions1[rand].key, numb1);

  // обработка клика по картинкам
  let dict_elem = document.querySelectorAll(".elem");
  let newcount = count;
  for (let i = 0; dict_elem.length > i; i++) {
    dict_elem[i].addEventListener("click", function () {
      if (this.getAttribute("data-text") === questions1[rand].key) {
        if (!this.classList.contains("true")) {
          newcount--;
          this.classList.add("true");
        }
      } else {
        this.classList.add("false");
      }
      if (newcount === 0) {
        numb1.classList.add("d-none");
        numb1.innerHTML = "";
        perehod.classList.remove("d-none");
      }
    });
  }
}

function show_pictures2() {
  let rand = Math.floor(Math.random() * questions1.length);
  const teg_div = document.createElement("div");
  flcol.innerHTML = `<h1>Уровень 2</h1>`;
  teg_div.innerHTML = `<h2>${uname.value}, ${questions1[rand].que}</h2>`;
  flcol.append(teg_div);
  let count = addImg(questions1[rand].key, flcol);

  //обработка перетаскивания
  let dict_elem = document.querySelectorAll(".elem");
  let flel = document.querySelector(".flex-wrap");
  let newcount = count;
  // Перебираем все элементы списка и присваиваем нужное значение
  for (const task of dict_elem) {
    task.draggable = true;
  }

  flel.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  });

  res.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });

  res.ondragover = allowDrop;
  function allowDrop(event) {
    event.preventDefault();
  }

  res.ondrop = drop;
  function drop(event) {
    event.target.append(document.querySelector(".selected"));
  }

  let bresultat = document.querySelector(".resultat");
  bresultat.addEventListener("click", function () {
    let itemRes = document.querySelectorAll(".res > .elem");
    console.log(itemRes);
    let newcounter = 0;
    for (let i = 0; i < itemRes.length; i++) {
      if (itemRes[i].getAttribute("data-text") === questions1[rand].key) {
        newcounter++;
      }
      if (newcounter === count) {
        numb2.classList.add("d-none");
        numb2.innerHTML = "";
        perehod2.classList.remove("d-none");
      }
    }
  });
}

function addImg(val, tegd) {
  const tdiv = document.createElement("div");
  tdiv.classList.add("flex-wrap");
  let count = 0;
  let elemmass = [];
  for (let i = 1; i <= 9; i++) {
    let rand2 = Math.floor(Math.random() * mass.length);
    let huy = mass[rand2].name;
    elemmass.push(huy);

    let getelem = true;
    let k = 0;
    for (let j = 0; j < elemmass.length; j++) {
      if (elemmass[j] === huy) {
        k++;
        if (k > 1) {
          getelem = false;
          break;
        }
      }
    }

    if (getelem === false) {
      elemmass.pop();
      i--;
      continue;
    } else {
      let mastype = mass[rand2].type;
      if (mastype === val) count++;

      const tdiv2 = document.createElement("div");
      tdiv2.classList.add("elem");
      tdiv2.setAttribute("data-text", mastype);
      tdiv2.style.backgroundImage = `url('${mass[rand2].img}')`;
      //tdiv2.innerHTML = `<img src="${mass[rand2].img}">`;
      tdiv.append(tdiv2);
    }
  }
  if (count < 3) return addImg(val, tegd);
  tegd.append(tdiv);
  return count;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let mass = [
  {
    name: "юла",
    img: "img/юла.jpg",
    type: "игрушки",
  },
  {
    name: "бананы",
    img: "img/бананы.jpg",
    type: "еда",
  },
  {
    name: "ботинки",
    img: "img/ботинки.jpg",
    type: "одежда",
  },
  {
    name: "варежки",
    img: "img/варежки.jpg",
    type: "одежда",
  },
  {
    name: "комбенизон",
    img: "img/комбез.jpg",
    type: "одежда",
  },
  {
    name: "конфета",
    img: "img/конфета.jpg",
    type: "еда",
  },
  {
    name: "корова",
    img: "img/корова.jpg",
    type: "животные",
  },
  {
    name: "кот",
    img: "img/кот.jpg",
    type: "животные",
  },
  {
    name: "кукла",
    img: "img/кукла.jpg",
    type: "игрушки",
  },
  {
    name: "машина",
    img: "img/машина.jpg",
    type: "транспорт",
  },
  {
    name: "мышка",
    img: "img/мышка.jpg",
    type: "животные",
  },
  {
    name: "мяч",
    img: "img/мяч.jpg",
    type: "игрушки",
  },
  {
    name: "паровоз",
    img: "img/паровоз.jpg",
    type: "транспорт",
  },
  {
    name: "пирамидка",
    img: "img/пирамидка.jpg",
    type: "игрушки",
  },
  {
    name: "самолет",
    img: "img/самолет.jpg",
    type: "транспорт",
  },
  {
    name: "слон",
    img: "img/слон.jpg",
    type: "животные",
  },
  {
    name: "торт",
    img: "img/торт.jpg",
    type: "еда",
  },
  {
    name: "трактор",
    img: "img/трактор.jpg",
    type: "транспорт",
  },
  {
    name: "хлеб",
    img: "img/хлеб.jpg",
    type: "еда",
  },
  {
    name: "шляпа",
    img: "img/шляпа.jpg",
    type: "одежда",
  },
];

let questions1 = [
  {
    key: "одежда",
    que: "выбери все картинки на тему ОДЕЖДА",
  },
  {
    key: "животные",
    que: "выбери все картинки на тему ЖИВОТНЫЕ",
  },
  {
    key: "транспорт",
    que: "выбери все картинки на тему ТРАНСПОРТ",
  },
  {
    key: "игрушки",
    que: "выбери все картинки на тему ИГРУШКИ",
  },
  {
    key: "еда",
    que: "выбери все картинки на тему ЕДА",
  },
];
