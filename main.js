const myForm = document.getElementById('myForm');
const titleText = document.getElementById('title-text');
const yearText = document.getElementById('year-text');
const hourText = document.getElementById('hour-text');
const commentText = document.getElementById('comment-text');
const datalist = document.getElementById('plates');

// button
const addInput = document.querySelector('.addinput');
const cancleInput = document.querySelector('.cancleinput');

const datas = [];

addInput.addEventListener('click', pushData);
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
        done: false,
        file: false,
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
    // console.log(datalist)
    datalist.innerHTML = datas.map((data, i) => {
        return `
        <div class="recordContainer">
            <div class="messageContainer">
                <div>
                    <input type="checkbox">
                    <input class="typeTitle" type="text" placeholder="${data.title}">
                </div>
                <div>
                    <i class="far fa-star star"></i>
                    <i class="fas fa-pen pen"></i>
                </div>
            </div>
            <div class="mgIconWrapper">
                <i class="far fa-file messageIcon"></i>
                <i class="far fa-comment-dots messageIcon"></i>
            </div>
        </div>

`

    })
}
