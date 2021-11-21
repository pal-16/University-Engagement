import { commentProject } from "../../../actions/projectActions";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useAuthState } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

function SingleComment(props) {
    //  const user = useSelector(state => state.user);

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const { userID, token } = useAuthState();
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }
    const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            commentText: Comment,
            authorID: userID,
            projectID: props.postId
        }
        console.log(variables);

        commentProject({
            id: props.postId,
            token,
            body: variables
        }).then((res) => {
            if (res.error) {
                setSeverity("error");
                setMessage(res.error);
                setOpen(true);
                return;
            } else {
                setCommentValue("")
                console.log(res.data)
                console.log("Palak Mantry");
                console.log(res.data.newComment);

                props.refreshFunction(res.data.newComment)
            }
        });

    }

    const actions = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <Comment
                //     actions={actions}
                author={"Palak"}
                avatar={
                    <Avatar
                        src={""}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment}
                    </p>
                }
            ></Comment>

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment