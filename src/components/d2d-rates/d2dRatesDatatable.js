import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteD2DRatesRedux } from "../../actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
    };
  }

  selectRow = (e, i) => {
    if (!e.target.checked) {
      this.setState({
        checkedValues: this.state.checkedValues.filter((item, j) => i !== item),
      });
    } else {
      this.state.checkedValues.push(i);
      this.setState({
        checkedValues: this.state.checkedValues,
      });
    }
  };

  handleRemoveRow = () => {
    const selectedValues = this.state.checkedValues;
    const updatedData = this.state.myData.filter(function (el) {
      return selectedValues.indexOf(el.id) < 0;
    });
    this.setState({
      myData: updatedData,
    });
    toast.success("Successfully Deleted !");
  };

  renderEditable = (cellInfo) => {
    const { myData } = this.props;
    const [freightType, country] = this.props.match.params.country.split("-");
    console.log(freightType);
    if (myData.length > 0) {
      const newData = [];
      if (freightType === "air") {
        myData.forEach((productType) => {
          newData.push({
            "Product Type": productType.id,
            Parcel: `${productType.parcel}tk/kg`,
            "Below 10kg": `${productType.ten}tk/kg`,
            "Above 10kg": `${productType.eleven}tk/kg`,
          });
        });
      } else {
        myData.forEach((productType) => {
          newData.push({
            "Product Type": productType.id,
            "100kg": `${productType["100kg"]}tk/kg`,
            "Below 1000kg": `${productType.below_1000kg}tk/kg`,
            "Above 1000kg": `${productType.above_1000kg}tk/kg`,
          });
        });
      }

      return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          onBlur={(e) => {
            const data = [...newData];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({ myData: data });
          }}
          dangerouslySetInnerHTML={{
            __html: newData[cellInfo.index][cellInfo.column.id],
          }}
        />
      );
    } else {
      return null;
    }
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getStatus = (productQuantity) => {
    if (productQuantity < 10) {
      return <i className="fa fa-circle font-danger f-12" />;
    } else if (productQuantity > 50) {
      return <i className="fa fa-circle font-success f-12" />;
    } else {
      return <i className="fa fa-circle font-warning f-12" />;
    }
  };

  render() {
    const [freightType, country] = this.props.match.params.country.split("-");
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    console.log(this.props);

    const { myData } = this.props;
    console.log(myData);
    const newData = [];
    if (myData.length > 0) {
      if (freightType === "air") {
        myData.forEach((productType) => {
          newData.push({
            "Product Type": productType.id,
            Parcel: `${productType.parcel}tk/kg`,
            "Below 10kg": `${productType.ten}tk/kg`,
            "Above 10kg": `${productType.eleven}tk/kg`,
          });
        });
      } else {
        myData.forEach((productType) => {
          newData.push({
            "Product Type": productType.id,
            "100kg": `${productType.parcel}tk/kg`,
            "Below 1000kg": `${productType.ten}tk/kg`,
            "Above 1000kg": `${productType.eleven}tk/kg`,
          });
        });
      }
    }
    const columns = [];
    for (var key in newData[0]) {
      let editable = this.renderEditable;
      if (key == "image") {
        editable = null;
      }
      if (key == "status") {
        editable = null;
      }
      if (key === "avtar") {
        editable = null;
      }
      if (key === "vendor") {
        editable = null;
      }
      if (key === "order_status") {
        editable = null;
      }

      columns.push({
        Header: <b>{this.Capitalize(key.toString())}</b>,
        accessor: key,
        Cell: editable,
        style: {
          textAlign: "center",
        },
      });
    }

    if (multiSelectOption == true) {
      columns.push({
        Header: (
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.handleRemoveRow();
            }}
          >
            Delete
          </button>
        ),
        id: "delete",
        accessor: (str) => "delete",
        sortable: false,
        style: {
          textAlign: "center",
        },
        Cell: (row) => (
          <div>
            <span>
              <input
                type="checkbox"
                name={row.original.id}
                defaultChecked={this.state.checkedValues.includes(
                  row.original.id
                )}
                onChange={(e) => this.selectRow(e, row.original.id)}
              />
            </span>
          </div>
        ),
        accessor: key,
        style: {
          textAlign: "center",
        },
      });
    } else {
      columns.push({
        Header: <b>Action</b>,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (row) => (
          <div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                let data = myData;
                data.splice(row.index, 1);
                this.setState({ myData: data });
                console.log(row);
                this.props.deleteD2DRatesRedux(
                  freightType,
                  country,
                  row.original["Product Type"]
                );

                toast.success("Successfully Deleted !");
              }}
            >
              <i
                className="fa fa-trash"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "#e4566e",
                }}
              ></i>
            </span>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.props.startToggleModal(row.original)}
            >
              <i
                className="fa fa-pencil"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                }}
              ></i>
            </span>
          </div>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      });
    }

    return (
      <Fragment>
        <ReactTable
          data={newData}
          columns={columns}
          defaultPageSize={pageSize}
          className={myClass}
          showPagination={pagination}
        />
        <ToastContainer />
      </Fragment>
    );
  }
}

export default withRouter(connect(null, { deleteD2DRatesRedux })(Datatable));
