import React from "react"
import {AppState, Auth0Provider, User} from '@auth0/auth0-react'
import { useNavigate } from "react-router";
import { useCreateUser } from "@/apis/userApi";

export default function Auth0ProviderGuard({
  children,
}: {children: React.ReactNode}) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_AUTH0_CALLBACK_URL_DEV : import.meta.env.VITE_AUTH0_CALLBACK_URL_PRO;
  const navigate = useNavigate();

  const {createUserAct, } = useCreateUser();

  if (!domain || !clientId || !redirectUrl) {
    throw new Error("unable to connect to auth");
  }

  function handRedirectCallback(appState?: AppState, user?: User) {
    console.log(appState, user);

    navigate('/auth-redirect');
    // go to route tried to access before auth
    //navigate(appState?.returnTo || window.location.pathname);
  }

  return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUrl,
    }}

    // when user authenticated and back to our app run this!
    onRedirectCallback={handRedirectCallback}
    //useRefreshTokens={true}
    //cacheLocation="localstorage"
    //cookieDomain=""
    >
      {children}
    </Auth0Provider>
  )
}
