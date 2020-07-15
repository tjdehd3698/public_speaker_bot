const axios = require("axios");
const cheerio = require("cheerio");

var bookName = '수제비정보처리기사';    //책제목 하드코딩 -> 나중에 수정
var getBarcodeUrl = 'https://search.kyobobook.co.kr/web/search?vPstrKeyWord=' + encodeURI(bookName) + '&orderClick=LET';

async function getHTML(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
}

getHTML(getBarcodeUrl).then(html => {
    const $ = cheerio.load(html.data);
    const bodyList = $("tbody#search_list").children("input");
    var bookBarcode = $(bodyList[0]).val(); //책 바코드 가져오기
    console.log('책 바코드 : '+bookBarcode);
    var getBranchCodeUrl = 'http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=' + bookBarcode + '&orderClick=LET&Kc=';
    return getHTML(getBranchCodeUrl);
}).then(html => {
    // 지점코드 가져오는 부분
    /*
    const $ = cheerio.load(html.data);
    const table = $('#storeStockTable > table');
    const tr_list = $(table).children("tbody").children("tr");
    for (var row = 0; row < tr_list.length; row++) {
        var cells = tr_list.eq(row).children();
        var cols = [];
        for (var col = 0; col < cells.length; col++) {
            var value = cells.eq(col).text();
            cols.push(value);
            console.log(value);
        }
    }
    */
    return branchCode;
}).then(branchCode => {
    var getLocationUrl = 'http://mkiosk.kyobobook.co.kr/kiosk/product/bookInfoInk.ink?site=' + branchCode + '&ejkGb=KOR&barcode=' + bookBarcode + '&map=Y&orderClick=JFH';
    return getHTML(getLocationUrl);
}).then(html => {   //책 정보(재고, 위치, 위치이미지) 가져오기
    const $ = cheerio.load(html.data);
    const bookStock = $("div.p_stock").children('strong').text();   //재고 가져오기
    const body = $("div.p_stock").children("dl");
    var bookLocation = {
        first: $(body).children("dt").find('strong').text(),
        second: $(body).children("dd").text()
    }
    bookLocation = bookLocation.first + bookLocation.second.replace(/[\t\n]/g, ''); //위치 가져오기
    const bookLocationImg = $("div.map").find("img").attr('src');   //위치이미지 가져오기
    const bookInformation = {
        stock: bookStock,
        location: bookLocation,
        locationImg: bookLocationImg
    }
    console.log(bookInformation);
    return bookInformation;
}).then(res => module.exports.bookInformation = res)