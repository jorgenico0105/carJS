// Variables
const carrito =document.querySelector('#carrito')

const listCursos = document.querySelector('#lista-cursos')

const printCar=document.querySelector('#lista-carrito tbody')

const deletCar=document.querySelector('#vaciar-carrito')

let carShop=[];

cargarEventListeners()
function cargarEventListeners(){
    //Agrefgar un curso presionando 'Agregar al Carrito'
    listCursos.addEventListener('click',agreagrCurso);
    carrito.addEventListener('click',eliminarCurso)
    deletCar.addEventListener('click',()=>{
        carShop=[];
        cleanHtml();
    })
  
}
function agreagrCurso(e){
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')){
        const selecCurse=e.target.parentElement.parentElement;//accedemos a los padres mediante html 
        readDat(selecCurse)
    }
}
//LEEMOS LOS DATOS DEL HTML Y LO AFREGADOS
function readDat(curso){//curos se convierte en el nuevo html porque de ahi vamos a scar la infromacion 
    //console.log(curso)
    //crear obj
    const infoCar={
        imagen:curso.querySelector('img').src,//accedemos a atributos 
        titulo:curso.querySelector('h4').textContent,//accedemos al contenido 
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //revisa si exsite 
    const existe = carShop.some(curso => curso.id===infoCar.id)
    if (existe){
        const cursos= carShop.map(curso=>{
            if (curso.id===infoCar.id){
                curso.cantidad ++;
                return curso;//retonna objeto actulizado
            }else {
                return curso;//retorna objetos no duplicados
            }
        })
        carShop=[...cursos]
    }else{
        carShop.push(infoCar)
    }   
    //agregamos a el arreglo nuestros elementos 
    
    
    console.log(carShop)
    showCar()
}
//muestra carrito en html 
function showCar(){
    //se puede utilizar un destructuring
    cleanHtml();
    carShop.forEach( arti=> {
        const row=document.createElement('tr')
        row.innerHTML=`
         <td>
            <img src="${arti.imagen}" width=100px/>
        </td>
        <td>
            ${arti.titulo}
        </td>
        <td>
            ${arti.precio}
        </td>
        <td>
            ${arti.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${arti.id}">X</a
        </td>
        `;
        printCar.appendChild(row)
    }
    )
}
function cleanHtml(){
    //forma lenta
    //printCar.innerHTML=''
    //Mejor forma
    while (printCar.firstChild){//si es que ahy un hijo elimina 
        printCar.removeChild(printCar.firstChild)
    } 
}
function eliminarCurso(e){
    console.log(e.target.classList)
    if (e.target.classList.contains('borrar-curso')){
        const id=e.target.getAttribute('data-id')
        //elimina del arreglo
        carShop=carShop.filter(curso=>curso.id!==id)
        showCar()
    }
}
