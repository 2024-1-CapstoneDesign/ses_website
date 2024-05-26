import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import GoogleLoginButton from "./GoogleLoginButton";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [googleRes, setGoogleRes] = useState(null);

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    console.dir(googleRes)
    if (googleRes === null) {
      setTimeout(() => {
        setStatus("loginFailed");
        setIsLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        history.push("/soundList");
        onClose();
      }, 150);
    }
  }, [setIsLoading, history, setStatus]);

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <Typography sx={{ fontWeight: 'bold' }}>
              Sign With Google
            </Typography>
          </Fragment>
        }
        actions={
          <Fragment>
            <GoogleLoginButton
              setGoogleRes={setGoogleRes}
              onSuccess={login}  // 구글 로그인 성공 시 login 함수 호출
              onFailure={() => setStatus("loginFailed")}  // 구글 로그인 실패 시 상태 설정
            />
            {isLoading && <ButtonCircularProgress />}
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
