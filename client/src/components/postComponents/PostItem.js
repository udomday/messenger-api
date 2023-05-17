import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { deletePost } from '../../http/postApi'
import jwt_decode from 'jwt-decode'

const PostItem = observer(({post, refreshPost, updateInfoPost}) =>{
    let token = localStorage.getItem('token')
    let date = new Date(post.date)
    let month = date.toLocaleString('default', { month: 'long' });
    console.log(date)
    const userDeletePost = () =>{
        if(token){
            if(jwt_decode(token).id === post.user_id){
                deletePost(post.id)
                refreshPost()
            }
        }
    }
    return(
        <Col>
            <Card className='d-flex flex-row mt-1'>
                <div style={{width: "90%", borderRight: "1px solid #C8C9CA"}}>
                    <div className='d-flex flex-row justify-content-between'>
                        <div>
                            {post.login}
                        </div>
                        <div>
                            {date.getDay()} {month} {date.getFullYear()}
                        </div>
                    </div>
                    <hr style={{margin: 0}}/>
                    <div>
                        {post.messange}
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
