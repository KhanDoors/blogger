import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { getToken } from "./Utils";
import CKEditor from "react-ckeditor-component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "1rem",
      width: "100vw",
      backgroundColor: "violet",
      textAlign: "center",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
  },
}));

const UpdateBlogPost = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    title: "",
    slug: "",
    user: "",
  });

  const [content, setContent] = useState("");

  const { title, slug, user } = state;

  const handleContent = (e) => {
    const newContent = e.editor.getData();
    setContent(newContent);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/blogpost/${props.match.params.slug}`)
      .then((res) => {
        const { title, slug, user, content } = res.data;
        setState({ ...state, title, slug, user });
        setContent(content);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_URL}/blogpost/${slug}`,
        {
          title,
          content,
          user,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { title, content, slug, user } = res.data;
        setState({ ...state, title, slug, user });
        setContent(content);
        alert(`Blog Post ${title} is Updated`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title={title}
          subheader={new Date().toLocaleString()}
        />

        <CardMedia
          className={classes.media}
          image="https://www.thespruce.com/thmb/iVCVYiIIVIKkNRsl3nqfWeFXTRY=/1500x1125/filters:fill(auto,1)/GettyImages-760155711-5c616c4e46e0fb00017dd347.jpg"
          title="My Blog"
        />
      </Card>

      <Card>
        <CardContent style={{ backgroundColor: "#F6A8FF" }}>
          <form
            style={{ margin: "2em" }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ width: "72.5rem" }}>
              <TextField
                itemType="text"
                placeholder="Title"
                name="title"
                required
                fullWidth
                value={title}
                onChange={onChange}
              />
            </div>
            <br />
            <div>
              <CKEditor
                name="content"
                content={content}
                events={{
                  change: handleContent,
                }}
              />
            </div>

            <div style={{ width: "72.5rem" }}>
              <TextField
                itemType="text"
                fullWidth
                placeholder="Your Name"
                name="user"
                value={user}
                onChange={onChange}
              />
            </div>
            <br />
            <div>
              <Button
                style={{ width: "20em" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateBlogPost;
