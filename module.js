export function datasSorting(datas) {
    let arrayOfComplete = datas.filter(function (data) {
        return data.done === true;

    });
    // 2.
    let arrayOfProcess = datas.filter(function (data) {
        return data.done === false;
    });

    let arrayOfStar = arrayOfProcess.filter(function (data) {
        return data.star === true;
    });

    let arrayOfNoStar = arrayOfProcess.filter(function (data) {
        return data.star === false
    });

    return datas = [...arrayOfStar, ...arrayOfNoStar, ...arrayOfComplete];
    // 資料進行排序

}

export function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ] $";
    var re = new RegExp(regu);
    return re.test(str);
}