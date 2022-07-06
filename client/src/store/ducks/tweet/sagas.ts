import { call, put, takeLatest } from "redux-saga/effects";
import { TweetApi } from "../../../services/api/tweetApi";
import { Tweet } from "../tweets/contracts/state";
import {
  FetchTweetActionInterface,
  setTweet,
  setTweetLoadingState,
  TweetActionsType,
} from "./actionCreators";
import { LoadingState } from "./contracts/state";

export function* fetchTweetRequest({
  payload: tweetId,
}: FetchTweetActionInterface) {
  try {
    const data: Tweet[] = yield call(TweetApi.fetchTweet, tweetId);
    yield put(setTweet(data[0]));
  } catch (error) {
    yield put(setTweetLoadingState(LoadingState.ERROR));
  }
}

export function* tweetSaga() {
  yield takeLatest<any>(TweetActionsType.FETCH_TWEET, fetchTweetRequest);
}
