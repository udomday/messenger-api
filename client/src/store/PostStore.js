import {makeAutoObservable} from 'mobx';

export default class PostStore {
    constructor() {
        this._posts = []

        this._media = []
        
        this._post = {}

        makeAutoObservable(this)
    }

    setPosts(posts){
        return this._posts = posts
    }

    setMedia(media){
        return this._media = media
    }

    setPost(post){
        return this._post = post
    }

    get posts() {
        return this._posts
    }

    get media() {
        return this._media
    }

    get post() {
        return this._posr
    }
}