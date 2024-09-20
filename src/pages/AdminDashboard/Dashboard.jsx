import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State to store customer growth chart data
  const [customerGrowthData, setCustomerGrowthData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  // Fetch data from API or JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example: Replace with your JSON file path or API endpoint
        const response = await fetch("/summary.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Set customer growth data
        setCustomerGrowthData({
          labels: data.customerGrowth.labels,
          datasets: [
            {
              label: "New Customers",
              data: data.customerGrowth.data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });

        // Set revenue data
        setRevenueData({
          labels: data.revenue.labels,
          datasets: [
            {
              label: "Revenue",
              data: data.revenue.data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });

        // Set metrics data
        setMetrics({
          totalCustomers: data.metrics.totalCustomers,
          totalOrders: data.metrics.totalOrders,
          totalRevenue: data.metrics.totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Show loading state while data is being fetched
  if (!customerGrowthData || !revenueData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Customers</h3>
          <p className="text-2xl">{metrics.totalCustomers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-2xl">{metrics.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Revenue</h3>
          <p className="text-2xl">${metrics.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Customer Growth</h3>
          <Bar data={customerGrowthData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
          <Line data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
