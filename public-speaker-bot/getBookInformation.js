const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

module.exports.getBookLocation = async (name, branch) => {
    var userBookName = name;    //책제목 하드코딩 -> 나중에 수정
    var userBranch = branch;  //사용자가 원하는 지점이름 하드코딩 -> 나중에 수정

    var getBarcodeUrl = 'https://search.kyobobook.co.kr/web/search?vPstrKeyWord=' + encodeURI(userBookName) + '&orderClick=LET';
    var getBranchCodeUrl = 'http://www.kyobobook.co.kr/storen/info/StorePosition.jsp';

    async function getHTML(url) {
        try {
            return await axios({
                url,
                method: "GET",
                responseType: "arraybuffer"
            });
        } catch (error) {
            console.error(error);
        }
    }
    function getInternetAttachment(url) {
        // NOTE: The contentUrl must be HTTPS.
        return {
            name: 'architecture-resize.png',
            contentType: 'image/png',
            contentUrl: url
        };
    }

    var userData = {};  //사용자가 찾는 책의 바코드와 원하는 지점의 코드가 들어가는 객체
    getHTML(getBarcodeUrl).then(html => {   //책 바코드 가져오기
        const $ = cheerio.load(html.data);
        const bodyList = $("tbody#search_list").children("input");
        var userBookBarcode = $(bodyList[0]).val();
        //console.log('책 바코드 : ' + userBookBarcode);
        userData['userBookBarcode'] = userBookBarcode;
        return getHTML(getBranchCodeUrl);
    }).then(html => {   //지점 이름과 코드 정보 가져오기
        const h = iconv.decode(html.data, "EUC-KR").toString();
        const $ = cheerio.load(h);
        const trList = $('div#store_content tbody').children('tr');
        var branchOffices = {};   //지점 이름과 코드 매칭시켜놓은 객체
        for (var row = 0; row < trList.length; row++) {
            var cells = trList.eq(row).children();
            for (var col = 0; col < cells.length; col++) {
                var branchName = cells.eq(col).text();
                var branchCode = cells.eq(col).find('a').attr('data-code');
                branchOffices[branchName] = branchCode;
            }
        }
        userBranchCode = branchOffices[userBranch];
        //console.log('지점 코드 : ' + userBranchCode);
        userData['userBranchCode'] = userBranchCode;
        return userData;
    }).then(userData => {
        var getLocationUrl = 'http://mkiosk.kyobobook.co.kr/kiosk/product/bookInfoInk.ink?site=' + userData.userBranchCode + '&ejkGb=KOR&barcode=' + userData.userBookBarcode + '&map=Y&orderClick=JFH';
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
       // console.log(getInternetAttachment(bookLocationImg));
        const bookInformation = {
            stock: bookStock,
            location: bookLocation,
            locationImg: getInternetAttachment(bookLocationImg)
        }
        //console.log(bookInformation);
        return bookInformation;
    }).then(res => module.exports.bookInformation = res)
}