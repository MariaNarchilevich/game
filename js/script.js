    let bstart = document.querySelector(".bstart");
    let binput = document.querySelector('.binput');
    let brestart = document.querySelector('.brestart');
    let bgo = document.querySelector('.bgo');
    let form = document.querySelector('.forma');
    let kont= document.querySelector('.conteiner');
    let numb1 =document.querySelector('.number1');
    let uname = document.querySelector('.user-name');
    let perehod = document.querySelector('.perehod');
    
    // кнопка начать
    bstart.addEventListener('click', function () {
      bstart.classList.add('d-none');
      form.classList.remove('d-none');

      // заполнение формы
      binput.addEventListener('click',function(){
        if (uname.value === null || uname.value === "") {
          alert("Введи свое имя");
          return;}
        //появляются рандомные картинки 
        form.classList.add('d-none');
        kont.classList.remove('d-none');
        const teg_div = document.createElement ('div');
        teg_div.innerHTML = `<h2>${uname.value}, ${questions1[rand].que}</h2>`;
        numb1.append(teg_div);
        let count = addImg(questions1[rand].key);
        
        // обработка клика по картинкам
        let dict_elem = document.querySelectorAll('.elem');
        for (let i = 0; dict_elem.length > i; i++) {
          dict_elem[i].addEventListener('click', function () {
            if(this.getAttribute('data-text')===questions1[rand].key){
              if (!this.classList.contains('true')){
                count--;
                this.classList.add('true');
              }
            }
            else {this.classList.add('false');}
            console.log(count);
            if(count===0){
              numb1.classList.add('d-none');
              perehod.classList.remove('d-none');
            }
          })
        };

        // типо возврат на предыдущий уровень, но он еще не работает
        brestart.addEventListener('click', function(){
          perehod.classList.add('d-none');
          numb1.classList.remove('d-none');
        })
      });
    });

let mass = [
  {
    name: 'юла',
    img: "img/юла.jpg",
    type: 'игрушки'
  },
  {
    name: 'бананы',
    img: "img/бананы.jpg",
    type: 'еда'
  },
  {
    name: 'ботинки',
    img: "img/ботинки.jpg",
    type: 'одежда'
  },
  {
    name: 'варежки',
    img: "img/варежки.jpg",
    type: 'одежда'
  },
  {
    name: 'комбенизон',
    img: "img/комбез.jpg",
    type: 'одежда'
  },
  {
    name: 'конфета',
    img: "img/конфета.jpg",
    type: 'еда'
  },
  {
    name: 'корова',
    img: "img/корова.jpg",
    type: 'животные'
  },
  {
    name: 'кот',
    img: "img/кот.jpg",
    type: 'животные'
  },
  {
    name: 'кукла',
    img: "img/кукла.jpg",
    type: 'игрушки'
  },
  {
    name: 'машина',
    img: "img/машина.jpg",
    type: 'транспорт'
  },
  {
    name: 'мышка',
    img: "img/мышка.jpg",
    type: 'животные'
  },
  {
    name: 'мяч',
    img: "img/мяч.jpg",
    type: 'игрушки'
  },
  {
    name: 'паровоз',
    img: "img/паровоз.jpg",
    type: 'транспорт'
  },
  {
    name: 'пирамидка',
    img: "img/пирамидка.jpg",
    type: 'игрушки'
  },
  {
    name: 'самолет',
    img: "img/самолет.jpg",
    type: 'транспорт'
  },
  {
    name: 'слон',
    img: "img/слон.jpg",
    type: 'животные'
  },
  {
    name: 'торт',
    img: "img/торт.jpg",
    type: 'еда'
  },
  {
    name: 'трактор',
    img: "img/трактор.jpg",
    type: 'транспорт'
  },
  {
    name: 'хлеб',
    img: "img/хлеб.jpg",
    type: 'еда'
  },
  {
    name: 'шляпа',
    img: "img/шляпа.jpg",
    type: 'одежда'
  }
];

let questions1 = [
  {
    key: 'одежда',
    que: 'выбери все картинки на тему ОДЕЖДА'
  },
  {
    key: 'животные',
    que: 'выбери все картинки на тему ЖИВОТНЫЕ'
  },
  {
    key: 'транспорт',
    que: 'выбери все картинки на тему ТРАНСПОРТ'
  },
  {
    key: 'игрушки',
    que: 'выбери все картинки на тему ИГРУШКИ'
  },
  {
    key: 'еда',
    que: 'выбери все картинки на тему ЕДА'
  }
];

let rand = Math.floor(Math.random() * questions1.length); 

function addImg (val){
  const tdiv = document.createElement('div');
  tdiv.classList.add ('flex-wrap');
  let count=0;
  let elemmass = [];
  for (let i=1; i<=9; i++) {
    let rand2 = Math.floor(Math.random() * mass.length);
    let huy = mass[rand2].name;
    elemmass.push(huy);
    console.log(elemmass)

    let getelem = true;
    let k = 0;
    for(let j=0; j<elemmass.length; j++) {
      if (elemmass[j] === huy){
        k++;
        if(k>1){
        getelem = false;
        break;}
      }
    };

    if(getelem ===false){
      console.log(i +" "+ 'contin');
      elemmass.pop();
      i--;
      continue;
    }
    else {
    let mastype= mass[rand2].type;
    if (mastype===val) count++;

    const tdiv2 = document.createElement('div');
    tdiv2.classList.add ('elem');
    tdiv2.setAttribute('data-text', mastype);
    tdiv2.innerHTML = `<img src="${mass[rand2].img}">`;
    tdiv.append(tdiv2);
    };
  }
  if (count<3) return addImg(val);
  numb1.append(tdiv);
  console.log(count);
  console.log(val);
  return count;
}