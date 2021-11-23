
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useAuthState } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react'
import { Button, Input, Comment, Avatar, Tooltip, List } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import { commentProject } from "../../../actions/projectActions";
const { TextArea } = Input;


function Comments(props) {

    const [Comment, setComment] = useState("")
    const history = useHistory();
    const { userID, token } = useAuthState();
    const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

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
                setComment("")
                console.log("new comment")
                console.log(res.data);
                props.refreshFunction(res.data)
            }
        });

    }




    return (
        <div>
            <br />
            <p> Comments</p>
            <hr />

            <List
                className="comment-list"
                header={`${props.CommentLists.length} replies`}
                itemLayout="horizontal"
                dataSource={props.CommentLists}
                renderItem={item => (
                    <li>
                        <SingleComment
                            comment={item.commentText} projectID={props.projectID} createdAt={item.createdAt} author={item.author.name} refreshFunction={item.refreshFunction}
                        />
                    </li>
                )}
            />





            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Enter your comment"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments