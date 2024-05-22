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

AOS.init({ once: true });

const PAGESIZE = 15;

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    overflowX: "hidden",
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [soundListPosts, setSoundListPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);
  const [page, setPage] = useState(0);

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title =
      "SES - Awesome Side effect sound Search WebSite";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectSoundList = useCallback(() => {
    smoothScrollTop();
    document.title = "WaVer - SoundList";
    setSelectedTab("SoundList");
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

  const fetchSoundList = async () => {
    const url = `https://soundeffect-search.p-e.kr/api/v1/soundeffect?page=${page}&size=${PAGESIZE}`
    // const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect"
    try {
      const axiosRes = await axios.get(url);
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
            soundDescription: soundEffect.description,
            soundCreateBy: soundEffect.createBy,
            soundCreateAt: formatDateTime(soundEffect.createdAt),
            soundSnippet: soundEffect.summary,
            soundVisible: true,
            pageCnt: resData.data.totalPages
          }
        });
      }
      return {
        errorMessage: "Server Error",
      };
    } catch (e){
      console.error(e);
      throw e;
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
  }, [setSoundListPosts, page]);

  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true);
  }, [setIsCookieRulesDialogOpen]);

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false);
  }, [setIsCookieRulesDialogOpen]);

  useEffect(fetchSoundListPosts, [fetchSoundListPosts]);

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
        selectTab={setSelectedTab} // 여기서 확인하는듯
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        soundListPosts={soundListPosts}
        selectHome={selectHome}
        selectSoundList={selectSoundList}
        setSoundListPosts={setSoundListPosts}
        setPage={setPage}
      />
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
