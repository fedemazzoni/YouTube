import React, {Component} from 'react';

class SearchBar extends Component {
  state = {
    searchString: ''
  }

  handleChange = (event) => {
    const {value} = event.target
  
    this.setState({
      "searchString": value,
    })
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13){
      const {value} = event.target
      this.props.handleSearch(value);
    }
  }

  render(){
    const { searchString } = this.state;
    const { handleSearch } = this.props;
    return(
      <div className="search">
        <input className="search-input" name="search" placeholder="Search" value={searchString} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
        <img className="search-icon" src="images/search.png" alt="Search Icon" onClick={() =>{handleSearch(searchString)}} />
      </div>
    ) 
  }
}

export default SearchBar;