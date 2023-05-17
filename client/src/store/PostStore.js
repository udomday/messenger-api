import {makeAutoObservable} from 'mobx';

export default class PostStore {
    constructor() {
        this._posts = []
        
        this._post = {}

        makeAutoObservable(this)
    }

    setPosts(posts){
        return this._posts = posts
    }

    setPost(post){
        return this._post = post
    }

    get posts() {
        return this._posts
    }
    get post() {
        return this._posr
    }
}