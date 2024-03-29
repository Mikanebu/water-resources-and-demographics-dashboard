import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js'
import React from 'react';
import { Line, Bar,Pie } from 'react-chartjs-2'
import fetch from 'node-fetch'
import Papa from 'papaparse'



// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const basin_labels = ['Aral-Syrdarya', 'Ile-Balkhash', 'Irtysh', 'Ishim', 'Nura-Sarysu', 'Tobol-Turgai', 'Ural-Caspian','Shu-Talas'];


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
      <h3 class="text-4xl font-normal leading-normal mt-0 mb-2 text-sky-800 ">
          Водные ресурсы - Республика Казахстан
      </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Bar
              options= {{
                plugins: {
                title: {
                  display: true,
                  text: 'Водные ресурсы в м3 по бассейнам',
                  font: {
                    size: 14
                  }
                },
                legend: {
                  display: false
                }
                },
                  responsive: true
                }
              }
              data={{
                labels: basin_labels,
                datasets: [
                  {
                    label: 'Water resources:',
                    data: data.basins.data.slice(1).map(item => item[2]),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                      'rgba(75, 155, 207, 0.2)',
                      'rgba(141, 200, 207, 0.2)'
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                      'rgb(75, 155, 207)',
                      'rgb(141, 200, 207)'
                    ],
                    borderWidth: 2
                  }    
                ]
              }}
            />
          </div>
          <div>
            <Bar
              options= {{
                plugins: {
                title: {
                  display: true,
                  text: 'Площадь в км2 по бассейнам',
                  font: {
                    size: 14
                  }
                },
                legend: {
                  display: false
                }
                },
                  responsive: true
                }
              }
              data={{
                labels: basin_labels,
                datasets: [
                  {
                    label: 'Square (km2)',
                    data: data.basins.data.slice(1).map(item => item[1]),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                      'rgba(75, 155, 207, 0.2)',
                      'rgba(141, 200, 207, 0.2)'
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                      'rgb(75, 155, 207)',
                      'rgb(141, 200, 207)'
                    ],
                    borderWidth: 2
                  }
                ]
              }}
            />
          </div>
          </div>
          <div className="grid grid-cols-1 gap-10">
        <div>
          <Bar options= {{
              plugins: {
              title: {
                display: true,
                text: 'Доля реки в км',
                font: {
                  size: 14
                }
              },
              },
                responsive: true
              }
            }
            data={{
              labels: data.rivers.data.slice(3).map(item => item[0]),
              datasets: [
                {
                  label: 'Общая длина реки',
                  data: data.rivers.data.slice(3).map(item => item[1]),
                  backgroundColor: 'rgb(53, 162, 235)',
                  borderWidth: 1
                },
                {
                  label: 'Длина реки на территории Казахстана',
                  data: data.rivers.data.slice(3).map(item => item[2]),
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderWidth: 1
                }      
              ]
            }}
          />
        </div>  
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Bar
              options= {{
                plugins: {
                title: {
                  display: true,
                  text: 'Среднегодовой расход воды, м3/с',
                  font: {
                    size: 14
                  }
                },
                legend: {
                  display: false
                }
                },
                  responsive: true
                }
              }
              data={{
                labels: data.waterConsumption.data.slice(1).map(item => item[0]),
                datasets: [
                  {
                    label: 'Average, m3/s',
                    data: data.waterConsumption.data.slice(1).map(item => item[3]),
                    backgroundColor: 'rgb(53, 162, 235)'
                  }    
                ]
              }}
            />
          </div>
          <div>
            <Bar
              options= {{
                plugins: {
                title: {
                  display: true,
                  text: 'Водно-энергетические ресурсы, Энергия, млн кВтч/год',
                  font: {
                    size: 14
                  }
                },
                legend: {
                  display: false
                }
                },
                  responsive: true
                }
              }
              data={{
                labels: data.waterConsumption.data.slice(1).map(item => item[0]),
                datasets: [
                  {
                    label: 'Energy, million kWh/year',
                    data: data.waterConsumption.data.slice(1).map(item => item[5]),
                    backgroundColor: 'rgb(75, 192, 192)'
                  }
                ]
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
        <div>
          <Bar
            options= {{
              plugins: {
              title: {
                display: true,
                text: 'Комплексный индекс загрязнения воды (ИЗВ)',
                font: {
                  size: 14
                }
              },
              legend: {
                display: false
              }
              },
                responsive: true
              }
            }
            data={{
              labels: data.waterClassObjects.data.slice(1).map(item => item[0]),
              datasets: [
                {
                  label: 'wpi',
                  data: data.waterClassObjects.data.slice(1).map(item => item[4]),
                  backgroundColor: 'rgb(75, 192, 192)'
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
    'https://raw.githubusercontent.com/open-data-kazakhstan/water-resources-and-demographics/master/data/water-basins-water-comsumption.csv',
    'https://raw.githubusercontent.com/open-data-kazakhstan/water-resources-and-demographics/master/data/water-classes-objects.csv'
  ]
  
  const res1 = await fetch(files[0])
  const res2 = await fetch(files[1])
  const res3 = await fetch(files[2])
  const res4 = await fetch(files[3])
  const res5 = await fetch(files[4])
  
  const fullRes1 = await res1.text()
  const fullRes2 = await res2.text()
  const fullRes3 = await res3.text()
  const fullRes4 = await res4.text()
  const fullRes5 = await res5.text()

  
  const data = {
    basins: Papa.parse(fullRes1),
    lakes: Papa.parse(fullRes2),
    rivers: Papa.parse(fullRes3),
    waterConsumption: Papa.parse(fullRes4),
    waterClassObjects: Papa.parse(fullRes5)
  }
  
  return { props: { data } }
}
