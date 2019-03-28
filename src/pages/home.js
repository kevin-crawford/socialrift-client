import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Rift from "../components/Rift";
export class home extends Component {
  state = {
    rifts: null
  };
  componentDidMount() {
    axios
      .get("/rifts")
      .then(res => {
        console.log(res.data);
        this.setState({
          rifts: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let recentRiftsMarkUp = this.state.rifts ? (
      this.state.rifts.map(rift => <Rift key={rift.riftId} rift={rift} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentRiftsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
