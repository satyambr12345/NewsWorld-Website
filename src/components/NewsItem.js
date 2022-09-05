import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
       <div className="card">
        <div>
         <span className="badge rounded-pill bg-danger" style={{display: "flex", justifyContent: "flex-end", right:"0", position:"absolute"}}>{source}</span>
         </div>
      <img src={!imgUrl?"https://image.cnbcfm.com/api/v1/image/107016872-1645115562077-107016872-16451155032022-02-17t160240z_1691077713_rc2sls9lbsun_rtrmadp_0_europe-stocks.jpg?v=1661403314&w=1920&h=1080":imgUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{!description?"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam in ex laboriosam quaerat numquam obcaecati sed dolorem magni odit? Modi culpa sunt, consectetur, unde quis iure, rem vitae similique minima magnam corporis voluptate":description }</p>
      <p className="card-text"><small className="text-danger" style={{fontWeight:"bold"}}>By {!author?"unknown":author} on {!date?"not specified":new Date(date).toUTCString()}</small></p>
      <a href={newsUrl} target="_blank" rel="noreferrer" className="btn bt-sm btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
