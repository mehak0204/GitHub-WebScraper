//esversion:6
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";//this link is add to solve the error: "self signed certificate in certificate chain"

const url="https://github.com/topics";
const request=require("request");
const cheerio=require("cheerio");
const http=require("http");
const getReposePageHtml=require("./reposePage");
const pdfkit=require("pdfkit");

request(url,cb);
function cb(err,request,html) {
    if(err){
        console.log(err);
    }
    // else if (response.statusCode==404){
    //     console.log("Page not found");
    // }
    else{
    getElementLink(html);
    }
}
    function getElementLink(html){
        let $=cheerio.load(html);
        let linkElemArr=$(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<linkElemArr.length;i++){
            let href=$(linkElemArr[i]).attr("href");
            let topic=href.split("/").pop();
            let fullLink = `https://github.com/${href}`;
            console.log(fullLink);
            getReposePageHtml(fullLink,topic);
        }
    }
   
    
