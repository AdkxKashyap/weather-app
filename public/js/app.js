console.log('Client side javascript file is loaded!')


const searchForm=document.getElementById('searchForm')
const searchValue=document.getElementById('search')

const para1=document.querySelector("#msg1")
const para2=document.querySelector("#msg2")
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    para1.textContent=""
    para2.textContent=""
    para1.textContent="Fetching Data..."
    const location=searchValue.value
    var url="/weather?address="+location
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.errorMessage){
                para1.textContent=data.errorMessage
                
            }
            else{
                para1.textContent=data.place
                para2.textContent=data.forecast
            }
        })
    })
})