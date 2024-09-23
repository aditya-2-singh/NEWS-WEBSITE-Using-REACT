import React from 'react';

const NewsItem = (props) => {
  let {title, description, imgUrl, ReadmoreUrl,author,date} = props;
  return (
    <div>
      <div className="card my-4 mx-4" style={{ width: "18rem" }}>
      
        <img className="card-img-top" style={{height:'15rem', width:"17.9rem"}} src={!imgUrl ? 'https://tse2.mm.bing.net/th?id=OIP.Xjv4jj8-pdUIXFaDZ-JqAQHaD6&pid=Api&P=0&h=180}' : imgUrl} alt='...'></img>
        <div className="card-body" >
          <h5 className="card-title" > {title}</h5>
          <p className="card-text" >{description}</p>
          <p >Published by [{author}] at {new Date(date).toGMTString()}</p>
          <a href={ReadmoreUrl} className="btn btn-dark" >Read More..</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem
