import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { Box, Button } from "@mui/material";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const [newComment, setNewComment] = useState('');

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const handleSubmit = async () => {
    if(newComment !== '') {
      const response = await axios.post('/comments/',{
        desc: newComment,
        videoId: videoId,
      })
      console.log(response )
      setComments([...comments, response])
      setNewComment('')
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, newComment]);


  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Box sx={{width: '100%', display: 'flex'}}>
          <Input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Add a comment..." />
          <Button onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </NewComment>
      {comments.map(comment=>(
        comment.userId === currentUser._id ? <Comment owned={true} key={comment._id} comment={comment}/> : <Comment owned={false} key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
