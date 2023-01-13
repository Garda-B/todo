import { useEffect, useState } from 'react'
import sun from "./images/icon-sun.svg"
import moon from "./images/icon-moon.svg"
import check from "./images/icon-check.svg"
import cross from "./images/icon-cross.svg"


import './App.css'

function App() {


  const [todo, setTodo] = useState([{
    text: "",
    completed: false
  }])

  const [todoState, setTodoState] = useState("all")
  const [theme, setTheme] = useState("light")



  const handleTodoState = (e) => {

    setTodoState(e.target.name)

  }


  const handleSubmit = (e) => {

    e.preventDefault()

    if (e.target.elements.onedo.value !== "") {
      setTodo([...todo, { text: e.target.elements.onedo.value, completed: false }])
    }

    e.target.elements.onedo.value = ""

  }



  const handleDelete = (index) => {


    setTodo(
      todo.map((element, i) => { if (index === i && element.completed === false) { return { ...element, completed: true } } else if (index === i && element.completed === true) { return { ...element, completed: false } } return element }))

  }


  const handleRemove = (index) => {

    const filtered = todo.filter((x, i) => { if (i !== index) { return x } })
    setTodo(filtered)

  }


  const activeremains = todo.filter((x) => x.completed == false).length - 1


 const handleClearComplete = () => {

        const filtered = todo.filter((item) => item.completed == false)
        setTodo(filtered)

 }


const handleTheme = (e) => {

  if (theme == "light") {
    setTheme("dark")
  } else {
    setTheme("light")
  }
  
  
}

useEffect(() => {

  
  document.body.className = `${theme}-theme`

}, [theme])


  return (
    <div>
      <header className='pic'></header>
      <main className='wrapper'>
        <div className='flex largefont'>
          <div>TODO</div>
          <img onClick={handleTheme} src={theme == "light" ? moon : sun}></img>

        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input label="input" type="text" style={{color: theme == "dark" ? "hsl(236, 33%, 92%)" : "hsl(236, 9%, 61%)"}} name="onedo" placeholder='Create a new todo...'></input>
        </form>


        <div className={theme == "light" ? "shadow" : "null"}>

          <div className='todos'>
            {todo.map((element, i) => {

              if (element.text !== "") {
                return (
                  <div key={i} className="flex todo" style={{ ...{ color: element.completed === true ? "var(--Light-Grayish-Blue)" : "var(--Dark-Grayish-Blue)" }, ...{ display: element.completed === true && todoState == "active" ? "none" : element.completed === false && todoState == "completed" ? "none" : "flex" }, ...{ textDecoration: element.completed == true ? 'line-through' : 'none' } }}>
                    <div onClick={() => handleDelete(i)} className='flex item'><div className='circle' style={{ ...{ background: element.completed === false ? "var(--background)" : "var(--Check-Background)" }, ...{ border: element.completed === false ? "solid 1px" : "none" } }}>{element.completed == true ? <img src={check}></img> : null }</div>
                      <p>{element.text}</p></div>
                    <img onClick={() => handleRemove(i)} src={cross}></img>

                  </div>)
              }

            })}


          </div>

          
          <div className='flex bottommenu'>
            <div>{activeremains} items left</div>
            <button className={`${todoState == "all" ? "active" : ""}`} onClick={(e) => handleTodoState(e)} name="all">All </button>
            <button className={`${todoState == "active" ? "active" : ""}`} onClick={(e) => handleTodoState(e)} name="active">Active</button>
            <button className={`${todoState == "completed" ? "active" : ""}`} onClick={(e) => handleTodoState(e)} name="completed">Completed</button>
            <button onClick={handleClearComplete}>Clear completed</button>

          </div>

          <div className='flex bottommenumobile'>
            <div className='flex upperpart'><div>{activeremains} items left</div>
            <button onClick={handleClearComplete}>Clear completed</button>
            </div>
            
            <div className='flexbottom lowerpart'>
            <button className={`${todoState == "all" ? "active" : ""}`} onClick={(e) => handleTodoState(e)} name="all">All </button>
            <button className={`${todoState == "active" ? "active" : ""}`} onClick={(e) => handleTodoState(e)} name="active">Active</button>
            <button className={`${todoState == "completed" ? "active" : ""}`} onClick={(e) => handleTodoState(e)} name="completed">Completed</button>
            </div>

          </div>


        </div>
      </main>


    </div>
  )
}

export default App
