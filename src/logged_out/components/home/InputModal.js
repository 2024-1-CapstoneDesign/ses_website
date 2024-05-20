import {
  Box,
  Button, Divider,
  FormControl,
  IconButton,
  Input,
  InputLabel, MenuItem,
  Modal,
  Select, Stack,
  TextField,
  Typography
} from "@mui/material";
import React, {useState} from "react";
import withStyles from "@mui/styles/withStyles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    overflow: 'auto',
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
});

const InputModal = (props) => {
  const {classes, modalOpen, setModalOpen, theme} = props;
  const [youtubeURL, setYoutubeURL] = useState('');
  const [minuteFrom, setMinuteFrom] = useState('');
  const [secondFrom, setSecondFrom] = useState('');
  const [minuteTo, setMinuteTo] = useState('');
  const [secondTo, setSecondTo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleModalClose = () => {
    setModalOpen(false);
    setYoutubeURL('');
    setMinuteFrom('');
    setSelectedFile(null);
  }
  const handleURLChange = (e) => setYoutubeURL(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleSubmit = async (e)=> {
    e.preventDefault();
    const body = {
      title: youtubeURL
    };
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (regex.test(minuteFrom) && regex.test(secondFrom)) {
      const res = await axios.post('https://dummyjson.com/products/add', body,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.dir(res.data);
    } else {
      alert("start and end need to HH:MM:SS format")
    }
  };
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };



  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        className={classes.modalStyle}
      >
        <Box className={classes.modalTopContainer}>
          <Box className={classes.modalTopTextContainer}>
            <Typography variant="h6" component="h2">
              Youtube Full URL
            </Typography>
            <IconButton onClick={handleModalClose} sx={{bottom: '2rem'}}>
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
            <Stack
              direction="row"
              spacing={0}
              mr={1}
            >
              <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                <InputLabel id="from-minute-label">Age</InputLabel>
                <Select
                  labelId="from-minute-label"
                  id="from-minute"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...Array(60).keys()].map(i => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6">minutes</Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={0}
            >
              <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                <InputLabel id="demo-select-small-label">Age</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...Array(60).keys()].map(i => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6">seconds</Typography>
              </Box>
            </Stack>
          </Box>
          <Box className={classes.modalMiddleTextContainer}>
            <Typography variant="h6" component="h2">
              To
            </Typography>
          </Box>
          <Box className={classes.modalMiddleInputContainer}>
            <Stack
              direction="row"
              spacing={0}
              mr={1}
            >
              <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                <InputLabel id="demo-select-small-label">Age</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...Array(60).keys()].map(i => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6">minutes</Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={0}
            >
              <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                <InputLabel id="demo-select-small-label">Age</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...Array(60).keys()].map(i => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6">seconds</Typography>
              </Box>
            </Stack>
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
          <Box sx={{height: "20%", width: "100%"}}>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default withStyles(styles, {withTheme: true})(InputModal);