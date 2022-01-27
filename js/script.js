let button_start = document.querySelector(".bstart"); //кнопка старта
let binput_form = document.querySelector(".binput"); //кнопка отправки формы
let brestart = document.querySelector(".brestart"); //кнопка занова уровень 
let bgo = document.querySelector(".bgo"); //кнопка переход на уровень 
let brest_ur = document.querySelector(".brestart-ur");

let form = document.querySelector(".forma"); //форма
let kont = document.querySelector(".conteiner"); //фон заданий
let numb1 = document.querySelector(".number1"); //1 задание
let numb2 = document.querySelector(".number2"); //2задание
let numb3 = document.querySelector(".number3"); //2задание

let uname = document.querySelector(".user-name"); //имя пользователя

let perehod = document.querySelector(".perehod"); //переход
let num2_task = document.querySelector(".flex-column"); //2задание
let num2_res = document.querySelector(".res"); //2 задание
let num3_task = document.querySelector(".flex-column3"); //3задание
let num3_res = document.querySelector(".res3"); //3 задание

let user_cscore = 0;
let user_cscore_ur = 0;
let score_shtraf = 0;

let section_ball = document.querySelector(".user-score");

const ball2 = document.createElement("div");
ball2.classList.add("score2");

const ball = document.createElement("div");
ball.classList.add("score");

let k = 0;

// старт
button_start.addEventListener("click", function () {
  button_start.classList.add("d-none");
  form.classList.remove("d-none");
});

// заполнение формы
binput_form.addEventListener("click", function () {
  if (uname.value === null || uname.value === "") {
    alert("Введи свое имя");
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

// занова уровень
brest_ur.addEventListener('click', function(){
  if (document.querySelector(".number1.d-none")===null) {show_pictures1();}
  if (document.querySelector(".number2.d-none")===null) { show_pictures2();}
  if (document.querySelector(".number3.d-none")===null) { show_pictures3();}
})


// типо возврат на предыдущий уровень 
brestart.addEventListener("click", function () {
  if (k===1) { restart(numb1,user_cscore_ur, show_pictures1); }
  if (k===2) { restart(numb2,user_cscore_ur, show_pictures2); }
  if (k===3) { restart(numb3,user_cscore_ur, show_pictures3); }
});

//переход на след уровень
bgo.addEventListener("click", function () {
  if (k===1) { goo(numb2, show_pictures2)}
  if (k===2) { goo(numb3, show_pictures3)}
});

//работа 1 уровня
function show_pictures1() {
  user_cscore_ur = 40;
  score_shtraf = 0;
  ball2.innerHTML = `<p>баллы общ: ${user_cscore}</p>`;

  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

  let rand = Math.floor(Math.random() * questions1.length);

  numb1.innerHTML = `<h1>Уровень 1</h1>
                     <h2>${uname.value}, ${questions1[rand].que}</h2>`;

  //появляются картинки
  let count = addImg(questions1[rand].key, numb1);

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
        score_shtraf +=5;
      }

      statistic.innerHTML = ` <p>${newcount} / ${count}</p>`;
      ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

      if (newcount === count) {
        numb1.classList.add("d-none");
        numb1.innerHTML = "";
        brest_ur.classList.add("d-none");
        perehod.classList.remove("d-none");
        k=1;
        user_cscore_ur -= score_shtraf;
        user_cscore +=user_cscore_ur;
        ball.innerHTML = `<p>баллы за уровень: ${user_cscore_ur}</p>`;
        ball2.innerHTML = `<p>баллы общ: ${user_cscore}</p>`;
      }
    });
  }
  
}

function show_pictures2() {
  user_cscore_ur = 40;
  score_shtraf = 0;
  num2_task.innerHTML = "";
  num2_res.innerHTML = "";
  ball2.innerHTML = `<p>баллы общ: ${user_cscore}</p>`;

  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

  let rand = Math.floor(Math.random() * questions1.length);
  num2_task.innerHTML = `<h1>Уровень 2</h1>
                     <h2>${uname.value}, ${questions1[rand].que}</h2> <p>(перетащи их в красную зону)</p>`;

  let count = addImg(questions1[rand].key, num2_task);

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

  let bresultat = document.querySelector(".bresultat");
  bresultat.addEventListener("click", function () {
    let itemRes = document.querySelectorAll(".res > .elem-image");
    let newcounter = 0;
    for (let i = 0; i < itemRes.length; i++) {
      if (itemRes[i].getAttribute("data-text") == questions1[rand].key) {
        itemRes[i].classList.add("true");
        newcounter++;
      }
      if (itemRes[i].getAttribute("data-text") !== questions1[rand].key) {
        score_shtraf +=5;
      }
      
      ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;
      if (newcounter === count) {
        numb2.classList.add("d-none");
        brest_ur.classList.add("d-none");
        perehod.classList.remove("d-none");
        k=2;
        user_cscore_ur -= score_shtraf;
        user_cscore += user_cscore_ur;
        ball.innerHTML = `<p>баллы за уровень: ${user_cscore_ur}</p>`;
        ball2.innerHTML = `<p>баллы общ: ${user_cscore}</p>`;
      }
    }
  });
}

function show_pictures3() {
  user_cscore_ur = 40;
  score_shtraf = 0;
  num3_task.innerHTML = "";
        num3_res.innerHTML = "";
  ball2.innerHTML = `<p>баллы общ: ${user_cscore}</p>`;

  ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;

  let rand = Math.floor(Math.random() * questions1.length);
  num3_task.innerHTML = `<h1>Уровень 3</h1>
                     <h2>${uname.value}, ${questions1[rand].que}</h2> <p>два раза нажми на картинку</p>`;

  let count = addImg(questions1[rand].key, num3_task);

  //обработка дв клика
  let dict_elem = document.querySelectorAll(".elem-image");

  for (let i = 0; dict_elem.length > i; i++) {
    dict_elem[i].addEventListener("dblclick", function () {
      const append_el = this.cloneNode(true);
      num3_res.append(append_el);
      dict_elem[i].remove();
    });
  }

  let bresultat = document.querySelector(".bresultat3");
  bresultat.addEventListener("click", function () {
    let itemRes = document.querySelectorAll(".res3 > .elem-image");
    let newcounter = 0;
    for (let i = 0; i < itemRes.length; i++) {
      if (itemRes[i].getAttribute("data-text") === questions1[rand].key) {
        itemRes[i].classList.add("true");
        newcounter++;
      }
      else {
        score_shtraf +=5;
      }
      
      ball.innerHTML = `<p>штрафные баллы за уровень: ${score_shtraf}</p>`;
      if (newcounter === count) {
        numb3.classList.add("d-none");
        brest_ur.classList.add("d-none");
        k=3;
        perehod.classList.remove("d-none");
        bgo.classList.add("d-none");
        user_cscore_ur -= score_shtraf;
        user_cscore += user_cscore_ur;
        ball.innerHTML = `<p>баллы за уровень: ${user_cscore_ur}</p>`;
        ball2.innerHTML = `<p>баллы общ: ${user_cscore}</p>`;
      }
    }
  });
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

function restart (num, us, func) {
  perehod.classList.add("d-none");
  num.classList.remove("d-none");
  user_cscore -=us;
  brest_ur.classList.remove("d-none");
  func();
  return 0;
}

function goo(num,func) {
  perehod.classList.add("d-none");
  num.classList.remove("d-none");
  brest_ur.classList.remove("d-none");
  func();
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
