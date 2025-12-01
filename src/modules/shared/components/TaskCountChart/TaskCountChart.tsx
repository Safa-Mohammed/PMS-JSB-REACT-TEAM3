
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { axiosinstant, TASKS_URL } from "../../../../utils/urls";
import { useEffect, useState } from "react";
import type { countRes } from "../../../../utils/interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);
import load from "../../../../assets/images/loadpi.gif";
import NoData from "../noData/noData";

export default function TaskCountChart() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ toDo: 0, inProgress: 0, done: 0 });

  let GetCount = async () => {
    try {
      let res = await axiosinstant.get<countRes>(TASKS_URL.GETTASKSCOUNT);
      let { toDo, inProgress, done } = res.data;
      setCounts({ toDo, inProgress, done });
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
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "# of Tasks",
        data: [counts.toDo, counts.inProgress, counts.done],
        backgroundColor: [
          "rgba(33, 150, 243, 0.6)", // Blue → To Do
          "rgba(255, 193, 7, 0.6)",  // Amber → In Progress
          "rgba(76, 175, 80, 0.6)",  // Green → Done
        ],
        borderColor: [
          "rgba(33, 150, 243, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(76, 175, 80, 1)",
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

  const isEmpty =
    counts.toDo === 0 && counts.inProgress === 0 && counts.done === 0;

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




// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import { axiosinstant, TASKS_URL } from "../../../../utils/urls";
// import { useEffect, useState } from "react";
// import type {countRes} from '../../../../utils/interfaces'

// ChartJS.register(ArcElement, Tooltip, Legend);
// import load from '../../../../assets/images/loadpi.gif'
// import NoData from "../noData/noData";

// export default function TaskCountChart() {
//      const [loading, setLoading] = useState(true);
//   const [counts, setCounts] = useState({ toDo: 0, inProgress: 0, done: 0 });

//   let GetCount = async () => {
//     try {
//       let res =await axiosinstant.get<countRes>(TASKS_URL.GETTASKSCOUNT);
//       console.log(res.data);
//       let { toDo, inProgress, done } = res.data;
//       setCounts({ toDo, inProgress, done });
//     } catch (error) {
//       console.error(error);

//     }
//     finally{
//       setLoading(false)
//     }
//   };

//   useEffect(() => {
//     GetCount();
//   }, []);

//     const data = {
//     labels: ["ToDo", "InProgress", "Done"],
//     datasets: [
//       {
//         label: "# of Tasks",
//         data: [counts.toDo, counts.inProgress, counts.done],
//         backgroundColor: [
//           "rgba(28, 32, 230, 0.2)", // ToDo
//           "rgba(54, 162, 235, 0.2)", // InProgress
//           "rgba(24, 194, 8, 0.2)", // Done
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };
//   const isEmpty = counts.toDo === 0 && counts.inProgress === 0 && counts.done === 0;
//   return (
//     <>
      
//           <div style={{ width: "300px", height: "300px" }}>
//             {loading?<div className="d-flex justify-content-center align-items-center">
//            <img src={load}/>
//             </div>:isEmpty?<NoData/>:
//              <Doughnut data={data} />
//             }
//           </div>
        




//     </>
//   )
// }
