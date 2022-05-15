const request=require("request");
const cheerio=require("cheerio");
const http=require("http");
const getIssuePageHtml=require("./issues.js");

function getReposePageHtml(url,topic) {
    request(url,cb);
    function cb(err,request,html) {
    if(err){
        console.log(err);
    }
    // else if (response.statusCode==404){
    //     console.log("Page not found");
    // }
    else{
       getReposeLink(html);
    }
}
function getReposeLink(html) {
    let $=cheerio.load(html);
    let headingAttr=$(".f3.color-fg-muted.text-normal.lh-condensed");
    console.log(topic);
    for(let i=0;i<8;i++){
        let twoAnchors=$(headingAttr[i]).find("a");
        let link=$(twoAnchors[1]).attr("href");
        let fullLink=`https://github.com${link}/issues`;
          let repoName=link.split("/").pop();
        getIssuePageHtml(fullLink,topic);
    }
    console.log("''''''''''''''''''''''''''''''''"); 
}
}
module.exports=getReposePageHtml;

