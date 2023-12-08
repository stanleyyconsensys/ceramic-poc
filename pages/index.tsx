import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import { useCeramicContext } from "../context";

import { CreatePostForm } from "../components/createPostForm.component";
import { PostsFeed } from "../components/postsFeed.component";

import Head from "next/head";

import { PostProps } from "../types";
import styles from "../styles/Home.module.scss";
import AuthPrompt from "./did-select-popup";
import React from "react";
import { authenticateCeramic } from "../utils";
import { Dataset } from "../types";

const Home: NextPage = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [data, setData] = useState<Dataset | undefined>();

  const [isLoading, setIsLoading] = useState(true);

 
  const getData = async () => {
    console.log("ceramic did: ", ceramic.did);
    if (ceramic.did !== undefined) {
      const dataset = await composeClient.executeQuery(`
        query {
          viewer {
            demoData {
              id
            }
          }
        }
      `);
      const id = dataset?.data?.viewer?.demoData.id
      const data = await composeClient.executeQuery(`
      query {
        node (id: "${id}") {
          ... on DemoData {
            id
            data1
            data2
            tags (last:300) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `);
    console.log("data", data);
    setData({
      data1: data.data.node.data1,
      data2: data.data.node.data2,
      id: data.data.node.id,
    })

      // console.log("Data", dataset?.data?.viewer?.demoData);



      // setData(dataset?.data?.viewer?.demoData as Dataset);
      setIsLoading(false);
    } else {
      setData(undefined);
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    console.log("loading data")
    setIsLoading(true)
    getData();
  }, []);

  return (
    <>
      
      <div className='content'>
          {
            isLoading ? "loading....." : ""
          }
          <div>
            <ul>
            <li>
                <label>Doc Id</label>
                <p>{
              data?.id
            }</p>
              </li>
              <li>
                <label>Data 1</label>
                <p>{
              data?.data1
            }</p>
              </li>
              <li>
                <label>Data 2</label>
                <p>{
              data?.data2
            }</p>
              </li>
            </ul>
          </div>
       
          <div>
            <h2 className={styles.accentColor}>
              
              <Link href={`/dataset`}>
                <a style={{ color: "white" }}>update/create a single dataset</a>
              </Link>{" "}
              <Link href={`/tags`}>
                <a style={{ color: "white" }}>Add Tags</a>
              </Link>{" "}
            </h2>
          </div>
      
      </div>
    </>
  );
};

export default Home;
