//Html element
//1)input for url
let urlBox=document.getElementById("url");
//2)input for request type:GET
let getRequest=document.getElementById("get");
//3)input for request type:POST
let postRequest=document.getElementById("post");
//3)textarea for request json
let requestJsonBox=document.getElementById("RequestJson");
//4)textarea for Respose
let responseBox=document.getElementById("Response");
//5) get Response button
let getResponseBtn=document.getElementById("getResponse")
//hiding request json box initially
requestJsonBox.style.display="none";

//hiding response box initially
responseBox.style.display="none";
//hiding request json box when get request is selected
getRequest.addEventListener('click',()=>{
  console.log("get request");
  requestJsonBox.style.display='none';
})
//hiding showing json box when POST request is selected
postRequest.addEventListener('click',()=>{
  console.log("post request");
  requestJsonBox.style.display='inline-block';
})
//request function running fetch() using async await
async function request(){
  //geting id of element to check what is selected get or post
  let requestType=document.querySelector("input[name='requestType']:checked").id;
  //geting url
  let url=urlBox.value;
  if (requestType=="get") {
    let response=await fetch(url);
    let data=await response.text();
    return data;
  }
  else{
    //parameters
    let params={
      method:"POST",
      body:requestJsonBox.value,
      headers: {
   'Content-type': 'application/json'
    }
    };
    let response=await fetch(url,params);
    let data=await response.text();
    return data;
  }
}

//show response when clicked on response button
getResponse.addEventListener('click',()=>{
  //showing responseBox
  responseBox.style.display='inline-block';
  //showing please wait.. in response box
		responseBox.innerHTML="Please wait...";
  //calling request() function and getting response
  request().then(data=>{
    response=data;
    responseBox.innerHTML=data;
  }).catch(error=>{
    response=error;
    console.log(error);
    responseBox.innerHTML=data;
  });
})
