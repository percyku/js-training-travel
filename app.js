// let jsonData = [
// {
//   id:1,
//   imgUrl:
//     "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true",
//   area: "高雄",
//   rate: 10,
//   name: "綠島自由行套裝行程",
//   description: "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。",
//   price: 1400,
//   group: 87,
// },
// {
//   id:2,
//   imgUrl:
//     "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_4.png?raw=true",
//   area: "台北",
//   rate: 2,
//   name: "清境高空觀景步道",
//   description: "清境農場青青草原數十公頃碧草，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
//   price: 240,
//   group: 99,
// },
// {
//   id:3,
//   imgUrl:
//     "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_3.png?raw=true",
//   area: "台中",
//   rate: 7,
//   name: "山林悠遊套票",
//   description: "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。",
//   price: 1765,
//   group: 20,
// },
// ];

let jsonData = "";
let areaData = ["台北", "台中", "高雄", "花蓮"];

// console.log(jsonData);
//

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
      id: Date.now(),
      imgUrl: ticketImgUrl.value,
      area: ticketRegion.value,
      rate: Number.isInteger(ticketRate.value)
        ? parseInt(ticketRate.value)
        : parseFloat(ticketRate.value.match(/^\d+(\.\d{0,1})?/)[0]),
      name: ticketName.value,
      description: ticketDescription.value,
      price: parseInt(ticketPrice.value),
      group: parseInt(ticketNum.value),
    };

    jsonData.push(obj);
    document.querySelector(".addTicket-form").reset();
    renderData(jsonData);
  }
});

const contextList = document.querySelector(".ticketCard-area");
const cantFindArea = document.querySelector(".cantFind-area");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
regionSearch.addEventListener("change", (e) => {
  e.preventDefault();
  let filterString = e.target.value;

  let data = jsonData.filter(
    (item) => filterString === "" || filterString === item.area
  );

  renderData(data);
});

function renderData(data) {
  console.log(data);
  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
  if (data.length > 0) {
    let str = "";
    data.forEach((item) => {
      str += ` <li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img
                src="${item.imgUrl}"
                alt=""
              />
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
    });
    contextList.innerHTML = str;
    cantFindArea.style = "display:none";
  } else {
    console.log("123");
    contextList.innerHTML = "";
    cantFindArea.style = "display:block";
  }
}

function renderSelector() {
  let str1 = `<option value="地區搜尋" disabled selected hidden>地區搜尋</option> <option value="">全部地區</option>`;
  let str2 = ` <option value="" disabled selected hidden>請選擇景點地區</option>`;
  areaData.forEach((item) => {
    str1 += ` <option value="${item}">${item}</option>`;
    str2 += ` <option value="${item}">${item}</option>`;
  });
  regionSearch.innerHTML = str1;
  ticketRegion.innerHTML = str2;
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

function checkItem() {
  const requiredAlert1 = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
  const requiredAlert2 = `<i class="fas fa-exclamation-circle"></i><span>必填數字!</span>`;

  let res = true;
  if (ticketName.value.trim().length == 0) {
    ticketNameMessage.innerHTML = requiredAlert1;
    res = false;
  }

  if (ticketImgUrl.value.trim().length == 0) {
    ticketImgUrlMessage.innerHTML = requiredAlert1;
    res = false;
  }

  if (ticketRegion.value.length == 0) {
    ticketRegionMessage.innerHTML = requiredAlert2;
    res = false;
  }

  let num = parseInt(ticketPrice.value);
  if (isNaN(num)) {
    ticketPriceMessage.innerHTML = requiredAlert2;
    res = false;
  } else if (num < 0) {
    ticketPriceMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>不得小於0!</span>`;
    res = false;
  }

  num = parseInt(ticketNum.value);
  if (isNaN(num)) {
    ticketNumMessage.innerHTML = requiredAlert2;
    res = false;
  } else if (num < 1) {
    ticketNumMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>不得小於1!</span>`;
    res = false;
  }

  num = parseFloat(ticketRate.value);
  if (isNaN(num)) {
    ticketRateMessage.innerHTML = alertStr2;
    res = false;
  } else if (num < 1 || num > 10) {
    ticketRateMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>在1~10之間</span>`;
    res = false;
  }

  if (ticketDescription.value.trim().length == 0) {
    ticketDescriptionMessage.innerHTML = requiredAlert1;
    res = false;
  } else if (ticketDescription.value.trim().length > 100) {
    ticketDescriptionMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>限 100 字!</span>`;
    res = false;
  }

  return res;
}

function init() {
  renderSelector();

  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
    )
    .then((res) => {
      console.log(res.data["data"]);
      jsonData = res.data["data"];
      renderData(jsonData);
    })
    .catch((error) => {
      console.log(error);
      alert("this is error msg:" + error);
    });
}

init();
