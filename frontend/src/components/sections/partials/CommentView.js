import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import JavascriptTimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import User from "../../elements/User";
import "./CommentView.css";

JavascriptTimeAgo.addLocale(en);

const CommentView = ({ data }, ...props) => {
  console.log("REVIEW DATA", data);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const AutherName = data.first_name + " " + data.last_name;
  console.log(data);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like" color="cyan">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike" color="cyan">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" color="cyan">
      Reply to
    </span>,
  ];

  return (
    <Comment
      actions={actions}
      author={
        <a>
          {data.postanonymously == undefined || data.postanonymously == true
            ? "Anonymous"
            : AutherName}
        </a>
      }
      avatar={<User style="house"></User>}
      alt
      content={
        <>
          <div>Amenities: {data.review_amenities_rating}</div>
          <div>Location: {data.review_location_rating}</div>
          <div>Management: {data.review_management_rating}</div>
          <p className="mt-2">{data.review}</p>
        </>
      }
      datetime={
        <Tooltip title={moment().format("MM-DD-YYYY HH:mm:ss")}>
          <span>{<ReactTimeAgo date={data.r_date} />}</span>
        </Tooltip>
      }
    />
  );
};

export default CommentView;
