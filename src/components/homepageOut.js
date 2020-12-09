import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import useForm from "../hooks/useForm";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import { useSelector, useDispatch } from "react-redux";
import { addNotes, removeNotes, updateNotes } from "../actions";
import { Controls } from "./reusableComp/controls";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 2,
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "0px",
  },
  communityDescription: {
    border: `1px solid ${theme.palette.border}`,
    width: "100%",
    height: "46vh",
    borderRadius: 2,
    fontSize: `${theme.typography.fontSizeMedium}px !important`,
    resize: "none",
  },
  grid: {
    "&.MuiGrid-grid-xs-9": {
      maxWidth: "100%",
    },
  },
  btn: {
    marginLeft: "89%",
    "@media(max-width: 1000px)": {
      marginLeft: "0%",
    },
  },
  addNotesBtn: {
    marginLeft: "75%",
    marginTop:'25px',
    "@media(max-width: 1000px)": {
      marginLeft: "0%",
    },
  },
}));

const initialValues = {
  title: "",
};

export default function Homepage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notesArr = useSelector((state) => state.notes);
  const [textArea, setTextArea] = React.useState("");
  const { values, handleChange } = useForm(initialValues);
  const [isAdd, setIsAdd] = useState(true);
  const [updateId, setUpdateId] = useState("");

  const handleTextArea = (e) => {
    setTextArea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNotes({
        title: values.title,
        body: textArea,
        id: Date.now(),
      })
    );
    setTextArea("");
    values.title = "";
  };

  const handleRemove = (id) => {
    dispatch(removeNotes({ id }));
    setTextArea("");
    values.title = "";
  };

  const handleEdit = (e) => {
    console.log(e.id);
    setTextArea(e.body);
    values.title = e.title;
    setIsAdd(false);
    setUpdateId(e.id);
  };

  const updateValue = (e) => {
    e.preventDefault();
    dispatch(
      updateNotes({
        title: values.title,
        body: textArea,
        id: updateId,
      })
    );
    setTextArea("");
    values.title = "";
    setIsAdd(true);
  };

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        PaperProps={{
          style: {
            borderRadius: 4,
            minHeight: "85vh",
            maxHeight: "90vh",
            minWidth: "60%",
            maxWidth: "60%",
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" style={{ padding: "0px" }}>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={1}>
              {"G Notes"}
            </Paper>
          </Grid>
        </DialogTitle>

        <DialogContent style={{ padding: "1px 0px" }}>
          <Grid container style={{ height: "90%", flexWrap: "nowrap" }}>
            <Grid item xs={3} style={{ borderRight: "1px solid darkgrey", overflowY:'auto', height: "80vh" }}>
              {notesArr.notes.length > 0 &&
                notesArr.notes.map((m) => {
                  return (
                    <Paper
                      variant="outlined"
                      square
                      key={m.id}
                      style={{
                        padding: "10px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography nowrap="true" variant="h6">
                            {m.title}
                          </Typography>
                          <Typography nowrap="true" variant="subtitle1">
                            {m.body}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => handleRemove(m.id)}
                          >
                            <ClearIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => handleEdit(m)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })}
            </Grid>

            <Box style={{ paddingLeft: "50px", maxWidth: "72%" }}>
              <Grid item xs={9} className={classes.grid}>
                <Controls.Form onSubmit={isAdd ? handleSubmit : updateValue}>
                  <Button
                    className={classes.addNotesBtn}
                    size="small"
                    variant="outlined"
                    type="button"
                    onClick={handleSubmit}
                  >
                    <AddIcon />
                    {"add Notes"}
                  </Button>
                  <Typography style={{ fontWeight: "600" }}>
                    {"Title:"}
                  </Typography>
                  <Controls.Input
                    type="text"
                    value={values.title}
                    name="title"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                    autoComplete="false"
                  />
                  <Typography style={{ fontWeight: "600" }}>
                    {"Body:"}
                  </Typography>
                  <textarea
                    value={textArea}
                    className={classes.communityDescription}
                    rows="6"
                    cols="70"
                    name="communityDescription"
                    onChange={handleTextArea}
                  ></textarea>
                  <span className={classes.btn}>
                    <Controls.Button
                      label={isAdd ? "save" : "update"}
                      type="submit"
                      size="small"
                    />
                  </span>
                </Controls.Form>
              </Grid>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
