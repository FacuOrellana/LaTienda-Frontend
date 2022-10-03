import React from 'react';

const FlexContainer = props => {
  return (
    <div style={{
        ...props.style,
        display: "flex",
        flexDirection: props.flexDirection ?? "row",
        flexWrap: "wrap",
        justifyContent: !props.flexDirection || props.flexDirection === "row" ? props.alignX ?? "center" : props.alignY ?? "center",
        alignItems: !props.flexDirection || props.flexDirection === "row" ? props.alignY ?? "center" : props.alignX ?? "center",
        margin: props.margin,
    }}>
        {props.children}
    </div>
  );
};

export default FlexContainer;
