const token__input = document.querySelector("#token__input")
const savetoken__btn = document.querySelector("#savetoken__btn")

const emptyCard =  { id: '', title: '', text: '', column: '', priority: '', color: '', reminder: '', createdAt: '' }
if(!localStorage.getItem("token") || localStorage.getItem("token") == null){
   alert("Нет токена!")
}else{
    token__input.value = localStorage.getItem("token")
   loadPage()
}
savetoken__btn.addEventListener("click", function(){
    if(!token__input.value){
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
    try {
      const response = await fetch(`http://192.168.1.106:4200/api/tasks`,{
        method: 'GET',
        headers:{
            'Authorization': `${localStorage.getItem("token")}`
        }
      }  
      )
    let result = await response.json()
    console.log(result)
    renderNotes(result)
    } catch (error) {
        console.error("Ошибка прихода данных: " + error)
    }
}
function renderNotes(data){
    const container = document.querySelector(".col-pending")
    data.forEach(element => {
        const newCard = {...emptyCard}
        newCard.title = element.title
        renderAll(newCard)
    });

}
function renderAll(notes) {
      const columns = ['pending'];
      columns.forEach(col => {
        const body = document.getElementById('body-' + col);
        const count = document.getElementById('count-' + col);
        const colNotes = notes.filter(n => n.column === col);
        count.textContent = colNotes.length;
        body.innerHTML = '';
        colNotes.forEach(note => {
          body.appendChild(createNoteElement(note));
        });
      });
      setupReminderChecks();
}