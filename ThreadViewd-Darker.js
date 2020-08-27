// ==UserScript==
// @name         PtReadFilter
// @namespace    https://github.com/lycloudqaq/ThreadViewed-Darker
// @version      1.2
// @description  加深点击后的条目
// @author       lycloud
// @match        *://share.dmhy.org/*
// @match        *://pterclub.com/*
// @match        *://www.beitai.pt/*
// @match        *://avgv.cc/*
// @match        *://www.hddolby.com/*
// @match        *://www.pthome.net/*
// @match        *://pt.btschool.club/*
// ==/UserScript==

/*
1、初始化readTrIdArray数组并写入localstorage中已有的帖子Id
2、遍历Tr 将readTrIdArray数组内的已有Id的帖子变灰
3、加入EventListner监听mosuedown事件
    I、mousedown事件变灰帖子
    II、将帖子Id写入localstorage
*/

(function () {
    var host = window.location.host;
    switch (host) {
        // case "moecat.best":
        //     doubleTrFilter(); break;
        case "share.dmhy.org":
            dmhyFilter(); break;
        case "www.pthome.net":
            singleTrFilterPthome(); break;
        default:
            singleTrFilter(); break;
    }

    function singleTrFilter() {
        var readTrIdArray = [];
        readTrIdArray = readTrIdArray.concat(JSON.parse(localStorage.getItem('read')));
        var readTr = document.querySelectorAll("table.torrents>tbody>tr table.torrentname>tbody>tr>td>a");
        for (var i = 0; i < readTr.length; i++) {
            readTr[i].addEventListener('mousedown', function () {
                var readTrId = Number(((/(?<=\?id=)\d+/).exec(this.href)).toString());
                if (readTrIdArray.includes(readTrId) == false) {
                    this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
                    this.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
                    readTrIdArray.push(readTrId);
                    if (readTrIdArray.length > 100) { readTrIdArray.shift() };
                    localStorage.setItem('read', JSON.stringify(readTrIdArray));
                }
            })
            var readTrId = Number(((/(?<=\?id=)\d+/).exec(readTr[i].href)).toString());
            if (readTrIdArray.includes(readTrId) == true) {
                readTr[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
                readTr[i].parentNode.parentNode.setAttribute("style", "background-color:#909090;");
            }
        }
    }

    function singleTrFilterPthome() {
        var readTrIdArray = [];
        readTrIdArray = readTrIdArray.concat(JSON.parse(localStorage.getItem('read')));
        var readTr = document.querySelectorAll("table.torrents>tbody>tr table.torrentname>tbody>tr>td>a");
        for (var i = 0; i < readTr.length; i++) {
            readTr[i].addEventListener('mousedown', function () {
                var readTrId = Number(((/(?<=\?id=)\d+/).exec(this.href)).toString());
                if (readTrIdArray.includes(readTrId) == false) {
                    this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
                    this.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
                    readTrIdArray.push(readTrId);
                    if (readTrIdArray.length > 100) { readTrIdArray.shift() };
                    localStorage.setItem('read', JSON.stringify(readTrIdArray));
                }
            })
            var readTrId = Number(((/(?<=\?id=)\d+/).exec(readTr[i].href)).toString());
            if (readTrIdArray.includes(readTrId) == true) {
                readTr[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
                readTr[i].parentNode.parentNode.setAttribute("style", "background-color:#909090;");
            }
        }
    }

    // function doubleTrFilter() {
    //     var readTrIdArray = [];
    //     readTrIdArray = readTrIdArray.concat(JSON.parse(localStorage.getItem('read')));
    //     var readTr = document.querySelectorAll("table.torrents>tbody>tr>td>table>tbody>tr>td>a");
    //     for (i = 0; i < readTr.length; i++) {
    //         readTr[i].addEventListener('mousedown', function () {
    //             var readTrId = Number(((/(?<=\?id=)\d+/).exec(this.href)).toString());
    //             if (readTrIdArray.includes(readTrId) == false) {
    //                 this.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
    //                 this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
    //                 readTrIdArray.push(readTrId);
    //                 if (readTrIdArray.length > 100) { readTrIdArray.shift() };
    //                 localStorage.setItem('read', JSON.stringify(readTrIdArray));
    //             }
    //         })
    //         var readTrId = Number(((/(?<=\?id=)\d+/).exec(readTr[i].href)).toString());
    //         if (readTrIdArray.includes(readTrId) == true) {
    //             readTr[i].parentNode.parentNode.setAttribute("style", "background-color:#909090;");
    //             readTr[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("style", "background-color:#909090;");
    //         }
    //     }
    // }

    function dmhyFilter() {
        var filterTr = document.querySelectorAll("table#topic_list>tbody>tr.even");
        for (var i = 0; i < 40; i++) {
            filterTr[i].setAttribute("class", "odd")
        }
        filterTr = document.querySelector("table#topic_list");
        filterTr.setAttribute("border", "1");
        filterTr.setAttribute("style", "border-collapse: collapse;border-color: #000;");

        var readTrIdArray = [];
        readTrIdArray = readTrIdArray.concat(JSON.parse(localStorage.getItem('read')));
        var readTr = document.querySelectorAll("tr>.title>a");
        for (i = 0; i < readTr.length; i++) {
            readTr[i].addEventListener('mousedown', function () {
                var readTrId = Number(((/(?<=view\/)\d+/).exec(this.href)).toString());
                if (readTrIdArray.includes(readTrId) == false) {
                    this.parentNode.parentNode.setAttribute("style", "background-color:#ccc;");
                    readTrIdArray.push(readTrId);
                    if (readTrIdArray.length > 100) { readTrIdArray.shift() };
                    localStorage.setItem('read', JSON.stringify(readTrIdArray));
                }
            })
            var readTrId = Number(((/(?<=view\/)\d+/).exec(readTr[i].href)).toString());
            if (readTrIdArray.includes(readTrId) == true) {
                readTr[i].parentNode.parentNode.setAttribute("style", "background-color:#ccc;");
            }
        }
    }
})()
