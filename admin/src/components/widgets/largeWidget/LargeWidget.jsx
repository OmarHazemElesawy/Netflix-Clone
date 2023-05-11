import React from "react";
import classes from "./LargeWidget.module.css";
import image from "../../../images/formal.jpg";

const LargeWidget = () => {

  const Button = ({ type }) => {
    let classType = classes.Approved;
    if (type === "Declined") classType = classes.Declined;
    else if (type === "Pending") classType = classes.Pending;
    return (
      <button className={`${classes.largeWidgetBtn} ${classType}`}>
        {type}
      </button>
    );
  };
  
  return (
    <div className={classes.largeWidget}>
      <h3 className={classes.largeWidgetTitle}>Latest Transactions</h3>
      <table className={classes.largeWidgetTable}>
        <thead>
          <tr className={classes.largeWidgetRow}>
            <th className={classes.largeWidgetHeader}>Customer</th>
            <th className={classes.largeWidgetHeader}>Date</th>
            <th className={classes.largeWidgetHeader}>Amount</th>
            <th className={classes.largeWidgetHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.largeWidgetRow}>
            <td className={classes.largeWidgetUser}>
              <img className={classes.largeWidgetImg} src={image} alt="user" />
              <span className={classes.largeWidgetUsername}>Jane Doe</span>
            </td>
            <td className={classes.largeWidgetDate}>30 Apr 2023</td>
            <td className={classes.largeWidgetAmount}>$155.12</td>
            <td className={classes.largeWidgetStatus}>
              <Button type="Pending" />
            </td>
          </tr>

          <tr className={classes.largeWidgetRow}>
            <td className={classes.largeWidgetUser}>
              <img className={classes.largeWidgetImg} src={image} alt="user" />
              <span className={classes.largeWidgetUsername}>Jane Doe</span>
            </td>
            <td className={classes.largeWidgetDate}>30 Apr 2023</td>
            <td className={classes.largeWidgetAmount}>$155.12</td>
            <td className={classes.largeWidgetStatus}>
              <Button type="Declined" />
            </td>
          </tr>

          <tr className={classes.largeWidgetRow}>
            <td className={classes.largeWidgetUser}>
              <img className={classes.largeWidgetImg} src={image} alt="user" />
              <span className={classes.largeWidgetUsername}>Jane Doe</span>
            </td>
            <td className={classes.largeWidgetDate}>30 Apr 2023</td>
            <td className={classes.largeWidgetAmount}>$155.12</td>
            <td className={classes.largeWidgetStatus}>
              <Button type="Pending" />
            </td>
          </tr>

          <tr className={classes.largeWidgetRow}>
            <td className={classes.largeWidgetUser}>
              <img className={classes.largeWidgetImg} src={image} alt="user" />
              <span className={classes.largeWidgetUsername}>Jane Doe</span>
            </td>
            <td className={classes.largeWidgetDate}>30 Apr 2023</td>
            <td className={classes.largeWidgetAmount}>$155.12</td>
            <td className={classes.largeWidgetStatus}>
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LargeWidget;
