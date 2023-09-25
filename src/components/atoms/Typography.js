import React from "react";
import { FontStyle } from "../../helper/constants";

const Typography = ({
  fontStyle,
  tag,
  children,
  className,
  lineHeight,
  style,
  ...props
}) => {
  const headingTag =
    tag === "h1" ||
    tag === "h2" ||
    tag === "h3" ||
    tag === "h4" ||
    tag === "h5" ||
    tag === "h6" ||
    tag === "p" ||
    tag === "span";

  const Component = headingTag ? tag : "p";

  const fonts =
    fontStyle === FontStyle.head ||
    fontStyle === FontStyle.title ||
    fontStyle === FontStyle.subTittle ||
    fontStyle === FontStyle.semiTitle ||
    fontStyle === FontStyle.content ||
    fontStyle === FontStyle.subContent;
  const typograpphyStyle = { lineHeight: lineHeight, ...style };

  return (
    <Component
      id={"typography"}
      className={
        `typography font--style--${fonts ? fontStyle : "subContent"} ` +
        fontStyle +
        " " +
        (className ?? "")
      }
      style={typograpphyStyle}
      suppressContentEditableWarning={true}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
