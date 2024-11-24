import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import SoundList from "./soundList/SoundList";
import SoundListPost from "./soundList/SoundListPost";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
import Profile from "./home/Profile";
import Result from "./result/Result";
import SoundGen from "./soundGen/SoundGen";

function Routing(props) {
  const { soundListPosts, selectSoundList, selectHome, selectProfile, selectSoundGen,
    setPage, page, filterList, setFilterList, setSoundListPosts } = props;
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
          soundId={post.soundId}
          isLiked={post.isLiked}
          setSoundListPosts={setSoundListPosts}
          soundListPosts={soundListPosts}
        />
      ))}
      <PropsRoute
        exact
        path="/soundList"
        component={SoundList}
        selectSoundList={selectSoundList}
        soundListPosts={soundListPosts}
        setPage={setPage}
        page={page}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      {
        JSON.parse(localStorage.getItem("userinfo")) &&
          <PropsRoute
            path="/profile"
            component={Profile}
            selectProfile={selectProfile}
            setSoundListPosts={setSoundListPosts}
          />
      }
      <PropsRoute path="/soundGen" component={SoundGen} selectSoundGen={selectSoundGen} />
      <PropsRoute path="/result" component={Result} setSoundListPosts={setSoundListPosts} />
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
