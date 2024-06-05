import {
  Box,
  Button, CircularProgress, Divider,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import { useHistory } from 'react-router-dom';
import withStyles from "@mui/styles/withStyles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MyTimePicker from "./MyTimePicker";
import Cookies from "js-cookie";

const styles = (theme) => ({
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.default,
    width: '60vh',
    height: '75vh',
    // overflow: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  modalTopTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    padding: theme.spacing(3),
  },
  modalMiddleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '40%',
    width: '100%',
  },
  modalMiddleTextContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    height: '20%',
    paddingLeft: theme.spacing(3),
  },
  modalMiddleInputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: theme.spacing(3),
  },
  modalBottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  wideTextFieldStyle: {
    width: '90%',
  },
  visuallyHiddenInputStyle: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  },
  roundedTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px', // 둥근 모서리 반지름 설정
      '& fieldset': {
        borderColor: '#d9d9d9', // 기본 테두리 색상
      },
      '&:hover fieldset': {
        borderColor: '#a6a6a6', // 호버 시 테두리 색상
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c65d4a', // 포커스 시 테두리 색상
      },
    },
    '& .MuiInputBase-input': {
      height: '20px', // 입력 요소의 높이 조정
    },
    width: "90%",
  },
  middleProgressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  }
});

const InputModal = (props) => {
  const {classes, modalOpen, setModalOpen, theme} = props;
  const [youtubeURL, setYoutubeURL] = useState('');
  const [minuteFrom, setMinuteFrom] = useState('');
  const [secondFrom, setSecondFrom] = useState('');
  const [minuteTo, setMinuteTo] = useState('');
  const [secondTo, setSecondTo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(false);
  const cancelTokenSource = useRef(null);
  const history = useHistory();
  const [progressValue, setProgressValue] = useState(10);
  const access_token = Cookies.get('accessToken');


  const handleModalClose = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Request canceled by the user.');
    }
    setModalOpen(false);
    setYoutubeURL('');
    setMinuteFrom('');
    setSecondFrom('');
    setMinuteTo('');
    setSecondTo('');
    setSelectedFile(null);
  }
  const handleURLChange = (e) => setYoutubeURL(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = (e)=> {
    e.preventDefault();
    if (selectedFile && !(youtubeURL && minuteFrom && minuteTo && secondFrom && secondTo)) {
      cancelTokenSource.current = axios.CancelToken.source();
      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        cancelToken: cancelTokenSource.current.token,
      };
      if (access_token) {
        axiosConfig.headers.Authorization = `Bearer ${access_token}`
      }

      const formData = new FormData();
      formData.append("file", selectedFile)

      setProgress(true);
      setProgressValue(0);
      axios.post(
        "https://soundeffect-search.p-e.kr/api/v1/soundeffect/search", formData, axiosConfig
      ).then(response => {
        setProgress(false);
        handleModalClose();
        // history를 사용하여 /result 페이지로 라우팅하면서 state를 전달합니다.
        history.push({
          pathname: '/result',
          state: {
            data: response.data.data,
            targetName: selectedFile.name,
          }
        });
      }).catch(() => {
        alert("file search failed. Please try again.");
        setSelectedFile(null);
        setProgress(false);
      });
    } else if (!selectedFile && (youtubeURL || minuteFrom || minuteTo || secondFrom || secondTo)){
      const youtubeURLRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%?]{11})(&.*)?$/;

      if (youtubeURLRegex.test(decodeURIComponent(youtubeURL)) === false){
        alert("Invalid youtubeURL");
      } else if (minuteFrom === "" || minuteTo === "" || secondFrom === "" || secondTo === ""){
        alert("Fill all field");
      } else {
        cancelTokenSource.current = axios.CancelToken.source();
        const axiosConfig = {
          cancelToken: cancelTokenSource.current.token,
        };

        if (access_token) {
          axiosConfig.headers.Authorization = `Bearer ${access_token}`
        }

        const from = parseInt(minuteFrom) * 60 + parseInt(secondFrom);
        const to = parseInt(minuteTo) * 60 + parseInt(secondTo);
        if (from > to){
          alert("from cannot exceed to value. try again")
          return;
        }

        if (to - from > 25){
          alert("soundEffect duration cannot exceed 25 seconds. try again")
          return;
        }

        setProgress(true);
        setProgressValue(0);
        axios.get(
          `https://soundeffect-search.p-e.kr/api/v1/soundeffect/youtube?url=${youtubeURL}&from=${from}&to=${to}`, axiosConfig
        ).then(response => {
          setProgress(false);
          handleModalClose();
          if (response.data.data === null || response.data.result === "FAIL") {
            console.error(e);
            alert("file search failed. Please try again.");
            setSelectedFile(null);
            setProgress(false);
            return;
          }
          // history를 사용하여 /result 페이지로 라우팅하면서 state를 전달합니다.
          history.push({
            pathname: '/result',
            state: {
              data: response.data.data,
              targetName: youtubeURL,
            }
          });
        }).catch((e) => {
          console.error(e);
          alert("file search failed. Please try again.");
          setSelectedFile(null);
          setProgress(false);
        });
      }

    } else if (!selectedFile && !(youtubeURL && minuteFrom && minuteTo && secondFrom && secondTo)){
      alert("input either Youtube URL field and file Upload field")
    } else {
      alert("cannot input both Youtube URL field and file Upload field")
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressValue((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 2));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {
        progress ?
          <Box className={classes.modalStyle}>
            <Box className={classes.modalTopContainer}>
              <Box className={classes.modalTopTextContainer}>
                <Box ml={-1}>
                  <Typography variant="h6" component="h2">
                    Getting search results
                  </Typography>
                  <Typography variant="body" sx={{color:"gray"}}>
                    Please wait until getting the results.
                  </Typography>
                </Box>
                <IconButton onClick={handleModalClose} sx={{bottom: '1rem'}}>
                  <CloseIcon/>
                </IconButton>
              </Box>
            </Box>
            <Box className={classes.middleProgressContainer}>
              <CircularProgress variant={"determinate"} value={progressValue} size={100} sx={{color: "#000000"}}/>
              <Typography variant="h2" component="div" color="text.secondary" mt={5}>
                {`${Math.round(progressValue)}%`}
              </Typography>
            </Box>
            <Box className={classes.modalBottomContainer}>
              <Typography variant="h6" component="h2">
                Uploading your File...
              </Typography>
            </Box>
          </Box>
          :
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            className={classes.modalStyle}
          >
            <Box className={classes.modalTopContainer}>
              <Box className={classes.modalTopTextContainer}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}} ml={-1}>
                  <img src={`${process.env.PUBLIC_URL}/images/logged_out/youtube.png`} alt={"youtube logo"}/>
                  <Typography variant="h6" component="h2">
                    Youtube Full URL
                  </Typography>
                </Box>
                <IconButton onClick={handleModalClose} sx={{bottom: '1rem'}}>
                  <CloseIcon/>
                </IconButton>
              </Box>
              <TextField
                label="www.example.com"
                type="search"
                className={classes.roundedTextField}
                value={youtubeURL}
                onChange={handleURLChange}
                sx={{marginTop: theme.spacing(-3)}}
              />
            </Box>
            <Box className={classes.modalMiddleContainer}>
              <Box className={classes.modalMiddleTextContainer}>
                <Typography variant="h6" component="h2">
                  From
                </Typography>
              </Box>
              <Box className={classes.modalMiddleInputContainer}>
                <MyTimePicker
                  inputLabelId={"from-minute-label"}
                  labelId={"from-minute-"}
                  value={minuteFrom}
                  setValue={setMinuteFrom}
                  text={"minutes"}
                  inputLabel={"min"}
                />
                <MyTimePicker
                  inputLabelId={"from-second-label"}
                  labelId={"from-second"}
                  value={secondFrom}
                  setValue={setSecondFrom}
                  text={"seconds"}
                  inputLabel={"sec"}
                />
              </Box>
              <Box className={classes.modalMiddleTextContainer}>
                <Typography variant="h6" component="h2">
                  To
                </Typography>
              </Box>
              <Box className={classes.modalMiddleInputContainer}>
                <MyTimePicker
                  inputLabelId={"to-minute-label"}
                  labelId={"to-minute"}
                  value={minuteTo}
                  setValue={setMinuteTo}
                  text={"minutes"}
                  inputLabel={"min"}
                />
                <MyTimePicker
                  inputLabelId={"to-second-label"}
                  labelId={"to-second"}
                  value={secondTo}
                  setValue={setSecondTo}
                  text={"seconds"}
                  inputLabel={"sec"}
                />
              </Box>
              <Box sx={{width: "100%", height: "20%"}}/>
              <Divider sx={{width: "90%"}} />
            </Box>
            <Box className={classes.modalBottomContainer}>
              <Box sx={{height: "85%", display: "flex", alignItems: "center"}}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {selectedFile ? 'file Selected' : 'Upload file'}
                  <Input className={classes.visuallyHiddenInputStyle} type="file" onChange={handleFileChange}/>
                </Button>
              </Box>
              <Box sx={{height: "15%", width: "100%"}}>
                <Button type="submit" fullWidth variant="contained">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
      }
    </Modal>
  );
}

export default withStyles(styles, {withTheme: true})(InputModal);