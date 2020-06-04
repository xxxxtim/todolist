import { datasSorting, isNull } from './module.js';



(function main() {

    const inputTableHTML = `<div class="myFormWrapper">
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
                <label class="upload_cover">
                <input id="upload_input" type="file">
                <span class="upload_icon">➕</span>
              </label>
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

    // let myForm;
    // let titleText;
    // let yearText;
    // let hourText;
    // let commentText;
    // let datalist;
    // let inputTable;


    // 第一個星星狀態
    let starStaus;
    // 第一個打勾狀態
    let checkStatus;

    // button
    // let addTask;
    // let addTaskOfInptTbl;
    // let cancleOfInptTbl;
    // let starOfInptTbl;//星星
    // let checkOfInptTbl;//打勾
    // object
    let datas = [];
    // 排序後存取的array
    let data = {
        title: "",
        year: "",
        hour: "",
        done: false,//判斷有無打勾
        file: false,//判斷有無上傳檔案
        star: false,//判斷星星
        comment: "",
    }
    // myTask 跳頁面
    function initEventListener() {
        const myTask = document.querySelector('#myTask');
        myTask.addEventListener('click', () => {
            // const datalist = document.getElementById('plates');
            // datalist.innerHTML = '';

            renderMsgTable();

        })
    }



    // progress 跳頁面
    const inProgress = document.querySelector('#inProgress');
    inProgress.addEventListener('click', function () {
        // datalist = document.getElementById('plates');


        renderProgressData();
        // 刪除輸入表格
        removeInputTable();

    })

    // complete 跳頁面
    const complete = document.querySelector('#complete');
    complete.addEventListener('click', function () {
        // let arrOfComplete = datas.filter(function (data) {
        //     return data.done === true;

        // })
        renderCompleteData();
        // 刪除輸入表格
        removeInputTable();

    })

    // 按addTask 觸發事件
    const addTask = document.querySelector('.addTaskButton');
    addTask.addEventListener('click', randerInputTable);

    // 上方填空欄
    function randerInputTable() {
        // console.log(main)
        const inputTable = document.getElementById('mainWrapper');
        inputTable.innerHTML = inputTableHTML;


        // const myForm = document.getElementById('myForm');
        // const titleText = document.getElementById('title-text');
        // const yearText = document.getElementById('year-text');
        // hourText = document.getElementById('hour-text');
        // commentText = document.getElementById('comment-text');
        // datalist = document.getElementById('plates');
        // inputTable = document.getElementById('mainWrapper');

        starStaus = false;
        checkStatus = false;






        // 按第一個星星
        const starOfInptTbl = document.querySelector('.titleContainer .star');
        starOfInptTbl.addEventListener('click', starOfInptTblProcessing);
        // 第一個打勾
        const checkOfInptTbl = document.querySelector('.titleContainer [name="tick"]');
        checkOfInptTbl.addEventListener('click', checkOfInptTblProcessing);



        // 按按鈕 彈出下方表格 並且重新reset上方表格
        const addTaskOfInptTbl = document.querySelector('.addinput');
        addTaskOfInptTbl.addEventListener('click', addTaskOfInptTblProcessing);
        // 按按鈕 刪除下方表格
        const cancleOfInptTbl = document.querySelector('.cancleinput');
        cancleOfInptTbl.addEventListener('click', removeInputTable);

    }



    // 第1顆星星
    function starOfInptTblProcessing() {
        const titleContainer = document.querySelector('.titleContainer');
        const starOfInptTbl = document.querySelector('.titleContainer .star');
        // 資料更新
        starStaus = !starStaus;
        // 渲染頁面
        starOfInptTbl.classList.toggle('starColor');
        titleContainer.classList.toggle('recordContainerColor');
    }

    // 第一個打勾
    function checkOfInptTblProcessing() {
        const typeTitle = document.querySelector('.titleContainer .typeTitle');
        // 資料更新
        checkStatus = !checkStatus;
        // 渲染頁面
        typeTitle.classList.toggle('typeTitleLine');
    }


    // 按按鈕 刪除輸入表格
    function removeInputTable() {
        const inputTable = document.getElementById('mainWrapper');
        inputTable.innerHTML
            = ``;
    }
    // 按按鈕 彈出下方表格
    function addTaskOfInptTblProcessing(e) {
        const myForm = document.getElementById('myForm');
        // 加上preventDefault()避免每次submit都會重整網頁
        e.preventDefault();


        data = {
            // title: titleText.value,
            title: document.getElementById('title-text').value,
            year: document.getElementById('year-text').value,
            hour: document.getElementById('hour-text').value,
            done: checkStatus,//判斷有無打勾
            file: false,//判斷有無上傳檔案
            star: starStaus,//判斷星星
            comment: document.getElementById('comment-text').value,

        };



        datas.push(data);

        // 進行資料排序
        datas = datasSorting(datas);
        console.table(datas);


        // 重新渲染上方表格
        randerInputTable();
        // 顯示下方表格程式
        renderMsgTable();


        myForm.reset();

    }

    // sorting
    // function datasSorting() {
    //     let arrayOfComplete = datas.filter(function (data) {
    //         return data.done === true;

    //     });
    //     // 2.
    //     let arrayOfProcess = datas.filter(function (data) {
    //         return data.done === false;
    //     });

    //     let arrayOfStar = arrayOfProcess.filter(function (data) {
    //         return data.star === true;
    //     });

    //     let arrayOfNoStar = arrayOfProcess.filter(function (data) {
    //         return data.star === false
    //     });

    //     datas = [...arrayOfStar, ...arrayOfNoStar, ...arrayOfComplete];
    //     // 資料進行排序

    // }




    // 判斷是否為空白或空字串
    // function isNull(str) {
    //     if (str == "") return true;
    //     var regu = "^[ ] $";
    //     var re = new RegExp(regu);
    //     return re.test(str);
    // }


    // 顯示程式
    function renderMsgTable() {
        // console.log(datas);
        const datalist = document.getElementById('plates');
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

            // 判斷是否為空白或空字串
            // 是否有流言
            let messageIcon = '';
            if (!isNull(data.comment)) {
                messageIcon = '<i class="far fa-comment-dots messageIcon"></i>';
            }
            // 是否有輸入時間
            let calendar = '';
            if ((!isNull(data.year)) || (!isNull(data.hour))) {
                calendar = '<i class="far fa-calendar-alt messageIcon"></i>'
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
                ${calendar}
                <span class="dateStamp">${data.year}</span>
                <span class="dateStamp">${data.hour}</span>
                <i class="far fa-file messageIcon"></i>
                ${messageIcon}
            </div>
        </div>

`;
        })
        // 星星處理
        starOfMsgTblProcessing();
        // 打勾處理
        checkOfMsgTblProcessing();

        // 鉛筆處理
        penOfMsgTblProcessing();

        // 刪除處理
        removeData();

    }

    // 星星處理
    function starOfMsgTblProcessing() {
        const stars = document.querySelectorAll('#plates .star');
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

                renderMsgTable();
            })
        })
    }
    // 打勾處理
    function checkOfMsgTblProcessing() {
        const Ticks = document.getElementsByName("tick");
        // const TypeTitle = document.querySelectorAll('.typeTitle');

        Ticks.forEach((tick, index) => {
            tick.addEventListener('click', function (e) {

                // 資料更新處理
                let checkid = e.target.dataset.checkid;
                datas[checkid].done = !datas[checkid].done;
                console.table(datas);

                // 渲染畫面處理
                // TypeTitle[index].classList.toggle('typeTitleLine');
                renderMsgTable();
            })
        })
    }
    // 鉛筆處理
    function penOfMsgTblProcessing() {
        const pens = document.querySelectorAll('#plates .pen');
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
                const inputTable = document.getElementById('mainWrapper');
                inputTable.innerHTML = `<div class="myFormWrapper">
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
                        <label class="upload_cover">
                        <input id="upload_input" type="file">
                        <span class="upload_icon">➕</span>
                      </label>
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
                const cancleOfInptTbl = document.querySelector('.cancleinput');
                cancleOfInptTbl.addEventListener('click', removeInputTable);

                // // 按第一個星星
                const starOfInptTbl = document.querySelector('.titleContainer .star');
                starOfInptTbl.addEventListener('click', () => {
                    let titleContainer = document.querySelector('.titleContainer');
                    datas[penid].star = !datas[penid].star;

                    // 渲染頁面
                    starOfInptTbl.classList.toggle('starColor');
                    titleContainer.classList.toggle('recordContainerColor');
                });

                // // 按第一個打勾
                const checkOfInptTbl = document.querySelector('.titleContainer [name="tick"]');
                checkOfInptTbl.addEventListener('click', () => {
                    const typeTitle = document.querySelector('.titleContainer .typeTitle');
                    datas[penid].done = !datas[penid].done;

                    // 渲染頁面
                    typeTitle.classList.toggle('typeTitleLine');
                });

                console.table(datas);
                // 存取按鈕
                const addTaskOfInptTbl = document.querySelector('.addinput');
                addTaskOfInptTbl.addEventListener('click', (evt) => {
                    // 避免網頁重整
                    evt.preventDefault();
                    // 抓取修改資料
                    // const titleText = document.getElementById('title-text');
                    // yearText = document.getElementById('year-text');
                    // hourText = document.getElementById('hour-text');
                    // commentText = document.getElementById('comment-text');
                    // datalist = document.getElementById('plates');





                    // 資料寫入
                    datas[penid].title = document.getElementById('title-text').value;
                    datas[penid].year = document.getElementById('year-text').value;
                    datas[penid].hour = document.getElementById('hour-text').value;
                    datas[penid].comment = document.getElementById('comment-text').value;
                    // datas[penid].star = starStaus;
                    // datas[penid].done = checkStatus;



                    console.table(datas);


                    // 渲染畫面
                    renderMsgTable();

                    randerInputTable();


                });
            })

        })

    }//penProcessing


    function removeData() {
        const trashs = document.querySelectorAll('#plates .trash');
        trashs.forEach((trash, index) => {
            trash.addEventListener('click', function (e) {
                if (confirm('你確定刪除這筆資料嗎？')) {
                    var trashid = e.target.dataset.trashid;
                    datas.splice(trashid, 1);
                    renderMsgTable();
                }
            })

        })
    }


    function renderProgressData() {
        const datalist = document.getElementById('plates');
        // console.log(datas)
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

            // 判斷是否為空白或空字串
            // 是否有流言
            let messageIcon = '';
            if (!isNull(data.comment)) {
                messageIcon = '<i class="far fa-comment-dots messageIcon"></i>';
            }
            // 是否有輸入時間
            let calendar = '';
            if ((!isNull(data.year)) || (!isNull(data.hour))) {
                calendar = '<i class="far fa-calendar-alt messageIcon"></i>'
            }


            if (data.done === false) {

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
                ${calendar}
                <span class="dateStamp">${data.year}</span>
                <span class="dateStamp">${data.hour}</span>
                <i class="far fa-file messageIcon"></i>
                ${messageIcon}
            </div>
        </div>

`;
            }
            else {
                return ``;
            }
        })
        // 星星處理
        starOfMsgTblProcessing();
        // 打勾處理
        checkOfMsgTblProcessing();

        // 鉛筆處理
        penOfMsgTblProcessing();

        // 刪除處理
        removeData();

    }


    function renderCompleteData() {
        const datalist = document.getElementById('plates');
        // console.log(datas)
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

            // 判斷是否為空白或空字串
            // 是否有流言
            let messageIcon = '';
            if (!isNull(data.comment)) {
                messageIcon = '<i class="far fa-comment-dots messageIcon"></i>';
            }
            // 是否有輸入時間
            let calendar = '';
            if ((!isNull(data.year)) || (!isNull(data.hour))) {
                calendar = '<i class="far fa-calendar-alt messageIcon"></i>'
            }


            if (data.done === true) {

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
                ${calendar}
                <span class="dateStamp">${data.year}</span>
                <span class="dateStamp">${data.hour}</span>
                <i class="far fa-file messageIcon"></i>
                ${messageIcon}
            </div>
        </div>

`;
            }
            else {
                return ``;
            }
        })
        // 星星處理
        starOfMsgTblProcessing();
        // 打勾處理
        checkOfMsgTblProcessing();

        // 鉛筆處理
        penOfMsgTblProcessing();

        // 刪除處理
        removeData();
        // dsijfoidsjfioj

    }

    initEventListener();
}())//mains