import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps=
  {
    country:"in",
    pageSize:10,
    category:"general",
  }
  static propTypes=
  {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
capitalizeFirstLetter(str) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}
  constructor(props)
  {
    super(props);
    this.state=
    {
      ourText:"",
      articles:[],
      loading:true,
      page:1,
      totalResults:0,
    }
    document.title=`NewsWorld-${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async componentDidMount()
  {
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData=await data.json();
    this.props.setProgress(50);
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
    this.setState({page:this.state.page+1});
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize} `;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults, });
  };
  render() {
    return (
      <div>
        <h3 className="text-center my-4" >NewsWorld- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
        {this.state.loading && <Spinner/>}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
          <div className="row" style={{width:"1150px"}}>
         {this.state.articles.map((element,index)=>{

           return <div className="col-md-4" key={index}>
              <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          </div>
        </div>
          </InfiniteScroll>
      </div>
    );
  }
}

export default News;
