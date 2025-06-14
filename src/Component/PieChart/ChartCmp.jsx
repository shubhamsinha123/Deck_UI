/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import {AgChartsReact} from 'ag-charts-react';
export const ChartExample = () => {
  const [options] = useState({
    data: getData(),
    title: {
      text: 'Portfolio Composition'
    },
    subtitle: {
      text: 'Versus Previous Year'
    },
    series: [
      {
        type: 'pie',
        title: {
          text: 'Previous Year',
          showInLegend: true
        },
        calloutLabelKey: 'asset',
        angleKey: 'previousYear',
        outerRadiusRatio: 1,
        innerRadiusRatio: 0.9
      },
      {
        type: 'pie',
        title: {
          text: 'Current Year',
          showInLegend: true
        },
        calloutLabelKey: 'asset',
        angleKey: 'currentYear',
        outerRadiusRatio: 0.6,
        innerRadiusRatio: 0.2
      }
    ]
  });

  /**
   * Retrieves an array of asset data comparing previous year
   *  and current year values.
   * @return {Array<Object>} An array of objects
   * where each object represents an asset with its previous year
   * and current year values.
   * @return {string} .asset - The name of the asset.
   * @return {number} .previousYear - The value of the asset in the previous year.
   * @return {number} .currentYear - The value of the asset in the current year.
   */
  function getData() {
    return [
      {asset: 'Stocks', previousYear: 70000, currentYear: 40000},
      {asset: 'Bonds', previousYear: 30000, currentYear: 60000},
      {asset: 'Cash', previousYear: 5000, currentYear: 7000},
      {asset: 'Real Estate', previousYear: 8000, currentYear: 5000},
      {asset: 'Commodities', previousYear: 4500, currentYear: 3000}
    ];
  }

  return <AgChartsReact options={options} />;
};
