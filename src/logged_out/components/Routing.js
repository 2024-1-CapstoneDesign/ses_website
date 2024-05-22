import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import SoundList from "./soundList/SoundList";
import SoundListPost from "./soundList/SoundListPost";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";

function Routing(props) {
  const { soundListPosts, setSoundListPosts, selectSoundList, selectHome, setPage } = props;
  useLocationBlocker();
  return (
    <Switch>
      {soundListPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={SoundListPost}
          title={post.soundName}
          key={post.soundName}
          src={post.soundURL}
          date={post.soundCreateAt}
          tagList={post.soundTagList}
          type={post.soundType}
          length={post.soundLength}
          sampleRate={post.soundSampleRate}
          bitDepth={post.soundBitDepth}
          channels={post.soundChannels}
          fileSize={post.soundFileSize}
          content={post.soundDescription}
          id={post.soundId}
        />
      ))}
      <PropsRoute
        exact
        path="/soundList"
        component={SoundList}
        selectSoundList={selectSoundList}
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        setPage={setPage}
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
