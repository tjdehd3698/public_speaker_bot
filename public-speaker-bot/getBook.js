const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML() {
  try {
    return await axios.get("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%85%80%EB%9F%AC");
  } catch (error) {
    console.error(error);
  }
}

getHTML()
  .then(html => {
    let liList = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("div.cs_bestseller").children("ol.thumb_list").children("li");
    
    bodyList.each(function(i, elem){
        liList[i]={
            title: $(this).find('dt').text()
        };
    });
    return liList;
  })
  .then(res => console.log(res)); // 저장된 결과를 출력