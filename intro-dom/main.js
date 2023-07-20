const todos = JSON.parse(localStorage.getItem('todos'))|| []
const render = () =>{
        const to_do_list = document.getElementById('to-do-list');
        const ToDosTemplate =todos.map(t => '<li>' + t +'</li>');
        to_do_list.innerHTML = ToDosTemplate.join('');
        const elementos = document.querySelectorAll('#to-do-list li');
        elementos.forEach((elemento,i) => {
            elemento.addEventListener('click', () => {
                elemento.parentNode.removeChild(elemento)
                todos.splice(i,1)
                ActualizaTodos(todos)
                render()
                
            })
        
        });
}
const ActualizaTodos = (todos) => {
    const todoStrings = JSON.stringify(todos);
    localStorage.setItem('todos',todoStrings)
} 
window.onload=() =>{
    render()
    const form = document.getElementById('to-do-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const to_do = document.getElementById('to-do')
        const To_do_text = to_do.value;
        to_do.value = '';
        todos.push(To_do_text);
        ActualizaTodos(todos)
        render() 
    }
}