import React, { useState } from "react";
import "./dashboard.css";
import Chart from 'react-apexcharts'

const Dashboard = () => {
  const [bar,setBar] = useState({
    series: [
      {
        data: [10, 8, 6, 4, 2],
      },
    ],
    options: {
      chart: {
        height : 350,
        type: 'bar',
        toolbar: {
          show: false
        },
      },
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      },
      datalabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Biogesic','Neozep','Bioflu','Amoxil','Alcohol'
        ],
      },
      yaxis: {
        title: {
          text: "Count"
        }
      },
    }
  })
  const [area,setArea] = useState({
    series: [{
      name: 'Purchase Orders',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'Sales Orders',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options :{
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#4f35a1", "#246dec"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'Purchase Orders',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Sales Orders',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    }
  }
  })
    return (
        <div>
            <main className="main-container">
                <div className="main-title">
                    <p className="font-weight-bold">DASHBOARD</p>
                    
                </div>

                <div className="main-cards">
                    <div className="card">
                        <div className="card-inner">
                            <p className="text-primary">PRODUCTS</p>
                            <span className="material-icons-outlined text-blue">
                            inventory_2
                            </span>
                        </div>
                        <span className="text-primary font-weight-bold">
                            249
                        </span>
                    </div>

                    <div className="card">
                        <div className="card-inner">
                            <p className="text-primary">PURCHASE ORDERS</p>
                            <span className="material-icons-outlined text-orange">
                            add_shopping_cart
                            </span>
                        </div>
                        <span className="text-primary font-weight-bold">
                            83
                        </span>
                    </div>

                    <div className="card">
                        <div className="card-inner">
                            <p className="text-primary">SALES ORDERS</p>
                            <span className="material-icons-outlined text-green">
                            shopping_cart
                            </span>
                        </div>
                        <span className="text-primary font-weight-bold">
                            79
                        </span>
                    </div>

                    <div className="card">
                        <div className="card-inner">
                            <p className="text-primary">INVENTORY ALERTS</p>
                            <span className="material-icons-outlined text-red">
                            notification_important
                            </span>
                        </div>
                        <span className="text-primary font-weight-bold">
                            56
                        </span>
                    </div>
                </div>

                <div className="charts">
                    <div className="charts-card">
                        <p className="chart-title">Top 5 Products</p>
                        <div id="bar-chart">
                          <Chart 
                            options={bar.options}
                            series={bar.series}
                            type="bar"
                            height={350}
                          />
                          
                        </div>
                    </div>

                    <div className="charts-card">
                        <p className="chart-title">Purchase and Sales Orders</p>
                        <div id="area-chart">
                          <Chart
                          series={area.series}
                          options={area.options}
                          type="area"
                          height={350}

                          />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
