import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// redux
import { connect } from "react-redux";
import { likeRift, unlikeRift } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedRift = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.riftId === this.props.riftId)
    )
      return true;
    else return false;
  };
  likeRift = () => {
    this.props.likeRift(this.props.riftId);
  };
  unlikeRift = () => {
    this.props.unlikeRift(this.props.riftId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedRift() ? (
      <MyButton tip="Undo Like" onClick={this.unlikeRift}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeRift}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  riftId: PropTypes.string.isRequired,
  likeRift: PropTypes.func.isRequired,
  unlikeRift: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeRift,
  unlikeRift
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
