import type { NextPage } from 'next'
import Head from 'next/head'

import { AddAndUpdate } from '../components/addAndUpdate'

const DatasetPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Data Set</title>
      </Head>
      <div className = "content">
        <div>
          <AddAndUpdate />
        </div>
      </div>
    </>
  )
}

export default DatasetPage