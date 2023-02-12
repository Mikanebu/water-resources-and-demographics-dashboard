import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import fetch from 'node-fetch'
import Papa from 'papaparse'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


export default function Home({data}) {
  return (
    <>
      <Head>
        <title>Water resources and demographics dashboard</title>
        <meta name="description" content="Water resources and demographics dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="overflow-hidden rounded-lg bg-white shadow grid-cols-3 gap-4">
          <div className="px-4 py-5 sm:p-6">
            <Line
              data={{
                labels: data.basins.data.slice(1).map(item => item[0]),
                datasets: [
                  {
                    label: data.basins.data[0][1],
                    data: data.basins.data.slice(1).map(item => item[1])
                  }
                ]
              }}
            />
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Line
              data={{
                labels: data.lakes.data.slice(1).map(item => item[0]),
                datasets: [
                  {
                    label: data.lakes.data[0][1],
                    data: data.lakes.data.slice(1).map(item => item[1])
                  }
                ]
              }}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const files = [
    'https://raw.githubusercontent.com/open-data-kazakhstan/water-resources-and-demographics/master/data/water-basins-kz.csv',
    'https://raw.githubusercontent.com/open-data-kazakhstan/water-resources-and-demographics/master/data/water-basins-lakes.csv',
    'https://raw.githubusercontent.com/open-data-kazakhstan/water-resources-and-demographics/master/data/water-basins-rivers.csv',
    'https://raw.githubusercontent.com/open-data-kazakhstan/water-resources-and-demographics/master/data/water-basins-water-comsumption.csv'
  ]
  
  const res1 = await fetch(files[0])
  const res2 = await fetch(files[1])
  const res3 = await fetch(files[2])
  const res4 = await fetch(files[3])
  
  const fullRes1 = await res1.text()
  const fullRes2 = await res2.text()
  const fullRes3 = await res3.text()
  const fullRes4 = await res4.text()
  
  const data = {
    basins: Papa.parse(fullRes1),
    lakes: Papa.parse(fullRes2),
    rivers: Papa.parse(fullRes3),
    waterConsumption: Papa.parse(fullRes4),
  }
  
  return { props: { data } }
}
