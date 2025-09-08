import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls";
import { useEffect, useState } from "react";
import type { UsrecountRes } from "../../../../utils/interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

import load from "../../../../assets/images/loadpi.gif";
import NoData from "../noData/noData";

export default function UserActiveChart() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ activatedEmployeeCount: 0, deactivatedEmployeeCount: 0 });

  const GetCount = async () => {
    try {
      let res = await axiosinstant.get<UsrecountRes>(EMPLOYEIES_URL.USERS_COUNT);
      const { activatedEmployeeCount, deactivatedEmployeeCount } = res.data;
      setCounts({ activatedEmployeeCount, deactivatedEmployeeCount });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCount();
  }, []);

  const data = {
    labels: ["Activated", "Deactivated"],
    datasets: [
      {
        label: "# of Users",
        data: [counts.activatedEmployeeCount, counts.deactivatedEmployeeCount],
        backgroundColor: [
          "rgba(76, 175, 80, 0.6)",  // Green → Activated
          "rgba(244, 67, 54, 0.6)",  // Red → Deactivated
        ],
        borderColor: [
          "rgba(76, 175, 80, 1)",
          "rgba(244, 67, 54, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const options:any = {
  plugins: {
    legend: {
      display: true,
      position: "bottom", // تحت الـ chart
      labels: {
        usePointStyle: true, // ← خلي العلامة دائرة
        pointStyle: "circle", // شكل الدائرة
        padding: 20,
        font: { size: 14 }
      }
    }
  }
};


  const isEmpty = counts.activatedEmployeeCount === 0 && counts.deactivatedEmployeeCount === 0;

  return (
    <div style={{ width: "300px", height: "300px" }}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <img src={load} alt="loading..." />
        </div>
      ) : isEmpty ? (
        <NoData />
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
}
