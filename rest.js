const token__input = document.querySelector("#token__input")
const savetoken__btn = document.querySelector("#savetoken__btn")
if(localStorage.getItem("token") == ''){
   alert("Нет токена!")
}else{
    token__input.value = localStorage.getItem("token")
   loadPage()
}
savetoken__btn.addEventListener("click", function(){
    if(token__input.value == ''){
        alert("Введите токен!")
        return
    }
    localStorage.setItem("token", `${token__input.value}`)
    alert("Токен успешно сохранен!")
    loadPage()
})
function loadPage(){
    const token = localStorage.getItem("token")
    getNotes(token)
}
async function getNotes(token) {
    console.log("может работает " + localStorage.getItem("token"))
    try {
      const response = await fetch(`http://192.168.1.108:4200/api/tasks?token=${token}`)
    } catch (error) {
        console.error("Ошибка прихода данных: " + error)
    }
}