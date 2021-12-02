import React from "react";

export const withCounter = (Component) => {
  return class Hoc extends React.Component {
    state = {
      count: 0,
    };

    increment = () => {
      this.setState({ count: this.state.count + 1 });
    };

    decrement = () => {
      this.setState({ count: this.state.count - 1 });
    };

    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          decrement={this.decrement}
          increment={this.increment}
        />
      );
    }
  };
};