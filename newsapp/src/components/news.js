import React, { Component } from 'react'
import NewsItem from './newsitem'
import Loading from './loading';

export class News extends Component {

  constructor() {
    super();
    console.log("constructor is invoked");
    this.state = {
      articles: [], 
      loading: false,
      page: 1,  
      totalResults: 0 ,
    }
  }

  async fetchData(page) {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=06d1984447a34668bc8fec5c43ab8938&page=${page}&pageSize=20`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    
    this.fetchData(this.state.page);
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.props.category);
    if (prevProps.category !== this.props.category || prevState.page !== this.state.page) {
      this.fetchData(this.state.page);
    }
  }

  gotonextPage =async ()=>{
    console.log("gotonextpage is invoked");
      this.setState({ loading: true }); // Show loading spinner while fetching

      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=06d1984447a34668bc8fec5c43ab8938&page=${this.state.page}&pageSize=20`
      let data = await fetch(url);
    // Parse data correctly
    let parsedData = await data.json(); // Missing 'await'
    console.log(parsedData);
    // Set page from parsed data
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
      loading: false 
    });
}


  gotoprevPage = async () =>{
    console.log("gotoprevPage is invoked");
    this.setState({ loading: true }); // Show loading spinner while fetching

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=06d1984447a34668bc8fec5c43ab8938&page=${this.state.page}&pageSize=20`
    let data = await fetch(url);
    let parsedData = await data.json(); // Missing 'await'
    // console.log(parsedData);
    console.log(this.props.category);

    // set pages
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
    });
  }
  toTitleCase = (str) =>{
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }


  render() {
    return (
      <div className='container my-3'>
        <i><h1>QuickNews | Spotlight on {this.toTitleCase(this.props.category)}: Today's Top Stories
</h1></i>
        <br></br>
        {this.state.loading && <Loading></Loading>}
        <div className="row">
          {/* Loop using articles */}
          {this.state.articles.map((article, index) => {
            return (
              <div className='col-md-4' key={index}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 30) : ""}
                  description={article.description ? article.description.slice(0, 60) : ""}
                  imgUrl={article.urlToImage}
                  ReadmoreUrl={article.url}
                  author = {article.author}
                  date = {article.publishedAt}
                  backgroundcolor = {this.props.color}
                  color = {this.props.textcolor}
                />
              </div>
            )
          })}
        </div>
      <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.gotoprevPage} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} onClick={this.gotonextPage} className="btn btn-dark">Next &rarr;</button>
      </div>
      </div>
    )
  }
}
export default News;
