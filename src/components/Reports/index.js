import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import uiStore from "../../stores/UIStore";
import LoadingScreen from "../common/Loading";
import { observer } from "mobx-react";
import reportStore from "../../stores/ReportStore";
import Chart from "chart.js";
import Table from "../common/Table";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  layout: {
    marginTop: 60
  },
  reward: {
    marginBottom: 10
  },
  chart: {
    width: 800,
    height: 500
  }
});

const Reports = observer(
  class Reports extends Component {
    async componentDidMount() {
      const data = await reportStore.getTopSellingpProducts();
      const topSellingProducts = [];
      Object.keys(data).forEach(key => {
        topSellingProducts.push(data[key]);
      });
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "Top Selling Products",
              data: topSellingProducts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }

    render() {
      const { loading } = uiStore;
      if (loading) {
        return <LoadingScreen />;
      }
      const { classes } = this.props;
      const { topSellingProducts } = reportStore;
      console.log(topSellingProducts);
      return (
        <React.Fragment>
          Reports Page
          <Divider />
          <div className="row">
            <div className="col-lg-8" className={classes.chart}>
              <canvas id="myChart" />
            </div>
            <div className="col-lg-4">
              <Table
                tableHeadings={["Product", "Transactions"]}
                tableData={topSellingProducts}
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
);

Reports.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reports);
