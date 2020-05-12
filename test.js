
var myForm;
var titleText;
var yearText;
var hourText;
var commentText;
var datalist;
var main;
// console.log(main)


// button
var addTask;
var addInput;
var cancleInput;

var datas = [];

addTask = document.querySelector('.addTaskButton');
addTask.addEventListener('click', () => {
    // console.log(main)
    main = document.getElementById('mainWrapper');
    main.innerHTML
        = `<div class="myFormWrapper">
<form id="myForm">
    <div class="titleContainer">
        <div>
            <input type="checkbox">
            <input id="title-text" class="typeTitle" type="text" placeholder="Type Something Here…">
        </div>
        <div>
            <i class="fas fa-star star"></i>
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
                <input id="year-text" class="deadlineInput" type="text" placeholder="yyyy-mm-dd">
                <input id="hour-text" class="deadlineInput" type="text" placeholder="hh:mm">
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
    // 按按鈕 彈出表格
    addInput = document.querySelector('.addinput');
    addInput.addEventListener('click', pushData);
    // 按按鈕 刪除表格
    cancleInput = document.querySelector('.cancleinput');
    cancleInput.addEventListener('click', deleteData)
});

// 按按鈕 刪除表格
function deleteData() {
    main = document.getElementById('mainWrapper');
    main.innerHTML
        = ``;
}




// 按按鈕 彈出表格
function pushData(e) {
    // 加上preventDefault()避免每次submit都會重整網頁
    e.preventDefault();
    //選取輸入框的輸入文字
    const title_text = titleText.value;
    const year_text = yearText.value;
    const hour_text = hourText.value;
    const comment_text = commentText.value;
    // console.log(comment_text)

    const data = {
        title: title_text,
        year: year_text,
        hour: hour_text,
        done: false,//判斷有無打勾
        file: false,//判斷有無上傳檔案
        star: false,//判斷星星
        comment: comment_text,
    }
    datas.push(data);
    console.table(datas)

    // 顯示程式
    displayData(datas, datalist);

    // 星星處理
    starProcessing();

    // 清空輸入欄位的文字
    myForm.reset();

}
// 顯示程式
function displayData(datas, datalist) {
    console.log(datas)
    datalist.innerHTML = datas.map((data, i) => {
        return `
        <div class="recordContainer">
            <div class="messageContainer">
                <div>
                    <input type="checkbox">
                    <span class="typeTitle"> ${data.title}</span>

                </div>
                <div>
                    <i class="fas fa-star star"></i>
                    <i class="fas fa-pen pen"></i>
                </div>
            </div>
            <div class="mgIconWrapper">
                <i class="far fa-calendar-alt messageIcon"></i>
                <span class="dateStamp">123</span>
                <i class="far fa-file messageIcon"></i>
                <i class="far fa-comment-dots messageIcon"></i>
            </div>
        </div>

`;

    })
}

// 星星處理
function starProcessing() {
    const chooseStar = document.querySelectorAll('.star');
    const RecordContainer = document.querySelectorAll('.recordContainer');
    const TitleContainer = document.querySelector('.titleContainer');
    // console.log(chooseStar);

    chooseStar.forEach((starData, index) => {
        // console.log(starData)
        starData.addEventListener('click', function () {
            // console.log("ddddddd");
            starData.classList.toggle('starColor');

            // RecordContainer.forEach((containerData, index) => {
            // TitleContainer.classList.toggle('titleContainerColor');
            RecordContainer[index - 1].classList.toggle('recordContainerColor');
            // })
        })
    })



}

