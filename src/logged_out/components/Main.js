import React, {memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from '@mui/styles/withStyles';
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import "aos/dist/aos.css";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import DialogSelector from "./register_login/DialogSelector";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import axios from "axios";
import formatDateTime from "./home/formatDateTime";
import {useHistory, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

AOS.init({ once: true });

const PAGESIZE = 20;

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    overflowX: "hidden",
  },
});

function Main(props) {
  const { classes } = props;
  const location = useLocation(); // Get the current location
  const history = useHistory(); // Get the history object
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [soundListPosts, setSoundListPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [filterList, setFilterList] = useState([0, 0, 0, 0, 0, 0, 0, []]);
  const access_token = Cookies.get('accessToken');

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title =
      "AULO - Awesome Side effect sound Search WebSite";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectSoundList = useCallback(() => {
    smoothScrollTop();
    document.title = "AULO - SoundList";
    setSelectedTab("SoundList");
  }, [setSelectedTab]);

  const selectSoundGen = useCallback(() => {
    smoothScrollTop();
    document.title = "AULO - SoundGen";
    setSelectedTab("SoundGen");
  }, [setSelectedTab]);

  const selectProfile = useCallback(() => {
    smoothScrollTop();
    document.title = "AULO - Profile";
    setSelectedTab("Profile");
  }, [setSelectedTab]);

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const openTermsDialog = useCallback(() => {
    setDialogOpen("termsOfService");
  }, [setDialogOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen("changePassword");
  }, [setDialogOpen]);

  const getURLQueryString = (filterList) => {
    const resObj = {
      type:"",
      fromLen: "",
      toLen: "",
      fromFileSize: "",
      toFileSize: "",
      sampleRate: "",
      bitDepth: "",
      channels: "",
      name: "",
    };
    filterList.forEach((filter, index) => {
      switch (index){
        case 0:
          if (filter !== 0 && filter !== undefined){
            resObj.name = filter.value;
          }
          break;
        case 1:
          if (filter !== 0 && filter !== undefined && filter.value !== undefined){
            resObj.type = filter.value[0];
          }
          break;
        case 2:
          if (filter !== 0 && filter !== undefined && filter.value !== undefined){
            resObj.fromLen = filter.value[0];
            resObj.toLen = filter.value[1];
          }
          break;
        case 3:
          if (filter !== 0 && filter !== undefined && filter.value !== undefined){
            resObj.fromFileSize = filter.value[0];
            resObj.toFileSize = filter.value[1];
          }
          break;
        case 4:
          if (filter !== 0 && filter !== undefined && filter.value !== undefined){
            resObj.sampleRate = filter.value[0];
          }
          break;
        case 5:
          if (filter !== 0 && filter !== undefined && filter.value !== undefined){
            resObj.bitDepth = filter.value[0];
          }
          break;
        case 6:
          if (filter !== 0 && filter !== undefined && filter.value !== undefined){
            resObj.channels = filter.value[0];
          }
          break;
        case 7:
          if (filter !== [] && filter !== undefined){
            resObj.soundEffectTagId = filter.join();
          }
          break;
        default:
          resObj.type = "";
          resObj.fromLen =  "";
          resObj.toLen = "";
          resObj.fromFileSize =  "";
          resObj.toFileSize =  "";
          resObj.sampleRate = "";
          resObj.bitDepth = "";
          resObj.channels = "";
          resObj.name = "";
      }
    });
    return resObj;
  }

  const fetchSoundList = async () => {
    const {type, fromLen, toLen, fromFileSize, toFileSize,
      sampleRate, bitDepth, channels, soundEffectTagId, name} = getURLQueryString(filterList);
    let url;
    if (soundEffectTagId){
      url = `https://soundeffect-search.p-e.kr/api/v1/soundeffect?type=${type}&fromLength=${fromLen}&toLength=${toLen}&fromFileSize=${fromFileSize}&toFileSize=${toFileSize}&sampleRate=${sampleRate}&bitDepth=${bitDepth}&channels=${channels}&name=${name}&soundEffectTagId=${soundEffectTagId}&page=${page}&size=${PAGESIZE}`
    } else {
      url = `https://soundeffect-search.p-e.kr/api/v1/soundeffect?type=${type}&fromLength=${fromLen}&toLength=${toLen}&fromFileSize=${fromFileSize}&toFileSize=${toFileSize}&sampleRate=${sampleRate}&bitDepth=${bitDepth}&channels=${channels}&name=${name}&page=${page}&size=${PAGESIZE}`
    }
    try {
      let axiosRes;
      if (access_token){
        axiosRes = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        });
      } else {
        axiosRes = await axios.get(url);
      }
      const resData = axiosRes.data; //fetchResult
      if (resData.result === "SUCCESS"){
        return resData.data.soundEffectDtos.map((soundEffect) => {
          return {
            soundId: soundEffect.soundEffectId,
            soundName: soundEffect.soundEffectName,
            soundTagList: soundEffect.soundEffectTags,
            soundURL: soundEffect.soundEffectTypes[0].url,
            soundType: soundEffect.soundEffectTypes[0].soundEffectTypeName,
            soundLength: soundEffect.soundEffectTypes[0].length,
            soundSampleRate: soundEffect.soundEffectTypes[0].sampleRate,
            soundBitDepth: soundEffect.soundEffectTypes[0].bitDepth,
            soundChannels: soundEffect.soundEffectTypes[0].channels,
            soundFileSize: soundEffect.soundEffectTypes[0].fileSize,
            soundDescription: soundEffect.description,
            soundCreateBy: soundEffect.createBy,
            soundCreateAt: formatDateTime(soundEffect.createdAt),
            soundSnippet: soundEffect.summary,
            soundVisible: true,
            pageCnt: resData.data.totalPages,
            isLiked: soundEffect.isLiked,
          }
        });
      }
      return {
        errorMessage: "Server Error",
      };
    } catch (e){
      console.error(e);
      return [];
    }
  }

  const fetchSoundListPosts = useCallback(async () => {
    const resSoundList = await fetchSoundList();
    const soundListPosts = resSoundList.map((soundListPost) => {
      let title = soundListPost.soundName;
      title = title.toLowerCase();
      /* Remove unwanted characters, only accept alphanumeric and space */
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      /* Replace multi spaces with a single space */
      title = title.replace(/\s{2,}/g, " ");
      /* Replace space with a '-' symbol */
      title = title.replace(/\s/g, "-");
      soundListPost.url = `/soundList/card/${title}`;
      soundListPost.params = `?id=${soundListPost.soundId}`;
      return soundListPost;
    });
    setSoundListPosts(soundListPosts);
    selectSoundList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSoundListPosts, page, filterList]);

  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true);
  }, [setIsCookieRulesDialogOpen]);

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false);
  }, [setIsCookieRulesDialogOpen]);

  useEffect(fetchSoundListPosts, [fetchSoundListPosts]);

  useEffect(() => {
    if (location.pathname === "/soundList") {
      const urlParams = new URLSearchParams(location.search);
      if (!urlParams.has('reload')) {
        urlParams.set('reload', '1');
        history.replace({ search: urlParams.toString() });
        setPage(0);
        setFilterList([0, 0, 0, 0, 0, 0, []]);
      }
    }
  }, [location, history, filterList]);

  return (
    <div className={classes.wrapper}>
      {!isCookieRulesDialogOpen && (
        <CookieConsent
          handleCookieRulesDialogOpen={handleCookieRulesDialogOpen}
        />
      )}
      <DialogSelector
        openLoginDialog={openLoginDialog}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        openTermsDialog={openTermsDialog}
        openRegisterDialog={openRegisterDialog}
        openChangePasswordDialog={openChangePasswordDialog}
      />
      <CookieRulesDialog
        open={isCookieRulesDialogOpen}
        onClose={handleCookieRulesDialogClose}
      />
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectHome={selectHome}
        selectSoundList={selectSoundList}
        selectProfile={selectProfile}
        selectSoundGen={selectSoundGen}
        setPage={setPage}
        page={page}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
