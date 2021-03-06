import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./ordersLotsDatatable";
import { getAllLotsRedux } from "../../actions/index";
import CreateOrderModal from "./createOrderModal";
import SelectLotModal from "./selectLotModal";
import { connect } from "react-redux";
import { Search } from "react-feather";
import { withRouter } from "react-router-dom";
export class CalculationLots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      allLotsD2D: [],
      allLotsFreight: [],
      toggleModalSelectLot: true,
      toggleModalCreateOrder: true,
      singleLot: null,
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    await this.props.getAllLotsRedux();
    if (this.props.match.params.shipmentMethod === "D2D") {
      this.setState({ allLotsD2D: this.props.allLotsD2D });
    } else {
      this.setState({ allLotsFreight: this.props.allLotsFreight });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.shipmentMethod == "D2D") {
      this.setState({ allLotsD2D: nextProps.allLotsD2D });
    } else {
      this.setState({ allLotsFreight: nextProps.allLotsFreight });
    }
  };

  startToggleModalCreateOrder = async (lotObj) => {
    if (lotObj == null) {
      this.setState({
        toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
        singleLot: null,
      });
    } else {
      console.log(lotObj);
      this.setState({
        toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
        singleLot: lotObj,
      });
    }
  };

  startToggleModalSelectLot = async (fixedLot) => {
    this.setState({
      toggleModalSelectLot: !this.state.toggleModalSelectLot,
      fixedLot,
    });
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { allLotsD2D, allLotsFreight } = this.state;
    return (
      <>
        {this.props.match.params.shipmentMethod !== "express" ? (
          <Fragment>
            <CreateOrderModal
              toggleModalCreateOrder={this.state.toggleModalCreateOrder}
              startToggleModalCreateOrder={this.startToggleModalCreateOrder}
              singleLot={this.state.singleLot}
              calculation={this.props.calculation}
            />
            <SelectLotModal
              toggleModalSelectLot={this.state.toggleModalSelectLot}
              startToggleModalSelectLot={this.startToggleModalSelectLot}
              startToggleModalCreateOrder={this.startToggleModalCreateOrder}
              singleLot={this.state.singleLot}
              fixedLot={this.state.fixedLot}
            />
            <Breadcrumb
              title={this.props.calculation ? "Expense" : "Orders"}
              parent="Lots"
            />

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div
                      className="card-header"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>
                        {" "}
                        <i
                          className="icofont-shopping-cart"
                          style={{
                            fontSize: "180%",
                            marginRight: "5px",
                            marginTop: "5px",
                            color: "#ff8084",
                          }}
                        ></i>
                        {this.props.calculation
                          ? "Manage Expense"
                          : "Manage Orders"}
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        {" "}
                        <li
                          style={{
                            border: "1px solid gainsboro",
                            borderRadius: "5rem",
                            padding: "0px 20px",
                            background: "whitesmoke",
                            marginRight: "20px",
                          }}
                        >
                          <form
                            className="form-inline search-form"
                            onSubmit={this.handleSubmit}
                          >
                            <div
                              // className="form-group"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                              }}
                            >
                              <input
                                className={
                                  "form-control-plaintext " +
                                  (this.state.searchbar ? "open" : "")
                                }
                                name="searchFor"
                                value={this.state.searchFor}
                                type="search"
                                placeholder="Search Lot"
                                onChange={this.handleSearchBarChange}
                              />
                              <span
                                // className="d-sm-none mobile-search"
                                onClick={() => this.handleSearchClick()}
                              >
                                <Search
                                  style={{
                                    marginTop: "5px",
                                    borderLeft: "1px solid gainsboro",
                                    paddingLeft: "7px",
                                    color: "gray",
                                  }}
                                />
                              </span>
                            </div>
                          </form>
                        </li>
                        {!this.props.calculation ? (
                          <li>
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "rgb(68 0 97)",
                                color: "white",
                              }}
                              type="button"
                              onClick={() =>
                                this.startToggleModalSelectLot(null)
                              }
                            >
                              Create Order
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "rgb(68, 0, 97)",
                                color: "white",
                              }}
                              type="button"
                              onClick={() =>
                                this.startToggleModalSelectLot(null)
                              }
                            >
                              Expense
                            </button>
                          </li>
                        )}
                      </div>
                    </div>

                    <div className="card-body order-datatable">
                      <Datatable
                        calculation={this.props.calculation}
                        multiSelectOption={false}
                        myData={
                          this.props.match.params.shipmentMethod == "D2D"
                            ? !this.state.searchFor
                              ? allLotsD2D
                              : allLotsD2D.filter((lotObj) =>
                                  lotObj.lotNo
                                    .toLowerCase()
                                    .includes(
                                      this.state.searchFor.toLowerCase()
                                    )
                                )
                            : !this.state.searchFor
                            ? allLotsFreight
                            : allLotsFreight.filter((lotObj) =>
                                lotObj.lotNo
                                  .toLowerCase()
                                  .includes(this.state.searchFor.toLowerCase())
                              )
                        }
                        pageSize={10}
                        pagination={true}
                        class="-striped -highlight"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allLotsD2D: state.lots.lots.filter((lot) =>
      lot.shipmentMethod.includes("D2D")
    ),
    allLotsFreight: state.lots.lots.filter((lot) =>
      lot.shipmentMethod.includes("freight")
    ),
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllLotsRedux })(CalculationLots)
);
