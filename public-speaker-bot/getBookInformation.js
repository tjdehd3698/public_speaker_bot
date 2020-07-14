const axios = require("axios");
const cheerio = require("cheerio");

var bookName = '수제비정보처리기사';    //책제목 하드코딩 -> 나중에 수정
var getBarcodeUrl = 'https://search.kyobobook.co.kr/web/search?vPstrKeyWord=' + encodeURI(bookName) + '&orderClick=LET';

//책 바코드 html 가져오기
async function getBookBarcodeHTML() {
    try {
        return await axios.get(getBarcodeUrl);
    } catch (error) {
        console.error(error);
    }
}

//책 정보 html 가져오기
async function getBookInformationHTML(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
}

getBookBarcodeHTML().then(html => { //바코드 가져오기
    const $ = cheerio.load(html.data);
    const bodyList = $("tbody#search_list").children("input");
    var bookBarcode = $(bodyList[0]).val();
    return bookBarcode;
}).then(bookBarcode => {    //가져온 바코드로 책 정보 검색
    var branch = '05';    //지점코드 하드코딩 -> 나중에 수정
    var getLocationUrl = 'http://mkiosk.kyobobook.co.kr/kiosk/product/bookInfoInk.ink?site=' + branch + '&ejkGb=KOR&barcode=' + bookBarcode + '&map=Y&orderClick=JFH';
    return getBookInformationHTML(getLocationUrl);
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