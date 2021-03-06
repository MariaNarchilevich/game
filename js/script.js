let button_start = document.querySelector(".bstart"); //кнопка старта
let binput_form = document.querySelector(".binput"); //кнопка отправки формы
let breturn = document.querySelector(".breturn"); //кнопка возврат уровень
let bgo = document.querySelector(".bgo"); //кнопка переход на уровень
let brest_ur = document.querySelector(".brestart-ur"); //кнопка рестарта уровня 
let bresultat2 = document.querySelector(".bresultat2");
let bresultat3 = document.querySelector(".bresultat3");
let b_end = document.querySelector(".b-end");

let form = document.querySelector(".forma"); //форма
let kont = document.querySelector(".conteiner"); //фон заданий
let numb1 = document.querySelector(".number1"); //1 задание
let numb2 = document.querySelector(".number2"); //2задание
let numb3 = document.querySelector(".number3"); //2задание

let uname = document.querySelector(".user-name"); //имя пользователя

let start_str = document.querySelector(".start-str");
let perehod = document.querySelector(".perehod"); //переход
let num2_task = document.querySelector(".flex-column"); //2задание
let num2_res = document.querySelector(".res"); //2 задание
let num3_task = document.querySelector(".flex-column3"); //3задание
let num3_res = document.querySelector(".res3"); //3 задание

let game_end = document.querySelector(".game-end");

let user_cscore = 0;
let user_cscore_ur = 0;
let score_shtraf = 0;

let section_ball = document.querySelector(".user-score");

const ball2 = document.createElement("div");
ball2.classList.add("score2");

const ball = document.createElement("div");
ball.classList.add("score");

// вспомогательные переменные
let k = 0;
let rand = 0;
let count = 0;


//изменение темы
$(document).ready(function(){
  $('.theme-button').click(function(event){
      $('.conteiner').toggleClass('dr-color-c');
      $('body').toggleClass('dr-color-b');
  });
});

// старт
button_start.addEventListener("click", function () {
  start_str.classList.add("d-none");
  form.classList.remove("d-none");
});

// заполнение формы
binput_form.addEventListener("click", function () {
  if (uname.value === null || uname.value === "") {
    alert("Нужно обязательно ввести своё имя)");
    return;
  }
  form.classList.add("d-none");
  kont.classList.remove("d-none");
  brest_ur.classList.remove("d-none");
  section_ball.classList.remove("d-none");
  section_ball.append(ball);
  section_ball.append(ball2);
  //появляется первый уровень
  show_pictures1();
});

// рестарт уровень
brest_ur.addEventListener("click", function () {
  if (document.querySelector(".number1.d-none") === null) {
    show_pictures1();
  }
  if (document.querySelector(".number2.d-none") === null) {
    num2_res.innerHTML = "";
    num2_task.innerHTML = "";
    bresultat2.removeEventListener("click", f2);
    show_pictures2();
  }
  if (document.querySelector(".number3.d-none") === null) {
    num3_res.innerHTML = "";
    num3_task.innerHTML = "";
    bresultat3.removeEventListener("click", f3);
    show_pictures3();
  }
});

// типо возврат на предыдущий уровень
breturn.addEventListener("click", function () {
  if (k === 1) {
    returnUr1(numb1, user_cscore_ur, show_pictures1);
  }
  if (k === 2) {
    returnUr(numb2, user_cscore_ur, show_pictures2, f2, bresultat2);
  }
  if (k === 3) {
    returnUr(numb3, user_cscore_ur, show_pictures3, f3, bresultat3)
    game_end.classList.remove("d-none");
  }
});

//переход на след уровень
bgo.addEventListener("click", function () {
  if (k === 1) {
    goo(numb2, show_pictures2);
  }
  if (k === 2) {
    goo(numb3, show_pictures3);
  }
});

//работа 1 уровня
function show_pictures1() {
  user_cscore_ur = 40;
  score_shtraf = 0;
  ball2.innerHTML = `<p>общие баллы: ${user_cscore}</p>`;

  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

  rand = Math.floor(Math.random() * questions1.length);

  numb1.innerHTML = `<h1>Уровень 1</h1>
                     <h2>${uname.value}, ${questions1[rand].que}</h2>`;

  //появляются картинки
  count = addImg(questions1[rand].key, numb1);

  // обработка клика по картинкам
  let dict_elem = document.querySelectorAll(".elem-image");
  let newcount = 0;

  const statistic = document.createElement("div");
  statistic.classList.add("statistic");
  statistic.innerHTML = `<p>${newcount} / ${count}</p>`;
  numb1.append(statistic);

  for (let i = 0; dict_elem.length > i; i++) {
    dict_elem[i].addEventListener("click", function () {
      if (this.getAttribute("data-text") === questions1[rand].key) {
        if (!this.classList.contains("true")) {
          newcount++;
          this.classList.add("true");
        }
      } else {
        this.classList.add("false");
        score_shtraf += 5;
      }

      statistic.innerHTML = ` <p>${newcount} / ${count}</p>`;
      ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

      if (newcount === count) {
        numb1.classList.add("d-none");
        numb1.innerHTML = "";
        brest_ur.classList.add("d-none");
        perehod.classList.remove("d-none");
        k = 1;
        user_cscore_ur -= score_shtraf;
        user_cscore += user_cscore_ur;
        ball.innerHTML = `<p>баллы за уровень: ${user_cscore_ur}</p>`;
        ball2.innerHTML = `<p>общие баллы: ${user_cscore}</p>`;
      }
    });
  }
}

function show_pictures2() {
  user_cscore_ur = 40;
  score_shtraf = 0;

  ball2.innerHTML = `<p>общие баллы: ${user_cscore}</p>`;

  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

  rand = Math.floor(Math.random() * questions1.length);
  num2_task.innerHTML = `<h1>Уровень 2</h1>
                     <h2>${uname.value}, ${questions1[rand].que}</h2> <p>(перетащи их в красную зону)</p>`;

  count = addImg(questions1[rand].key, num2_task);

  //обработка перетаскивания
  let dict_elem = document.querySelectorAll(".elem-image");
  let flel = document.querySelector(".flex-image");

  // Перебираем все элементы списка и присваиваем нужное значение
  for (const task of dict_elem) {
    task.draggable = true;
  }

  flel.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  });
  num2_res.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  });

  flel.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });
  num2_res.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });

  num2_res.ondragover = allowDrop;
  num2_task.ondragover = allowDrop;
  function allowDrop(event) {
    event.preventDefault();
  }

  num2_res.ondrop = drop;
  num2_task.ondrop = drop;
  function drop(event) {
    event.target.append(document.querySelector(".selected"));
  }

  bresultat2.addEventListener("click", f2);
}

function f2() {
  let itemRes = document.querySelectorAll(".res > .elem-image");
  let newcounter = 0;
  // score_shtraf = 0;
  for (let i = 0; i < itemRes.length; i++) {
    if (itemRes[i].getAttribute("data-text") === questions1[rand].key) {
      itemRes[i].classList.add("true");
      newcounter++;
    }
    if (itemRes[i].getAttribute("data-text") !== questions1[rand].key) {
      itemRes[i].classList.add("false");
      score_shtraf += 5;
    }
  }
  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;
  if (newcounter === count) {
    num2_task.innerHTML = "";
    num2_res.innerHTML = "";
    numb2.classList.add("d-none");
    brest_ur.classList.add("d-none");
    perehod.classList.remove("d-none");
    k = 2;
    user_cscore_ur -= score_shtraf;
    user_cscore += user_cscore_ur;
    ball.innerHTML = `<p>баллы за уровень: ${user_cscore_ur}</p>`;
    ball2.innerHTML = `<p>общие баллы: ${user_cscore}</p>`;
  }
}

function show_pictures3() {
  user_cscore_ur = 40;
  score_shtraf = 0;

  ball2.innerHTML = `<p>общие баллы: ${user_cscore}</p>`;

  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

  rand = Math.floor(Math.random() * questions1.length);
  num3_task.innerHTML = `<h1>Уровень 3</h1>
                     <h2>${uname.value}, ${questions1[rand].que}</h2> <p>(дважды нажми на картинку)</p>`;

  count = addImg(questions1[rand].key, num3_task);

  //обработка дв клика
  let dict_elem = document.querySelectorAll(".elem-image");

  for (let i = 0; dict_elem.length > i; i++) {
    dict_elem[i].addEventListener("dblclick", function () {
      const append_el = this.cloneNode(true);
      num3_res.append(append_el);
      dict_elem[i].remove();
    });
  }

  bresultat3.addEventListener("click", f3);
}
function f3() {
  let itemRes = document.querySelectorAll(".res3 > .elem-image");
  let newcounter = 0;
  for (let i = 0; i < itemRes.length; i++) {
    if (itemRes[i].getAttribute("data-text") === questions1[rand].key) {
      itemRes[i].classList.add("true");
      newcounter++;
    } else {
      itemRes[i].classList.add("false");
      score_shtraf += 5;
    }
  }
  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;
  if (newcounter === count) {
    num3_task.innerHTML = "";
    num3_res.innerHTML = "";
    numb3.classList.add("d-none");
    brest_ur.classList.add("d-none");
    k = 3;
    perehod.classList.remove("d-none");
    bgo.classList.add("d-none");
    b_end.classList.remove("d-none");
    user_cscore_ur -= score_shtraf;
    user_cscore += user_cscore_ur;
    ball.innerHTML = `<p>баллы за уровень: ${user_cscore_ur}</p>`;
    ball2.innerHTML = `<p>общие баллы: ${user_cscore}</p>`;
    theEnd();
  }
}

function theEnd() {
  b_end.addEventListener("click", function (){
    section_ball.classList.add("d-none");
    perehod.classList.add("d-none");
    game_end.classList.remove("d-none");
    game_end.innerHTML = `<p>ты прошел игру. молодец</p>
    <p>ты набрал ${user_cscore} баллов за всю игру</p>
    <p>Хочешь пройти игру еще раз?</p>
    <button class="brestart-game" type="button">Да</button>`;
    rest();
  })
}

function rest() {
  let brest = document.querySelector(".brestart-game");
  brest.addEventListener("click", function () {
    game_end.classList.add("d-none");
    user_cscore = 0;
    numb1.classList.remove("d-none");
    show_pictures1();
  })
}

function addImg(val, tegd) {
  const tdiv = document.createElement("div");
  tdiv.classList.add("flex-image");
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
      tdiv2.classList.add("elem-image");
      tdiv2.setAttribute("data-text", mastype);
      tdiv2.style.backgroundImage = `url('${mass[rand2].img}')`;
      tdiv.append(tdiv2);
    }
  }
  if (count < 3) return addImg(val, tegd);
  tegd.append(tdiv);
  return count;
}

function returnUr(num, us, func, cn, re) {
  perehod.classList.add("d-none");
  num.classList.remove("d-none");
  user_cscore -= us;
  brest_ur.classList.remove("d-none");
  re.removeEventListener("click", cn);
  func();
  return 0;
}
function returnUr1(num, us, func) {
  perehod.classList.add("d-none");
  num.classList.remove("d-none");
  user_cscore -= us;
  brest_ur.classList.remove("d-none");
  func();
  return 0;
}

function goo(num, func) {
  perehod.classList.add("d-none");
  num.classList.remove("d-none");
  brest_ur.classList.remove("d-none");
  func();
}

let mass = [
  {
    name: "юла",
    img: "img/whirligig.jpg",
    type: "игрушки",
  },
  {
    name: "бананы",
    img: "img/banana.jpg",
    type: "еда",
  },
  {
    name: "ботинки",
    img: "img/boots.jpg",
    type: "одежда",
  },
  {
    name: "варежки",
    img: "img/mittens.jpg",
    type: "одежда",
  },
  {
    name: "комбенизон",
    img: "img/overalls.jpg",
    type: "одежда",
  },
  {
    name: "конфета",
    img: "img/candy.jpg",
    type: "еда",
  },
  {
    name: "корова",
    img: "img/cow.jpg",
    type: "животные",
  },
  {
    name: "кот",
    img: "img/cat.jpg",
    type: "животные",
  },
  {
    name: "кукла",
    img: "img/doll.jpg",
    type: "игрушки",
  },
  {
    name: "машина",
    img: "img/car.jpg",
    type: "транспорт",
  },
  {
    name: "мышка",
    img: "img/mouse.jpg",
    type: "животные",
  },
  {
    name: "мяч",
    img: "img/ball.jpg",
    type: "игрушки",
  },
  {
    name: "паровоз",
    img: "img/locomotive.jpg",
    type: "транспорт",
  },
  {
    name: "пирамидка",
    img: "img/pyramid.jpg",
    type: "игрушки",
  },
  {
    name: "самолет",
    img: "img/airplane.jpg",
    type: "транспорт",
  },
  {
    name: "слон",
    img: "img/elephant.jpg",
    type: "животные",
  },
  {
    name: "торт",
    img: "img/cake.jpg",
    type: "еда",
  },
  {
    name: "трактор",
    img: "img/tractor.jpg",
    type: "транспорт",
  },
  {
    name: "хлеб",
    img: "img/bread.jpg",
    type: "еда",
  },
  {
    name: "шляпа",
    img: "img/hat.jpg",
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
