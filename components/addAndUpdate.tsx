import { useState, useEffect } from "react";
import { authenticateCeramic } from "../utils";
import { useCeramicContext } from "../context";

import { Dataset } from "../types";

import styles from "../styles/profile.module.scss";

export const AddAndUpdate = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;

  const [data, setData] = useState<Dataset | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
    await getDataSet();
  };

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

  const updateDataset = async () => {
    setLoading(true);
    if (ceramic.did !== undefined) {
      console.log("update data", data)
      const update = await composeClient.executeQuery(`
        mutation {
          createDemoData(input: {
            content: {
              data1: "${data?.data1}"
              data2: "${data?.data2}"
            }
          }) 
          {
            document {
              data1
              data2
            }
          }
          createTags(input: {
            content: {
              tag: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa≈"
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
      console.log(update)
      if (update.errors) {
        alert(update.errors);
      } else {
        alert("Updated data.");
        setLoading(true);
        const updated = await composeClient.executeQuery(`
          query {
            viewer {
              demoData {
                data1
                data2
              }
            }
          }
        `);
        setData(updated?.data?.viewer?.demoData);
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
          <label className=''>Data1</label>
          <input
            className=''
            type='text'
            defaultValue={data?.data1 || ""}
            onChange={(e) => {
              setData( (d:Dataset | undefined) => {
                if (d) {
                  d.data1 = e.target.value
                }
                return d
              });
            }}
          />
        </div>
        <div className=''>
          <label>Data2</label>
          <input
            type='text'
            defaultValue={data?.data2 || ""}
            onChange={(e) => {
                setData( (d:Dataset | undefined) => {
                  if (d) {
                    d.data2 = e.target.value
                  }
                  return d
                });
            }}
          />
        </div>
        
        <div className=''>
          <button
            onClick={() => {
              updateDataset();
            }}
          >
            {loading ? "Loading..." : "Update Dataset"}
          </button>
        </div>
      </div>
    </div>
  );
};
