import React from "react";
import { Line } from "react-chartjs-2";
import { IHistoricicalData } from "../CryptoTable";
import styled from "styled-components";
// import { format } from "date-fns";

interface ICryptoGraphProps {
  graphData: Array<IHistoricicalData>;
}

const StyledGraph = styled.div`
  width: 200px;
`;

const CryptoGraph = (props: ICryptoGraphProps) => {
  const { graphData } = props;

  const timestamps = graphData.map((data) =>
    new Date(data.timestamp).toLocaleDateString()
  );
  const prices = graphData.map((data) => data.price);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: ``,
        data: prices,
        fill: false,
        borderColor: "#16c784",
        backgroundColor: "#16c784",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide x-axis labels
      },
      y: {
        display: false, // Hide y-axis labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide dataset label
      },
    },
  };

  return (
    <StyledGraph>
      <Line data={chartData} options={options} width={150} height={60}/>
    </StyledGraph>
  );
};

export default CryptoGraph;
