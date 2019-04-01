import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteRift from "../components/DeleteRift";
//REDUX
import { connect } from "react-redux";
import { likeRift, unlikeRift } from "../redux/actions/dataActions";

//ICONS
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// MUI CARD STUFF
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 100
  },
  content: {
    padding: 25
  }
};
class Rift extends Component {
  likedRift = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.riftId === this.props.rift.riftId)
    )
      return true;
    else return false;
  };
  likeRift = () => {
    this.props.likeRift(this.props.rift.riftId);
  };
  unlikeRift = () => {
    this.props.unlikeRift(this.props.rift.riftId);
  };
  render() {
    dayjs.extend(relativeTime);
    // destructuring
    // const classes = this.props.classes
    const {
      classes,
      rift: {
        body,
        createdAt,
        userImage,
        userHandle,
        riftId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedRift() ? (
      <MyButton tip="Undo Like" onClick={this.unlikeRift}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeRift}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteRift riftId={riftId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Rift.propTypes = {
  likeRift: PropTypes.func.isRequired,
  unlikeRift: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  rift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
)(withStyles(styles)(Rift));
