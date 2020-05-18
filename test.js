
var myForm;
var titleText;
var yearText;
var hourText;
var commentText;
var datalist;
var main;

var starStaus = false;
// console.log(main)


// button
var addTask;
var addInput;
var cancleInput;
var starBtn;
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
addTask.addEventListener('click', () => {
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
    // 按星星
    starBtn = main.querySelector('.star');
    starBtn.addEventListener('click', starBtnProcessing);
    // 按按鈕 彈出下方表格
    addInput = document.querySelector('.addinput');
    addInput.addEventListener('click', pushData);
    // 按按鈕 刪除下方表格
    cancleInput = document.querySelector('.cancleinput');
    cancleInput.addEventListener('click', deleteData);



});

// 第1顆星星
function starBtnProcessing() {
    let RecordContainer = main.querySelector('.titleContainer');
    // 資料更新未做
    starStaus = !starStaus;
    // 渲染頁面
    starBtn.classList.toggle('starColor');
    RecordContainer.classList.toggle('recordContainerColor');
    // console.log(RecordContainer);
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
        done: false,//判斷有無打勾
        file: false,//判斷有無上傳檔案
        star: starStaus,//判斷星星
        comment: commentText.value,

    };

    // data.title = titleText.value;
    // data.year = yearText.value;
    // data.hour = hourText.value;
    // data.done = false;//判斷有無打勾
    // data.file = false;//判斷有無上傳檔案
    // // data.star = false;//判斷星星
    // data.comment = commentText.value;

    datas.push(data);
    console.table(datas)

    // 顯示程式
    displayData(datas, datalist);


    myForm.reset();

}
// 顯示程式
function displayData(datas, datalist) {
    console.log(datas)
    datalist.innerHTML = datas.map((data, i) => {
        let starColor = "";
        let recordContainerColor = "";
        if (data.star === true) {
            starColor = 'starColor';
            recordContainerColor = 'recordContainerColor';
        }


        return `
        <div class="recordContainer ${recordContainerColor}" >
            <div class="messageContainer">
                <div>
                    <input type="checkbox" name="tick">
                    <span class="typeTitle"> ${data.title}</span>

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
    const Ticks = document.getElementsByName("tick");
    const TypeTitle = document.querySelectorAll('.typeTitle')

    Ticks.forEach((tick, index) => {
        tick.addEventListener('click', function () {

            // 資料更新處理未做

            // 渲染畫面處理
            TypeTitle[index].classList.toggle('typeTitleLine');
        })
    })
}
// 鉛筆處理
function penProcessing() {
    let pens = document.querySelectorAll('#plates .pen');
    pens.forEach((pen, index) => {
        pen.addEventListener('click', function (e) {
            let starColor = "";
            let recordContainerColor = "";
            let penid = e.target.dataset.penid;
            if (datas[penid].star === true) {
                starColor = 'starColor';
                recordContainerColor = 'recordContainerColor';
            }
            // console.log(penid);
            // console.log(datas[0]);
            main = document.getElementById('mainWrapper');
            main.innerHTML = `<div class="myFormWrapper">
            <form id="myForm">
                <div class="titleContainer ${recordContainerColor}">
                    <div>
                        <input type="checkbox" name="tick">
                        <input id="title-text" class="typeTitle" type="text" value="${datas[penid].title}">
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

                console.table(datas);


                // 渲染畫面
                displayData(datas, datalist);


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