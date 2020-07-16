const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

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

getHTML(getBranchCodeUrl).then(html => {   //지점 이름과 코드 정보 가져오기
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
    return branchOffices;
}).then(res => module.exports.branchList = res)