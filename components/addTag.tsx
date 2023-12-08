import { useState, useEffect } from "react";
import { authenticateCeramic } from "../utils";
import { useCeramicContext } from "../context";

import { Dataset } from "../types";

import styles from "../styles/profile.module.scss";

export const AddTags = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;

  const [data, setData] = useState<Dataset | undefined>();
  const [tag, setTag] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getDataSet = async () => {
    console.log("get Data", ceramic.did)
    setLoading(true);
    if (ceramic.did !== undefined) {
      const dataSet = await composeClient.executeQuery(`
        query {
          viewer {
            demoData {
              id
              data1
              data2
            }
          }
        }
      `);
      console.log("dataSet", dataSet)
      setData(dataSet?.data?.viewer?.demoData);
      setLoading(false);
    }
  };

  const addTag = async () => {
    setLoading(true);
    if (ceramic.did !== undefined) {
      console.log("add tag", data)
      const update = await composeClient.executeQuery(`
        mutation {
          createTags(input: {
            content: {
              tag: "${tag}"
              creator: "${data?.id}"
            }
          }) 
          {
            document {
              tag
            }
          }
        }
      `);
      if (update.errors) {
        alert(update.errors);
      } else {
        alert("Added Tag.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataSet();
  }, []);
  return (
    <div className='content'>
      <div className={styles.formGroup}>
        <h1>Add or Save Data</h1>
     
               
        <div className=''>
        <label className=''>Tag</label>
        <input
            className=''
            type='text'
            onChange={(e) => {
                setTag((t:string | undefined) => {
                    t = e.target.value
                    return t
                })
            }}
        />
        </div>
       
        <div className=''>
          <button
            onClick={() => {
              addTag();
            }}
          >
            {loading ? "Loading..." : "Add Tag"}
          </button>
        </div>
      </div>
    </div>
  );
};
