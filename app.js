const showTableBtns = document.getElementById("show-table-btns");
const tableContainers = document.querySelectorAll(".table-container");
const tdEls = document.querySelectorAll("td");

// Only show the table that matches the tableId, hide the rest
//通过满足选择满足id的表格，只显示该表格
function showTable(tableId) {
  for (const tableContainer of tableContainers) {
    if (tableContainer.dataset.table === tableId.toString()) {
      tableContainer.classList.remove("hidden");
    } else {
      tableContainer.classList.add("hidden");
    }
  }
}

// Play audio file that matches the audioId
//根据id来播放相应的音频的function
function play(value) {
  let audio = document.getElementById(`audio-${value}`);
  audio.play();
}

// Event listeners
//添加EventListener，如果 tableId 变量的值在数组中，
//那么执行 showTable(tableId) 这个函数。
showTableBtns.addEventListener("click", (e) => {
  const tableId = e.target.dataset.table;
  if (["1", "2", "3", "4", "5"].includes(tableId)) {
    showTable(tableId);
    getTbIdsArray(tableId);
  }
});

//Lterate td elements and play the audio when clicked
//遍历所有的td元素，添加点击后播放相应音频的
for (const tdEl of tdEls) {
  tdEl.addEventListener("click", (e) => {
    const audioId = e.target.id;
    console.log(tdEl.id);
    if (audioId) {
      play(audioId);
    }
  });
}

//每次点击切换页面都会生成相应的td的id的数组,用于听写时生成随机数
//Swithing the table and generate an array of ids
const tdIds = [];
function getTbIdsArray(tableId) {
  tdIds.length = 0;
  let table = document.getElementById(`table-${tableId}`);
  const tdElsInTable = table.querySelectorAll("td");
  for (const tdEl of tdElsInTable) {
    let tdId = tdEl.id;
    tdIds.push(tdId);
  }
}
//听写的function
//function of dictation
function dictation(num, time) {
  num = Number(document.getElementById("numbers").value);
  time = Number(document.getElementById("spacetime").value) * 1000;

  let selectedArr = [];
  let currentIndex = 0;

  function playNext() {
    if (currentIndex < selectedArr.length) {
      let readNow = selectedArr[currentIndex];
      console.log(readNow);
      if (readNow != "") {
        play(readNow);
      }
    }
    currentIndex++;
    setTimeout(playNext, time);
  }

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * tdIds.length);
    const selectedIndex = tdIds[randomIndex];
    if (!selectedArr.includes(selectedIndex)) {
      selectedArr.push(tdIds[randomIndex]);
    }
  }
  console.log("听写开始");
  playNext();
}
