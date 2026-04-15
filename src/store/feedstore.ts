import { makeAutoObservable } from "mobx";

class FeedStore {
  selectedPostId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  selectPost(id: string) {
    this.selectedPostId = id;
  }

  clearSelectedPost() {
    this.selectedPostId = null;
  }
}

export const feedStore = new FeedStore();
