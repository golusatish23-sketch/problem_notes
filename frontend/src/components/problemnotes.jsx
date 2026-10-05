import axios from "axios";
import { useState,useEffect } from "react";

function Bullets({items}){
    if(!items || items.length===0) return <p className="muted">None</p>;
    return(
        <ul>
            {items.map((item,i)=>(
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
}
function Detail({p}){
    console.log("heelo")
    console.log("pwuahdsaudsfa",p)
    const context=p.context||{};
    const solutions=p.solutions||[];
    console.log(context)
    return(
        <div className="detail">
            <div className="step">
                <h4>Problem</h4>
                <p>{p.problem?.description||<span className="muted">No description</span>}</p>
            </div>
            <div className="step">
                <h4>Context</h4>
                <dl>
                    <dt>When</dt>
                    <dd>{(context.when||[]).join(",")||"-"}</dd>
                    <dt>Where</dt>
                    <dd>{(context.where||[]).join(",")||"-"}</dd>
                    <dt>Who was affected</dt>
                    <dd>{(context.whoAffected ||[]).join(",")||"-"}</dd>
                </dl>
            </div>
            <div className="step">
                <h4>Symptoms</h4>
                <Bullets  items={p.symptoms}/> 
            </div>
            <div className="step">
                <h4>Why</h4>
                <Bullets items={p.why}/>
            </div>
            <div className="step">
                <h4>solutions</h4>
                {solutions.length===0 && <p className="muted">None</p>}
                {solutions.map((s,i)=>(
                    <div className="solution-card" key={i}>
                        <span className="muted">Solution {i+1}</span>
                        <strong>{s.title}</strong>
                        <p>{s.explanation}</p>
                    </div>
                ))

                }

            </div>



        </div>
    )
}
export default function ProblemNotes({loading,error,onNew}){
    const [openId,setOpenId]=useState(null)
    const [problem,setproblem]=useState(null)
    if(loading) return <p className="muted center">Loading...</p>
    if(error) return <p className="error">{error}</p>
    // if(problem.length!==0){
    //     return(
    //         <div className="empty">
    //             <h2>No problem Yet</h2>
    //             <p className="muted">Write down a problem and break it down step by step.</p>
    //             <button className="btn btn-primary" onclick={onNew}>
    //                 + New Probelm
    //             </button>
    //         </div>
    //     )
    // }
    useEffect(()=>{
        axios.get("/api/v1/problem/Allproblem",{},{
        withCredentials:true
    })
    .then((response)=>{
        console.log(response.data.data)
         setproblem(response.data.data.Allproblem)
    })
    .catch((error)=>{
        console.log(error.response?.data)
    })
    },[])
    return(
      <div className="list">
        <h2 className="page-title">Your Problems</h2>
        {problem?.map((p,index)=>{
            const id=p._id||p.id||index;
            const isOpen=openId===id;
            return(
                <article className="card problem-card" key={id}>
                    <button
                    className="problem-head"
                    onClick={()=>setOpenId(isOpen?null:id)}
                    aria-expanded={isOpen}
                    >
                        <h3>{p.problem?.title}</h3>
                        <p className="short">{p.problem?.description}</p>
                        <div className="meta">
                            <span>{p.symptoms?.length||0} symptoms</span>
                            <span>{p.rootCause?.length ||0} root Cause</span>
                            <span>{p.solution?.length||0} solution</span>
                            <span className="date"></span>
                        </div>
                    </button>
                    {isOpen&&<Detail p={p}/>}
                </article>
            )
        })}
      </div>
    )
}