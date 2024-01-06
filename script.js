const search_bar=document.querySelector("[search_bar]");
const searchbtn=document.querySelector("[searchbtn]");
const infocontainer=document.querySelector("[infocontainer]");
const profile_img=document.querySelector("[profile_img]");
const profile_name=document.querySelector("[profile_name]");
const joined_date=document.querySelector("[date]");
const profile_link=document.querySelector("[profilelink]");
const description=document.querySelector("[description]");
const repos=document.querySelector("[repos]");
const follower=document.querySelector("[follower]");
const following=document.querySelector("[following]");
const city=document.querySelector("[city]");
const link1=document.querySelector("[link1]");
const link2 =document.querySelector("[link2]");
const link3=document.querySelector("[link3]");
const modebtn=document.querySelector("[modebtn]");
const wrapper=document.querySelector(".wrapper");
const tophead=document.querySelector(".tophead");
const search_tab=document.querySelector(".search_tab");
const loading=document.querySelector(".loading");
const dog=document.querySelector(".dog");

const notfound=document.querySelector(".notfound");


let mode=1;
let date=new Date;
let hours=String(date.getHours()).padStart(2, '0');
console.log(hours);

console.log(date);
if(hours>=19 && hours<6 )
{
    mode=0;
}
changemode();

function changemode()
{
   
    if(mode==1)
    {
        wrapper.classList.add("wrapper_dark");
        tophead.classList.add("tophead_dark");
        search_tab.classList.add("search_tab_dark");
        infocontainer.classList.add("info_container_dark");
        dog.classList.add("dog_dark");

        modebtn.innerHTML=`<i class="fa-solid fa-moon"></i>`;

        document.querySelector(".modetype").innerText="DARK";
        mode=0;

    }
    else
    {
        wrapper.classList.remove("wrapper_dark");
        tophead.classList.remove("tophead_dark");
        search_tab.classList.remove("search_tab_dark");
        infocontainer.classList.remove("info_container_dark");
        dog.classList.remove("dog_dark");

        modebtn.innerHTML=`<i class="fa-regular fa-lightbulb"></i>`;
        document.querySelector(".modetype").innerText="LIGHT";
        mode=1;
    }
}
modebtn.addEventListener("click",()=>changemode())

infocontainer.classList.add("hide");
searchbtn.addEventListener("click",getuser);
document.addEventListener("keydown",function(event){
    if( event.key=="Enter" && search_bar.value!="")
    {
        getuser();

    }
})

function getuser()
{
    let user_name=search_bar.value;
    if(user_name!="")
    {
        callapi(user_name);
    }
}

async function callapi(user_name)
{
    

    try
    {
        console.log("hello");
        notfound.classList.add("hide");
        infocontainer.classList.add("hide");
        loading.classList.remove("hide");
        const promisdata=await fetch(`https://api.github.com/users/${user_name}`);
        const data= await promisdata.json();
        loading.classList.add("hide");
        if(data?.message==="Not Found")
        {
            notfound.classList.remove("hide");
        }
        else
        {
            notfound.classList.add("hide");
            putdata(data);
        }
        
    }
    catch(err)
    {
        alert("error");
    }
}

function putdata(data)
{
    console.log(data);
    infocontainer.classList.remove("hide");
    profile_img.src=data?.avatar_url;
    if(data?.name!=null)
        profile_name.innerText=data?.name;
    else
        profile_name.innerText="not available"
    profile_link.href=data?.html_url;
    profile_link.innerText=data?.login;
    description.innerText=data?.bio;
    repos.innerText=data?.public_repos;
    follower.innerText=data?.followers;
    following.innerText=data?.following;

    if(data?.location!=null)
        city.innerText=data?.location


let date = (data?.created_at).slice(0,10);
joined_date.innerText="joined "+ date;

}