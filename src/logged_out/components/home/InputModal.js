import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.default,
    width: '50vh',
    height: '50vh',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

const InputModal = (props) => {
  const {classes, modalOpen, setModalOpen} = props;
  const [youtubeURL, setYoutubeURL] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const handleChange = (e) => {
    setYoutubeURL(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <Typography id="modal-title" variant="h6" component="h2">
          Youtube Full URL
        </Typography>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          value={youtubeURL}
          onChange={handleChange}
        />
        <Typography id="modal-description" sx={{mt: 2}}>
          모달 내용
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained">
          Submit
        </Button>
        <Button onClick={handleModalClose}>닫기</Button>
      </Box>
    </Modal>
  );
}

export default withStyles(styles, {withTheme: true})(InputModal);