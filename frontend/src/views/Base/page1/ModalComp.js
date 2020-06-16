import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { number } from "prop-types";
export const ModalComp = ({
  onCloseModal,
  open,
  onSubmit,
  name,
  priority,
  onChangeName,
  onChangePriority,
}) => {
  const handleClick1 = (e) => onChangeName(e.target.value);
  const handleClick2 = (e) => onChangePriority(e.target.value);
  return (
    <div>
      <Modal open={open} center="true" onClose={() => onCloseModal()}>
        <h2>Add a new skill</h2>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="name">Skill name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                placeholder="Enter skill"
                onChange={handleClick1}
                required
              />
            </FormGroup>
          </Col>

          <Col xs="6">
            <FormGroup>
              <Label htmlFor="ccnumber">Priority</Label>
              <Input
                type="text"
                id="ccnumber"
                value={priority}
                placeholder="Enter priority"
                onChange={handleClick2}
                required
              />
              <Label htmlFor="ccnumber">Current max priority:</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <Button type="submit" onClick={() => onSubmit()}>
              Submit
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default ModalComp;
