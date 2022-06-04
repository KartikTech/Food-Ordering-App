import React from 'react';
import "./pagination.css"

function Pagination(props) {
  const pages= props.page;

  const getPages = (page)=>{
    var pages= [];
      pages.push(<div className="pagination" onClick={()=>props.previous()}><span className="page">{String.fromCharCode(60)}</span></div>);
      for(let i=1;i<=page;i++){
        pages.push(<div className="pagination" onClick={(event)=>props.update(event)}><span className="page">{i}</span></div>);
      }
      pages.push(<div className="pagination" onClick={()=>props.next()}><span className="page">{String.fromCharCode(62)}</span></div>);
    return pages;
  }
  return (
    <div className="flex m-232">
        {
          pages===0 ? <div className="pagination"><span className="page">1</span></div>:getPages(pages).map(r=>r) 
        }
    </div>);
}

export default Pagination;