import "../styles/globals.scss";

import { CeramicWrapper } from "../context";
import type { AppProps } from "next/app";

import React, { useState, useEffect } from "react";

import { useCeramicContext } from "../context";
import { authenticateCeramic } from "../utils";
import AuthPrompt from "./did-select-popup";
import { Dataset } from "../types";


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <AuthPrompt />
      <div className='container'>
        <CeramicWrapper>
          <div className='body'>
            <Component {...pageProps} ceramic />
          </div>
        </CeramicWrapper>
      </div>
    </div>
  );
};

export default MyApp;
