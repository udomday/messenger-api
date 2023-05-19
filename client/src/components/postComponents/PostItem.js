import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'
import { deletePost, getMedia } from '../../http/postApi'
import jwt_decode from 'jwt-decode'
import { Context } from '../..'
import fileSaver from 'file-saver'

const PostItem = observer(({post, refreshPost, updateInfoPost}) =>{
    const {posts} = useContext(Context)
    let token = localStorage.getItem('token')
    let date = new Date(post.date)
    let month = date.toLocaleString('default', { month: 'long' });

    useEffect(()=>{
        getMedia(post.id).then(config => posts.setMedia(config.data))
    }, [])
    if(posts.media.length != 0){
        console.log(posts.media)
    }

    const userDeletePost = () =>{
        if(token){
            if(jwt_decode(token).id === post.user_id){
                deletePost(post.id)
                refreshPost()
            }
        }
    }

    const saveFile = (href) => {
        fileSaver.saveAs(
            process.env.REACT_APP_API_URL + href,
          `${href}`
        );
    }


    return(
        <Col>
            <Card className='d-flex flex-row mt-1'>
                <div style={{width: "90%", borderRight: "1px solid #C8C9CA"}}>
                    <div className='d-flex flex-row justify-content-between'>
                        <div>
                            {post.id}. {post.login}
                        </div>
                        <div>
                            {date.getDay()} {month} {date.getFullYear()}
                        </div>
                    </div>
                    <hr style={{margin: 0}}/>
                    <div>
                        <div>{post.messange}</div>
                        {
                            posts.media.length != 0 ?
                            posts.media[0].post_id == post.id ?
                                <div style={{cursor: 'pointer', width: '30px', height: '50px', border: '1px solid black', padding: '2px'}} onClick={()=> saveFile(posts.media[0].url_media)}>File {posts.media[0].type}</div>
                                :
                                <div></div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
                {
                    token ? 
                    jwt_decode(token).id === post.user_id ?  
                        <div className='ps-2' style={{width: "10%"}}>
                            <div style={{cursor:"pointer"}} onClick={()=>updateInfoPost(true, post.messange, post.id)}>Редактировать</div>
                            <div style={{cursor:"pointer"}} onClick={()=> userDeletePost()}>Удалить</div>
                        </div>
                    : 
                    <div></div> 
                    : 
                    <div></div>
                }
            </Card>
        </Col>
    )
})

export default PostItem
