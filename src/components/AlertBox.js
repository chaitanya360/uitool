import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./alert.module.css";
import { Button } from "antd";

class AlertBox extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    autoClose: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["danger", "primary", "basic"]).isRequired,
    placement: PropTypes.oneOf(["top", "bottom"]).isRequired,
  };

  static defaultProps = {
    message: "",
    show: false,
    autoClose: false,
    time: 3000,
    variant: "primary",
    placement: "top",
  };

  state = {
    show: this.props.show,
  };

  startTimer = () => {
    const { autoClose, time, show, onClose } = this.props;
    if (autoClose && show) {
      this.timer = setTimeout(() => {
        this.setState({
          show: false,
        });

        onClose && onClose(false);
      }, time);
    }
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this.setState({
        show,
      });

      if (show) {
        this.startTimer();
      } else {
        clearTimeout(this.timer);
      }
    }
  }

  onClose = () => {
    const { onClose } = this.props;
    this.setState({
      show: false,
    });
    onClose && onClose(false);
    clearTimeout(this.timer);
  };

  render() {
    const { message, variant, placement } = this.props;
    const { show } = this.state;
    return (
      show && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.1)",
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="alertbox"
            className={cx(
              styles.alertBox,
              styles[variant],
              styles[placement],
              "animate__animated animate__fadeInDownBig animate__delay-0s animate__faster"
            )}
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                paddingBottom: "20px",
                fontSize: "18px",
                color: "rgba(0,0,0,0.9)",
              }}
            >
              {message}
            </div>

            <div
              style={{
                padding: "0px 60px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="primary"
                ghost
                onClick={this.props.handleYes}
                danger
              >
                Yes
              </Button>

              <Button type="primary" ghost onClick={this.props.handleNo}>
                No
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default AlertBox;
