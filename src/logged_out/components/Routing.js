import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import SoundList from "./soundList/SoundList";
import SoundListPost from "./soundList/SoundListPost";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";

function Routing(props) {
  const { soundListPosts, selectSoundList, selectHome } = props;
  useLocationBlocker();
  return (
    <Switch>
      {soundListPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={SoundListPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={soundListPosts.filter(
            (soundListPost) => soundListPost.id !== post.id
          )}
        />
      ))}
      <PropsRoute
        exact
        path="/soundList"
        component={SoundList}
        selectSoundList={selectSoundList}
        soundListPosts={soundListPosts}
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  soundListPosts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectSoundList: PropTypes.func.isRequired,
};

export default memo(Routing);
