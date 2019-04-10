import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Rift from "../components/rift/Rift";
import RiftSkeleton from "../util/RiftSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import StaticProfile from "../components/profile/StaticProfile";

//MUI STUFF
import Grid from "@material-ui/core/Grid";

//REDUX
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    riftIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const riftId = this.props.match.params.riftId;

    if (riftId) this.setState({ riftIdParam: riftId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { rifts, loading } = this.props.data;
    const { riftIdParam } = this.state;
    const riftsMarkup = loading ? (
      <RiftSkeleton />
    ) : rifts === null ? (
      <p>No Rifts From This User</p>
    ) : !riftIdParam ? (
      rifts.map(rift => <Rift key={rift.riftId} rift={rift} />)
    ) : (
      rifts.map(rift => {
        if (rift.riftId !== riftIdParam)
          return <Rift key={rift.riftId} rift={rift} />;
        else return <Rift key={rift.riftId} rift={rift} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {riftsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { getUserData }
)(user);
