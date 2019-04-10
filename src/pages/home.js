import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import RiftSkeleton from "../util/RiftSkeleton";

import { connect } from "react-redux";
import { getRifts } from "../redux/actions/dataActions";

import Rift from "../components/rift/Rift";
import Profile from "../components/profile/Profile";
export class home extends Component {
  componentDidMount() {
    this.props.getRifts();
  }

  render() {
    const { rifts, loading } = this.props.data;
    let recentRiftsMarkUp = !loading ? (
      rifts.map(rift => <Rift key={rift.riftId} rift={rift} />)
    ) : (
      <RiftSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentRiftsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getRifts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getRifts }
)(home);
