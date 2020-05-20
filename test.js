
var myForm;
var titleText;
var yearText;
var hourText;
var commentText;
var datalist;
var main;


// 第一個星星狀態
var starStaus;
// 第一個打勾狀態
var checkStatus;

// button
var addTask;
var addInput;
var cancleInput;
var starBtn;//星星
var checkBtn;//打勾
// object
var datas = [];
var data = {
    title: "",
    year: "",
    hour: "",
    done: false,//判斷有無打勾
    file: false,//判斷有無上傳檔案
    star: false,//判斷星星
    comment: "",
}

addTask = document.querySelector('.addTaskButton');
addTask.addEventListener('click', mainTable);


// 上方填空欄
function mainTable() {
    // console.log(main)
    main = document.getElementById('mainWrapper');
    main.innerHTML
        = `<div class="myFormWrapper">
<form id="myForm">
    <div class="titleContainer">
        <div>
            <input type="checkbox" name="tick">
            <input id="title-text" class="typeTitle" type="text" placeholder="Type Something Here…">
        </div>
        <div>
            <i class="fas fa-star star"></i>
            <i class="fas fa-trash-alt trash"></i>
            <i class="fas fa-pen pen"></i>
        </div>
    </div>
    <div class="contentWrapper">
        <div class="datelineWrapper">
            <div>
                <i class="far fa-calendar-alt contentIcon"></i>
                <span class="contentTitle">Deadline</span>
            </div>
            <div class="dateWrapper">
                <input id="year-text" class="deadlineInput" type="date" placeholder="yyyy-mm-dd">
                <input id="hour-text" class="deadlineInput" type="time" placeholder="hh:mm">
            </div>
        </div>

        <div class="fileWrapper">
            <div>
                <i class="far fa-file contentIcon"></i>
                <span class="contentTitle">File</span>
            </div>
            <div>
                <input class="plus" type="submit" value="+">
            </div>
        </div>

        <div class="commentWrapper">
            <div>
                <i class="far fa-comment-dots contentIcon"></i>
                <span class="contentTitle">Comment</span>
            </div>
            <div>

                <input id="comment-text" class="memoInput" type="text" placeholder="Type your memo here">

            </div>
        </div>
    </div>
    <div class="buttonWrapper">
        <input class="cancleinput" type="submit" value="✕ Cancle">
        <input class="addinput" type="submit" value="+ Add Task">
    </div>
</form>
</div>`;


    myForm = document.getElementById('myForm');
    titleText = document.getElementById('title-text');
    yearText = document.getElementById('year-text');
    hourText = document.getElementById('hour-text');
    commentText = document.getElementById('comment-text');
    datalist = document.getElementById('plates');
    main = document.getElementById('mainWrapper');

    starStaus = false;
    checkStatus = false;




    // 按第一個星星
    starBtn = document.querySelector('.titleContainer .star');
    starBtn.addEventListener('click', starBtnProcessing);
    // 第一個打勾
    checkBtn = document.querySelector('.titleContainer [name="tick"]');
    checkBtn.addEventListener('click', checkBtnProcessing);



    // 按按鈕 彈出下方表格 並且重新reset上方表格
    addInput = document.querySelector('.addinput');
    addInput.addEventListener('click', pushData);
    // 按按鈕 刪除下方表格
    cancleInput = document.querySelector('.cancleinput');
    cancleInput.addEventListener('click', deleteData);

}



// 第1顆星星
function starBtnProcessing() {
    let titleContainer = document.querySelector('.titleContainer');
    // 資料更新
    starStaus = !starStaus;
    // 渲染頁面
    starBtn.classList.toggle('starColor');
    titleContainer.classList.toggle('recordContainerColor');
    console.log('yooooooo');
}

// 第一個打勾
function checkBtnProcessing() {
    let typeTitle = document.querySelector('.titleContainer .typeTitle');
    // 資料更新
    checkStatus = !checkStatus;
    // 渲染頁面
    typeTitle.classList.toggle('typeTitleLine');
    console.log('loooooooo');
}


// 按按鈕 刪除下方表格
function deleteData() {
    main = document.getElementById('mainWrapper');
    main.innerHTML
        = ``;
}
// 按按鈕 彈出下方表格
function pushData(e) {
    // 加上preventDefault()避免每次submit都會重整網頁
    e.preventDefault();


    data = {
        title: titleText.value,
        year: yearText.value,
        hour: hourText.value,
        done: checkStatus,//判斷有無打勾
        file: false,//判斷有無上傳檔案
        star: starStaus,//判斷星星
        comment: commentText.value,

    };



    datas.push(data);
    console.table(datas)


    // 重新渲染方表格
    mainTable();
    // 顯示下方表格程式
    displayData(datas, datalist);


    myForm.reset();

}
// 顯示程式
function displayData(datas, datalist) {
    console.log(datas)
    datalist.innerHTML = datas.map((data, i) => {
        // 星星處理
        let starColor = "";
        let recordContainerColor = "";
        if (data.star === true) {
            starColor = 'starColor';
            recordContainerColor = 'recordContainerColor';
        }
        // 打勾處理
        let typeTitleLine = "";
        let checked = "";
        if (data.done === true) {
            checked = 'checked';
            typeTitleLine = 'typeTitleLine';
        }

        return `
        <div class="recordContainer ${recordContainerColor}" >
            <div class="messageContainer">
                <div>
                    <input type="checkbox" name="tick" data-checkid="${i}" ${checked}>
                    <span class="typeTitle ${typeTitleLine}"> ${data.title}</span>

                </div>
                <div>
                    <i class="fas fa-star star ${starColor}" data-starid="${i}"></i>
                    <i class="fas fa-trash-alt trash" data-trashid="${i}"></i>
                    <i class="fas fa-pen pen" data-penid="${i}"></i>
                </div>
            </div>
            <div class="mgIconWrapper">
                <i class="far fa-calendar-alt messageIcon"></i>
                <span class="dateStamp">${data.year}</span>
                <i class="far fa-file messageIcon"></i>
                <i class="far fa-comment-dots messageIcon"></i>
            </div>
        </div>

`;
    })
    // 星星處理
    starProcessing();
    // 打勾處理
    tickProcessing();

    // 鉛筆處理
    penProcessing();

    // 刪除處理
    deleteProcessing();

}

// 星星處理
function starProcessing() {
    // const chooseStar = document.querySelectorAll('.star');
    const RecordContainer = document.querySelectorAll('.recordContainer');
    const TitleContainer = document.querySelector('.titleContainer');
    // console.log(chooseStar);
    let stars = document.querySelectorAll('#plates .star');

    stars.forEach((star, index) => {
        // console.log(starData)
        star.addEventListener('click', function (e) {
            // 資料更新處理
            let starid = e.target.dataset.starid;
            datas[starid].star = !datas[starid].star;
            console.table(datas);

            // 渲染畫面處理
            // if (datas[starid].star === true) {
            //     star.classList.toggle('starColor');
            //     RecordContainer[starid].classList.toggle('recordContainerColor');
            // }

            displayData(datas, datalist);
        })
    })
}
// 打勾處理
function tickProcessing() {
    let Ticks = document.getElementsByName("tick");
    // const TypeTitle = document.querySelectorAll('.typeTitle');

    Ticks.forEach((tick, index) => {
        tick.addEventListener('click', function (e) {

            // 資料更新處理
            let checkid = e.target.dataset.checkid;
            datas[checkid].done = !datas[checkid].done;
            console.table(datas);

            // 渲染畫面處理
            // TypeTitle[index].classList.toggle('typeTitleLine');
            displayData(datas, datalist);
        })
    })
}
// 鉛筆處理
function penProcessing() {
    let pens = document.querySelectorAll('#plates .pen');
    pens.forEach((pen, index) => {
        pen.addEventListener('click', function (e) {
            let penid = e.target.dataset.penid;
            // 星星處理
            let starColor = "";
            let recordContainerColor = "";
            if (datas[penid].star === true) {
                starColor = 'starColor';
                recordContainerColor = 'recordContainerColor';
            }
            // 打勾處理
            let typeTitleLine = "";
            let checked = "";
            if (datas[penid].done === true) {
                checked = 'checked';
                typeTitleLine = 'typeTitleLine';
            }
            main = document.getElementById('mainWrapper');
            main.innerHTML = `<div class="myFormWrapper">
            <form id="myForm">
                <div class="titleContainer ${recordContainerColor}">
                    <div>
                        <input type="checkbox" name="tick"${checked}>
                        <input id="title-text" class="typeTitle  ${typeTitleLine}" type="text" value="${datas[penid].title}">
                    </div>
                    <div>
                        <i class="fas fa-star star ${starColor}"></i>
                        <i class="fas fa-trash-alt trash"></i>
                        <i class="fas fa-pen pen"></i>
                    </div>
                </div>
                <div class="contentWrapper">
                    <div class="datelineWrapper">
                        <div>
                            <i class="far fa-calendar-alt contentIcon"></i>
                            <span class="contentTitle">Deadline</span>
                        </div>
                        <div class="dateWrapper">
                            <input id="year-text" class="deadlineInput" type="date" value="${datas[penid].year}">
                            <input id="hour-text" class="deadlineInput" type="time" value="${datas[penid].hour}">
                        </div>
                    </div>
            
                    <div class="fileWrapper">
                        <div>
                            <i class="far fa-file contentIcon"></i>
                            <span class="contentTitle">File</span>
                        </div>
                        <div>
                            <input class="plus" type="submit" value="+">
                        </div>
                    </div>
            
                    <div class="commentWrapper">
                        <div>
                            <i class="far fa-comment-dots contentIcon"></i>
                            <span class="contentTitle">Comment</span>
                        </div>
                        <div>
            
                            <input id="comment-text" class="memoInput" type="text" value="${datas[penid].comment}">
            
                        </div>
                    </div>
                </div>
                <div class="buttonWrapper">
                    <input class="cancleinput" type="submit" value="✕ Cancle">
                    <input class="addinput" type="submit" value="+ Save">
                </div>
            </form>
            </div>`;

            // cancle按鈕
            cancleInput = document.querySelector('.cancleinput');
            cancleInput.addEventListener('click', deleteData);

            // // 按第一個星星
            starBtn = document.querySelector('.titleContainer .star');
            starBtn.addEventListener('click', () => {
                let titleContainer = document.querySelector('.titleContainer');
                datas[penid].star = !datas[penid].star;

                // 渲染頁面
                starBtn.classList.toggle('starColor');
                titleContainer.classList.toggle('recordContainerColor');
            });

            // // 按第一個打勾
            checkBtn = document.querySelector('.titleContainer [name="tick"]');
            checkBtn.addEventListener('click', () => {
                let typeTitle = document.querySelector('.titleContainer .typeTitle');
                datas[penid].done = !datas[penid].done;

                // 渲染頁面
                typeTitle.classList.toggle('typeTitleLine');
            });

            console.table(datas);
            // 存取按鈕
            addInput = document.querySelector('.addinput');
            addInput.addEventListener('click', (evt) => {
                // 避免網頁重整
                evt.preventDefault();
                // 抓取修改資料
                titleText = document.getElementById('title-text');
                yearText = document.getElementById('year-text');
                hourText = document.getElementById('hour-text');
                commentText = document.getElementById('comment-text');
                datalist = document.getElementById('plates');





                // 資料寫入
                datas[penid].title = titleText.value;
                datas[penid].year = yearText.value;
                datas[penid].hour = hourText.value;
                datas[penid].comment = commentText.value;
                // datas[penid].star = starStaus;
                // datas[penid].done = checkStatus;



                console.table(datas);


                // 渲染畫面
                displayData(datas, datalist);

                mainTable();


            });
        })

    })

}//penProcessing


function deleteProcessing() {
    let trashs = document.querySelectorAll('#plates .trash');
    trashs.forEach((trash, index) => {
        trash.addEventListener('click', function (e) {
            var trashid = e.target.dataset.trashid;
            // console.log(trashid);
            datas.splice(trashid, 1);
            displayData(datas, datalist);
        })

    })
}//deleteProcessing