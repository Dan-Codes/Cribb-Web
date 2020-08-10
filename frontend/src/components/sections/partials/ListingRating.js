import React from "react";
import { Rate, Space, Row, Col, Divider } from "antd";
import classNames from "classnames";

import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

function ListingRating({ location, management, amenitites, ...props }) {
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const tilesClasses = classNames("tiles-wrap center-content");
  return (
    <>
      <Row justify="space-around">
        <Col flex="200px">
          <h4>Amenitites</h4>
          <div>
            <span style={{ whiteSpace: "nowrap" }}>
              <Rate
                disabled
                defaultValue={amenitites ? Number(amenitites) : 0}
                character={({ index }) => {
                  return customIcons[index + 1];
                }}
              />
            </span>
          </div>
        </Col>
        <Col flex="200px">
          <h4>Location</h4>
          <div>
            <span style={{ clear: "both" }}>
              <Rate
                disabled
                style={{ whiteSpace: "nowrap" }}
                defaultValue={location ? Number(location) : 0}
                character={({ index }) => {
                  return customIcons[index + 1];
                }}
              />
            </span>
          </div>
        </Col>
        <Col flex="200px">
          <h4>Management</h4>
          <div>
            <span style={{ clear: "both" }}>
              <Rate
                disabled
                style={{ whiteSpace: "nowrap" }}
                defaultValue={management ? Number(management) : 0}
                character={({ index }) => {
                  return customIcons[index + 1];
                }}
              />
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ListingRating;
