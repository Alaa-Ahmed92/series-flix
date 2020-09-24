import React, { Component } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Series from "./Pages/Series";
import Error from "./Pages/Error";
import SingleMovie from "./Pages/SingleMovie";
import { Switch, Route, withRouter } from "react-router-dom";
import NavbarContent from "./Components/Navbar";
import { getMovies } from "./Api/Requests";

class App extends Component {
  state = {
    moviesNew: [],
    list: [],
    wishList: [],
  };

  handleList = (movie, id) => {
    let list = this.state.list;
    let wishList = this.state.wishList;
    if (list.some((item) => movie.id == item.id)) {
      // wishList
      let indexWish = wishList.indexOf(movie.id);
      wishList.splice(indexWish, 1);
      // wishList
      let spliceIndex = list.filter((item) => {
        if (item.id === movie.id) {
          let getIndex = list.indexOf(item);
          list.splice(getIndex, 1);
        } else {
          return null;
        }
      });
      localStorage.setItem("wishList", JSON.stringify(wishList));
      localStorage.setItem("list", JSON.stringify(list));
      this.setState({
        icon: !id,
        list: JSON.parse(localStorage.getItem("list")),
        wishList: JSON.parse(localStorage.getItem("wishList")),
      });
    } else {
      list.push(movie);
      wishList.push(id);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      localStorage.setItem("list", JSON.stringify(list));
      this.setState({
        icon: id,
        list: JSON.parse(localStorage.getItem("list")),
        wishList: JSON.parse(localStorage.getItem("wishList")),
      });
    }
  };

  componentDidMount() {
    getMovies().then((res) => {
      this.setState({ moviesNew: res.data });
    });
    const list = window.localStorage.getItem("list");
    const wishList = window.localStorage.getItem("wishList");
    const parsedList = JSON.parse(list);
    const parsedWish = JSON.parse(wishList);
    if (list == null && parsedWish == null) {
      return false;
    } else {
      this.setState({
        list: parsedList,
        wishList: parsedWish,
      });
    }
  }

  render() {
    return (
      <>
        <NavbarContent listOfMovie={this.state.list} />
        <Switch>
          <Route exact path="/">
            <Home
              moviesList={this.state.moviesNew}
              listIcon={this.state.wishList}
              handlList={this.handleList}
            />
          </Route>
          <Route exact path="/series">
            <Series
              moviesList={this.state.moviesNew}
              dataIcon={this.state.wishList}
              dataMovie={this.handleList}
            />
          </Route>
          <Route exact strict path="/series/:id">
            <SingleMovie />
          </Route>
          <Route exact>
            <Error />
          </Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
