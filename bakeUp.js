
var myForm = document.getElementById('myForm');
var titleText = document.getElementById('title-text');
var yearText = document.getElementById('year-text');
var hourText = document.getElementById('hour-text');
var commentText = document.getElementById('comment-text');
var datalist;
var main = document.getElementById('mainWrapper');
// console.log(main)


// button
var addTask = document.querySelector('.addTaskButton')
var addInput = document.querySelector('.addinput');
var cancleInput = document.querySelector('.cancleinput');

var datas = [];


addTask.addEventListener('click', () => {
    console.log(main)
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

    var addInput = document.querySelector('.addinput');
    var cancleInput = document.querySelector('.cancleinput');

    var datas = [];
    addInput.addEventListener('click', pushData);
});




// addInput.addEventListener('click', pushData);
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

    // 清空輸入欄位的文字
    myForm.reset();

}

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
                <i class="far fa-file messageIcon"></i>
                <i class="far fa-comment-dots messageIcon"></i>
            </div>
        </div>

`;

    })
}
