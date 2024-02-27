
export type TRegister = {
  username: string,
  email: string,
};

export type TLogin = {
  email: string,
  otp: string,
};

export type TCreateTweet = {
  body: string,
  image: any,
  email: string,
};

export type TGetTweets = {
  page: number,
  limit: number,
};