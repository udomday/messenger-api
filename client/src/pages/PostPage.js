import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import PostItem from '../components/postComponents/PostItem'
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { createPost, createPostWithMedia, getMedia, getPosts, updatePost } from "../http/postApi"
import PostInput from "../components/postComponents/PostInput"
import jwt_decode from 'jwt-decode'

const PostPage = observer(() => {
    const {posts} = useContext(Context)
    const [messange, setMessange] = useState('')
    const [files, setFiles] = useState({})
    const [refresh, setRefresh] = useState(1)
    const [updateToken, setUpdateToken] = useState(false)
    const [updatePostId, setUpdatePostId] = useState(0)
    let token = localStorage.getItem('token')


    useEffect(() => {
        getPosts().then(config => posts.setPosts(config.data))
    }, [refresh, messange])

    const refreshPost = () =>{
        setRefresh(refresh+1)
        console.log('refresh', refresh)
    }

    const userUpdatePost = () => {
        updatePost(updatePostId, messange)
        setUpdateToken(false)
        setUpdatePostId(0)
        setMessange('')
    }

    const updateInfoPost = (updateToken, messange, id) => {
        setUpdateToken(updateToken)
        setMessange(messange)
        setUpdatePostId(id)
    }

    const selectFile = e => {
        setFiles(e.target.files[0])
      }

    const sendPost = () => {
        if(token){
            if(!!messange && !!files){
                console.log(files)
                const formData = new FormData()
                formData.append('messange', messange)
                formData.append('date', new Date())
                formData.append('user_id', `${jwt_decode(token).id}`)
                formData.append('media', files)
                createPostWithMedia(formData).then(data => console.log('good'))
                setMessange('')
                refreshPost()
            }
    
            if(!!messange){
                createPost(messange, new Date(), `${jwt_decode(token).id}`).then(data => console.log('good'))
                setMessange('')
                refreshPost()
            }
        }
    }

    const enterPressed = (e) => {
        e.preventDefault()
        updateToken ? userUpdatePost() : sendPost()
        
    }

    return(
        <Container>
            <Row xs={{ cols: 1 }}>
                {
                    posts.posts.map(post => 
                        <PostItem key={post.id} updateInfoPost={updateInfoPost} refreshPost={refreshPost} post={post}/>    
                    )
                }
            </Row>
            <Form className="d-flex flex-row" style={{position: "absolute", bottom: 10}}>
            <Form.Control
                style={{width: "500px"}}
                placeholder='Введите сообщение'
                value = {messange}
                type = 'text'
                onKeyDown={(e) => {if(e.key === 'Enter') enterPressed(e)}}
                onChange = {e=>setMessange(e.target.value)}
            />
            <Form.Control
                style={{width: "300px"}}
                type='file'
                onChange={selectFile}
            />
            {
                updateToken ?
                <Button onClick={()=>userUpdatePost()} className="ms-3">Редактировать</Button>
                :
                <Button onClick={()=>sendPost()} className="ms-3">Отправить</Button>
            }
            </Form>
        </Container>
    )
})

export default PostPage