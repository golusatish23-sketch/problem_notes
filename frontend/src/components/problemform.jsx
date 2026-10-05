import { useState } from "react"
import axios from 'axios';
function ListField({label,items,placeholder,addText,setItems}){

    function changeItem(index,value){
        setItems(items.map((item,i)=>(i===index?value:item)))
    }
    
    function addItem(){
        setItems([...items,""])
    }

    function removeItem(index){
        setItems(items.filter((_,i)=>i!==index))
    }

    return(
        <div className="field">
            <span>{label}</span>
            {items.map((item,index)=>(
                <div className="row" key={index}>
                    <input 
                        value={item}
                        onChange={(e)=>changeItem(index,e.target.value)}
                        placeholder={placeholder}/>

                    <button 
                        type="button"
                        className="remove"
                        onClick={()=>removeItem(index)}
                        disabled={item.length===1}
                        aria-label="Remove">   
                        x
                        </button>
                </div>
            ))}
            <button type="button" className="add"
            onClick={addItem} >
                {addText}
            </button>
        </div>
    )

}
export default function ProblemForm({onSave,onCacel}){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")

    const [when,setWhen]=useState("")
    const [where,setWhere]=useState('')
    const [whoAffected,setwhoAffted]=useState("")

    const [symptoms,setSymptoms]=useState([""])
    const [why,Setwhy]=useState([""]);
    const [rootCause,setRootCause]=useState([""])
    const [solutions,setSolution]=useState([{tittle:"",explanation:""}])
    const [saving,setsaving]=useState(false)
    const [error,seterror]=useState("")

    function changeSolution(index,field,value){
        console.log("heelo ")
        setSolution(
            solutions.map((s,i)=>(i===index?{...s,[field]:value}:s))
        )
    }
    function addSolution(){
        setSolution([...solutions,{title:"",explanation:""}])
    }

    function removeSolution(index){
        setSolution(solutions.filter((_,i)=>i!==index))
    }
    function clean(list){
        return list.map((t)=>t.trim()).filter(Boolean)
    }
    async function handleSubmit(e){
        e.preventDefault();
 const data = {
    problem: {
        title: title.trim(),
        description: description.trim()
    },

    context: {
        when: clean([when]),
        where: clean([where]),
        whoAffected: clean([whoAffected])
    },

    symptoms: clean(symptoms),
    why: clean(why),
    rootCause: clean(rootCause),

    solutions: solutions
        .map((s) => ({
            title: s.title.trim(),
            explanation: s.explanation.trim()
        }))
        .filter((s) => s.title || s.explanation)
}
        // setsaving(true)
        console.log(data)
        axios.post("/api/v1/problem/problemnotes",data,{
            withCredentials:true
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error.response?.data)
        })
    }
    return(
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="page-title">New problem</h2>
            <section className="card">
                <h3>Problem</h3>
                <label className="field">
                    <span>Title</span>
                    <input
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="e.g Website is slow on mobile"
                    required
                    />
                </label>
                <label className="field">
                    <span>Description</span>
                    <textarea
                    rows="3"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Describe the problem in a few sentences"/>
                </label>
            </section>
            {/*conetxt */}
            <section className="card">
                <h3>Context</h3>
                <label className="field">
                    <span>When did it happen?</span>
                    <input value={when} onChange={(e)=>setWhen(e.target.value)}/>
                </label>
                <label className="field">
                    <span>where did it happen?</span>
                    <input value={where} onChange={(e)=>setWhere(e.target.value)}/>
                </label>
                <label className="field">
                    <span>Who was affected?</span>
                    <input value={whoAffected} onChange={(e)=>setwhoAffted(e.target.value)}/>
                </label>
            </section>

            {/*4.why */}
            <section className="card">
                <h3>Why</h3>
                <ListField 
                label="why is this happening"
                items={why}
                setItems={Setwhy}
                addText="+ Add why"
                placeholder="A reason"
                />
            </section>
            {/*5.Root Cause*/}
            <section className="card">
                <h3>Root Cause</h3>
                <ListField
                    label="what is the real cause?"
                    items={rootCause}
                    setItems={setRootCause}
                    addText="+ Add root cause"
                    placeholder="A root cause"
                />
            </section>
            {/*6. Solutions */}
            <section className="card">
                <h3>Solutions</h3>
                {solutions.map((solution,index)=>(
                    <div className="solution-block" key={index}>
                        <div className="solution-top">
                            <strong>Solution {index+1}</strong>
                            {solution.length>1&&(
                                <button 
                                type="button"
                                className="remove"
                                onClick={()=>removeSolution(index)}
                                arial-label={`Remove solution ${index+1}`}
                                >
                                    x
                                </button>
                            )}
                        </div>
                        <label className="field">
                            <span>Solution title</span>
                            <input
                                value={solutions.title}
                                onChange={(e)=>changeSolution(index,"title",e.target.value)}
                              />
                        </label>
                        <label className="field">
                            <span>Explanation</span>
                            <textarea
                            rows="3"
                            value={solution.explanation}
                            onChange={(e)=>changeSolution(index,"explanation",e.target.value)}
                            />
                        </label>

                    </div>
                ))}
                <button type="button" className="add"
                onClick={addSolution}>
                    + Add solution
                </button>
            </section>
            {error && <p className="error">{error}</p>}
            <div className="form-action">
                <button type="button" className="btn">
                    Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    {saving?"saving":"Save Problem"}
                </button>

            </div>
        </form>
    )
}