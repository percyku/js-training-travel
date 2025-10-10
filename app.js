let jsonData = [
  {
    image:
      "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true",
    location: "高雄",
    rank: 10,
    title: "綠島自由行套裝行程",
    desc: "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。",
    price: 1400,
    leave: 87,
  },
  {
    image:
      "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_4.png?raw=true",
    location: "台北",
    rank: 2,
    title: "清境高空觀景步道",
    desc: "清境農場青青草原數十公頃碧草，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
    price: 240,
    leave: 99,
  },
  {
    image:
      "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_3.png?raw=true",
    location: "台中",
    rank: 7,
    title: "山林悠遊套票",
    desc: "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。",
    price: 1765,
    leave: 20,
  },
];

let locationData = ["台北", "台中", "高雄"];
// console.log(jsonData);

const ticketName = document.querySelector("#ticketName");
const ticketNameMessage = document.querySelector("#ticketName-message");

const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketImgUrlMessage = document.querySelector("#ticketImgUrl-message");

const ticketRegion = document.querySelector("#ticketRegion");
const ticketRegionMessage = document.querySelector("#ticketRegion-message");

const ticketPrice = document.querySelector("#ticketPrice");
const ticketPriceMessage = document.querySelector("#ticketPrice-message");

const ticketNum = document.querySelector("#ticketNum");
const ticketNumMessage = document.querySelector("#ticketNum-message");

const ticketRate = document.querySelector("#ticketRate");
const ticketRateMessage = document.querySelector("#ticketRate-message");

const ticketDescription = document.querySelector("#ticketDescription");
const ticketDescriptionMessage = document.querySelector(
  "#ticketDescription-message"
);

const addTicketBtn = document.querySelector(".addTicket-btn");
addTicketBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearAlertMsg();
  if (checkItem()) {
    let obj = {
      image: ticketImgUrl.value,
      location: ticketRegion.value,
      rank:
        ticketRate.value === "10"
          ? parseInt(ticketRate.value)
          : parseFloat(ticketRate.value.match(/^\d+(\.\d{0,1})?/)[0]),
      title: ticketName.value,
      desc: ticketDescription.value,
      price: parseInt(ticketPrice.value),
      leave: parseInt(ticketNum.value),
    };

    jsonData.push(obj);
    initialItem();
    init(jsonData, "initial");
  }
});

const contextList = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
regionSearch.addEventListener("change", (e) => {
  e.preventDefault();
  let filterString = e.target.value;

  let data = jsonData.filter((item) => {
    if (filterString === "") {
      return item;
    } else if (filterString === item.location) {
      return item;
    }
  });

  init(data);
});

function init(data, initial) {
  //   console.log(data);

  let str = "";
  data.forEach((item) => {
    str += ` <li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img
                src="${item.image}"
                alt=""
              />
            </a>
            <div class="ticketCard-region">${item.location}</div>
            <div class="ticketCard-rank">${item.rank}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.title}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.desc}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.leave} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
  });
  contextList.innerHTML = str;

  if (initial === "initial") {
    let str1 = `<option value="地區搜尋" disabled selected hidden>地區搜尋</option> <option value="">全部地區</option>`;
    let str2 = ` <option value="" disabled selected hidden>請選擇景點地區</option>`;
    locationData.forEach((item) => {
      str1 += ` <option value="${item}">${item}</option>`;
      str2 += ` <option value="${item}">${item}</option>`;
    });
    regionSearch.innerHTML = str1;
    ticketRegion.innerHTML = str2;
  }

  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

function clearAlertMsg() {
  ticketNameMessage.innerHTML = "";
  ticketImgUrlMessage.innerHTML = "";
  ticketRegionMessage.innerHTML = "";
  ticketPriceMessage.innerHTML = "";
  ticketNumMessage.innerHTML = "";
  ticketRateMessage.innerHTML = "";
  ticketDescriptionMessage.innerHTML = "";
}

function initialItem() {
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketRegion.value = "";
  ticketPrice.value = "";
  ticketNum.value = "";
  ticketRate.value = "";
  ticketDescription.value = "";
}

function checkItem() {
  const alertStr1 = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
  const alertStr2 = `<i class="fas fa-exclamation-circle"></i><span>必填數字!</span>`;

  let res = true;
  if (ticketName.value.trim().length == 0) {
    ticketNameMessage.innerHTML = alertStr1;
    res = false;
  }

  if (ticketImgUrl.value.trim().length == 0) {
    ticketImgUrlMessage.innerHTML = alertStr1;
    res = false;
  }

  if (ticketRegion.value.length == 0) {
    ticketRegionMessage.innerHTML = alertStr2;
    res = false;
  }

  let num = parseInt(ticketPrice.value);
  if (typeof num !== "number" || isNaN(num)) {
    ticketPriceMessage.innerHTML = alertStr2;
    res = false;
  } else if (num < 0) {
    ticketPriceMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>不得小於0!</span>`;
    res = false;
  }

  num = parseInt(ticketNum.value);
  if (typeof num !== "number" || isNaN(num)) {
    ticketNumMessage.innerHTML = alertStr2;
    res = false;
  } else if (num < 1) {
    ticketNumMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>不得小於1!</span>`;
    res = false;
  }

  num = parseFloat(ticketRate.value);
  if (typeof num !== "number" || isNaN(num)) {
    ticketRateMessage.innerHTML = alertStr2;
    res = false;
  } else if (num < 1 || num > 10) {
    ticketRateMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>在1~10之間</span>`;
    res = false;
  }

  if (ticketDescription.value.trim().length == 0) {
    ticketDescriptionMessage.innerHTML = alertStr1;
    res = false;
  } else if (ticketDescription.value.trim().length > 100) {
    ticketDescriptionMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>限 100 字!</span>`;
    res = false;
  }

  return res;
}

init(jsonData, "initial");
