import { Modal } from 'react-bootstrap'
import { FormattedMessage } from "react-intl"

function CenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {props.header
          ? (<Modal.Title id="contained-modal-title-vcenter">{props.header}</Modal.Title>)
          : (<Modal.Title id="contained-modal-title-vcenter">
            <FormattedMessage id="component.header.brand" />
          </Modal.Title>)}
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      {props.footer && (<Modal.Footer>{props.footer}</Modal.Footer>)}
    </Modal>
  );
}

export default CenteredModal
