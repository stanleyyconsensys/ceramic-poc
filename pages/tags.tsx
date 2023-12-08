import type { NextPage } from 'next'
import Head from 'next/head'

import { AddTags } from '../components/addTag';

const DatasetPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>
      <div className = "content">
        <div>
          <AddTags />
        </div>
      </div>
    </>
  )
}

export default DatasetPage