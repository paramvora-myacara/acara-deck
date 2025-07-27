'use client';

import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const CompetitorChart = () => {
  const data = {
    datasets: [
      {
        label: 'Competitors',
        data: [
          { x: 1, y: 2, label: 'LoopNet' },
          { x: 2, y: 3, label: 'RCM1' },
          { x: 3, y: 4, label: 'VTS' },
          { x: 4, y: 3, label: 'Buildout' },
          { x: 5, y: 5, label: 'Cherre' },
          { x: 6, y: 6, label: 'Bryckel' },
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'ACARA CAP',
        data: [{ x: 8, y: 8, label: 'ACARA CAP' }],
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Manual Work vs. Automation',
        },
        min: 0,
        max: 10,
      },
      y: {
        title: {
          display: true,
          text: 'Siloed Tools vs. Full Platform',
        },
        min: 0,
        max: 10,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return context.raw.label;
          },
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default CompetitorChart; 