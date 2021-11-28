import { commentProject } from "../../../actions/projectActions";
import moment from 'moment';
import { FaUser } from "react-icons/fa";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useAuthState } from "../../../context/AuthContext";
import React, { useState, useContext } from 'react'
import { Comment, Button, Input, Tooltip } from 'antd';
const { TextArea } = Input;


function SingleComment(props) {
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
    console.log(props);
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            commentText: Comment,
            authorID: userID,
            projectID: props.projectID
        }

        commentProject({
            id: props.projectID,
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
                avatar={<FaUser></FaUser>}
                //     actions={actions}
                content={
                    <p>
                        {props.comment}
                    </p>
                }
                author={props.author}
                datetime={<Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(props.createdAt).fromNow()}</span>
                </Tooltip>}
            ></Comment>

            {
                OpenReply &&
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

        </div >
    )
}

export default SingleComment