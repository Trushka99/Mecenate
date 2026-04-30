import { makeAutoObservable } from "mobx";
import { Post } from "../types/post";
class FeedStore {
  selectedPost: Post | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  clearSelectedPost() {
    this.selectedPost = null;
  }
}

export const feedStore = new FeedStore();
