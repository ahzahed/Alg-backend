import React, { Component } from "react";
import "./changeStatusModal.css";
import { updateBookingRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class ChangeStatusModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingStatus: "",
      chinaOffice: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.bookingIdArray.forEach((bookingId) =>
      this.props.updateBookingRedux({ bookingId: bookingId, ...this.state })
    );
    toast.success("successfully updated booking status");
    this.setState({
      bookingStatus: "",
      chinaOffice: "",
    });
    this.props.startToggleModal(null);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <div
          className={
            this.props.toggleModal
              ? "modal fade show"
              : "modal fade show visible-modal"
          }
          id="request_popup"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered request_popup"
            role="document"
          >
            <div
              className="modal-content visible-modal-content-2"
              style={{ backgroundColor: "rgb(68 0 97)" }}
            >
              <div className="modal-body p-0">
                <section className="pos-rel bg-light-gray">
                  <div className="container-fluid p-3">
                    <a
                      onClick={() => this.props.startToggleModal(null)}
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <i
                        className="icofont-close-line"
                        style={{ color: "white" }}
                      ></i>
                    </a>
                    <div className="d-lg-flex justify-content-end no-gutters mb-spacer-md">
                      {/* <div className="col bg-fixed bg-img-7 request_pag_img">
                        &nbsp;
                      </div> */}

                      <div className="col">
                        <div className="px-3 m-5">
                          <h2
                            className="h2-xl mb-3 fw-6 pb-2"
                            style={{
                              color: "white",
                              textTransform: "none",
                              fontSize: "200%",
                              borderBottom: "2px dotted white",
                            }}
                          >
                            Change Status
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            noValidate="novalidate"
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Update Booking Staus
                                </label>
                                <select
                                  title="Please choose a package"
                                  required
                                  name="bookingStatus"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.bookingStatus}
                                  required
                                >
                                  <option value="">Select Status</option>
                                  <option value="Success">Success</option>
                                  <option value="Reject">Reject</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-row mb-4">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Select China Office
                                </label>
                                <select
                                  title="Please choose a package"
                                  required
                                  name="chinaOffice"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.chinaOffice}
                                  required
                                >
                                  <option value="">Select Address</option>
                                  <option value="Address-1">Address-1</option>
                                  <option value="Address-2">Address-2</option>
                                  <option value="Address-3">Address-3</option>
                                  <option value="Address-4">Address-4</option>
                                  <option value="Address-5">Address-5</option>
                                </select>
                              </div>
                            </div>

                            <div className="form-row">
                              <div
                                className="col pt-3"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <button
                                  type="submit"
                                  className="btn btn-secondary"
                                >
                                  Update
                                  <i className="icofont-rounded-right"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { updateBookingRedux })(ChangeStatusModal);
